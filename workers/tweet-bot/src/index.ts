/**
 * Disney Tweet Bot - Cloudflare Worker
 * Cron: 08:00 / 13:00 / 16:00 JST
 */

const SITE_BASE = "https://disneynow.tokyo";
const SITE_URL  = "https://tinyurl.com/2bbslcyv"; // 短縮URL（固定）

// ──────────────────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────────────────
interface Env {
  X_API_KEY: string;
  X_API_SECRET: string;
  X_ACCESS_TOKEN: string;
  X_ACCESS_TOKEN_SECRET: string;
}

interface Attraction {
  id: number;
  name: string;
  nameJa: string;
  wait_time: number;
  is_open: boolean;
}

interface ParkData {
  attractions: Attraction[];
}

interface ParkHours {
  tdl: { open: string; close: string };
  tds: { open: string; close: string };
}

interface Weather {
  current: { code: number; temp: number };
  evening: { code: number; temp: number; precipProb: number };
}

// ──────────────────────────────────────────────────────────
// OAuth 1.0a 署名（Web Crypto API使用）
// ──────────────────────────────────────────────────────────
async function buildOAuthHeader(
  method: string,
  url: string,
  env: Env
): Promise<string> {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const oauthParams: Record<string, string> = {
    oauth_consumer_key:     env.X_API_KEY,
    oauth_nonce:            nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp:        timestamp,
    oauth_token:            env.X_ACCESS_TOKEN,
    oauth_version:          "1.0",
  };

  const sortedParams = Object.keys(oauthParams)
    .sort()
    .map(k => `${enc(k)}=${enc(oauthParams[k])}`)
    .join("&");

  const signatureBase = [method.toUpperCase(), enc(url), enc(sortedParams)].join("&");
  const signingKey = `${enc(env.X_API_SECRET)}&${enc(env.X_ACCESS_TOKEN_SECRET)}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(signingKey),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signatureBase));
  const signature = btoa(String.fromCharCode(...new Uint8Array(sigBuffer)));

  oauthParams["oauth_signature"] = signature;

  return "OAuth " + Object.keys(oauthParams)
    .sort()
    .map(k => `${enc(k)}="${enc(oauthParams[k])}"`)
    .join(", ");
}

function enc(s: string): string {
  return encodeURIComponent(s);
}

// ──────────────────────────────────────────────────────────
// ツイート投稿
// ──────────────────────────────────────────────────────────
async function postTweet(text: string, env: Env): Promise<void> {
  const url = "https://api.twitter.com/2/tweets";
  const authHeader = await buildOAuthHeader("POST", url, env);

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Twitter API error ${res.status}: ${body}`);
  }
  const data = await res.json() as { data: { id: string } };
  console.log("Posted:", data.data.id, text.slice(0, 30) + "...");
}

// ──────────────────────────────────────────────────────────
// データ取得
// ──────────────────────────────────────────────────────────
async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    return res.ok ? (await res.json() as T) : null;
  } catch {
    console.warn("fetch failed:", url);
    return null;
  }
}

// ──────────────────────────────────────────────────────────
// 混雑予測（crowd-prediction.ts 移植）
// ──────────────────────────────────────────────────────────
const FIXED_HOLIDAYS: Record<string, boolean> = {
  "01-01":true,"02-11":true,"02-23":true,"04-29":true,
  "05-03":true,"05-04":true,"05-05":true,"08-11":true,
  "11-03":true,"11-23":true,
};

function isHoliday(d: Date): boolean {
  const mmdd = `${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  if (FIXED_HOLIDAYS[mmdd]) return true;
  const [m, wd, wom] = [d.getMonth()+1, d.getDay(), Math.ceil(d.getDate()/7)];
  if (m===1&&wd===1&&wom===2) return true;
  if (m===7&&wd===1&&wom===3) return true;
  if (m===9&&wd===1&&wom===3) return true;
  if (m===10&&wd===1&&wom===2) return true;
  const y = d.getFullYear();
  const spring = Math.floor(20.8431+0.242194*(y-1980)-Math.floor((y-1980)/4));
  const autumn = Math.floor(23.2488+0.242194*(y-1980)-Math.floor((y-1980)/4));
  if (m===3&&d.getDate()===spring) return true;
  if (m===9&&d.getDate()===autumn) return true;
  return false;
}

function isVacation(d: Date): boolean {
  const [m, day] = [d.getMonth()+1, d.getDate()];
  if (m===7&&day>=20) return true;
  if (m===8) return true;
  if (m===3&&day>=20) return true;
  if (m===4&&day<=7) return true;
  if (m===12&&day>=25) return true;
  if (m===1&&day<=7) return true;
  return false;
}

function eventBoost(d: Date): number {
  const [m, day] = [d.getMonth()+1, d.getDate()];
  const events = [
    {s:[4,29],e:[5,6],b:3},{s:[9,1],e:[10,31],b:1},
    {s:[11,8],e:[12,24],b:2},{s:[12,25],e:[12,31],b:3},
    {s:[3,1],e:[3,19],b:2},{s:[3,20],e:[3,31],b:1},
  ];
  for (const ev of events) {
    const after = m>ev.s[0]||(m===ev.s[0]&&day>=ev.s[1]);
    const before = m<ev.e[0]||(m===ev.e[0]&&day<=ev.e[1]);
    if (after&&before) return ev.b;
  }
  return 0;
}

function predictCrowd(d: Date): string {
  const [wd, m] = [d.getDay(), d.getMonth()+1];
  const holiday = isHoliday(d), vacation = isVacation(d);
  const boost = eventBoost(d), weekend = wd===0||wd===6;
  let s = 0;
  if (weekend) s+=3; else if (wd===5) s+=1;
  if (m===3) {
    s+=1;
    if (holiday) s+=weekend?1:3;
    else if (d.getDate()<=19) s+=boost;
    else { if (!weekend&&vacation) s+=2; s+=boost; }
  } else {
    if (holiday) s+=weekend?1:3;
    if (vacation) s+=2;
    s+=boost;
  }
  if (s>=9) return "S";
  if (s>=7) return "F";
  if (s>=6) return "E";
  if (s>=5) return "D";
  if (s>=3) return "C";
  if (s>=2) return "B";
  return "A";
}

const GRADE_JA: Record<string,string> = {
  A:"ガラガラ🟢",B:"空いてます🟢",C:"まあまあ混んでます🟡",
  D:"やや混雑🟠",E:"混雑🔴",F:"かなり混雑🔴",S:"超混雑🚨",
};
const GRADE_EN: Record<string,string> = {
  A:"Very Empty 🟢",B:"Light 🟢",C:"Moderate 🟡",
  D:"Somewhat Busy 🟠",E:"Busy 🔴",F:"Very Busy 🔴",S:"Extremely Busy 🚨",
};

// ──────────────────────────────────────────────────────────
// 天気ユーティリティ
// ──────────────────────────────────────────────────────────
function weatherEmoji(code: number): string {
  if (code===0) return "☀️";
  if (code<=2)  return "⛅";
  if (code<=3)  return "☁️";
  if (code<=48) return "🌫️";
  if (code<=57) return "🌦️";
  if (code<=67) return "🌧️";
  if (code<=77) return "🌨️";
  if (code<=82) return "🌧️";
  if (code<=86) return "❄️";
  return "⛈️";
}

function weatherAdviceJa(w: Weather): string {
  const rainy = [51,53,55,56,57,61,63,65,66,67,80,81,82];
  if (rainy.includes(w.current.code)||rainy.includes(w.evening.code))
    return "☔ 今日は雨です。カッパか折りたたみ傘を忘れずに！";
  if (w.evening.precipProb>=50)
    return `🌂 夕方から雨の可能性（${w.evening.precipProb}%）。折りたたみ傘があると安心。`;
  const max = Math.max(w.current.temp,w.evening.temp);
  const min = Math.min(w.current.temp,w.evening.temp);
  if (max>=30) return "🥵 暑い！熱中症対策に飲み物・帽子を。";
  if (max>=25) return "😎 暑くなります。日焼け止め・水分補給を！";
  if (min<=5)  return "🥶 かなり寒い！厚手コートと手袋を。";
  if (min<=10) return "🧥 肌寒いです。上着を持って行きましょう。";
  if (max>=20&&min<=12) return "👕 気温差あり。脱ぎ着しやすい服装がおすすめ！";
  return "";
}

function weatherAdviceEn(w: Weather): string {
  const rainy = [51,53,55,56,57,61,63,65,66,67,80,81,82];
  if (rainy.includes(w.current.code)||rainy.includes(w.evening.code))
    return "☔ Rain today! Don't forget a raincoat or umbrella.";
  if (w.evening.precipProb>=50)
    return `🌂 Rain possible in the evening (${w.evening.precipProb}%). Bring a folding umbrella.`;
  const max = Math.max(w.current.temp,w.evening.temp);
  const min = Math.min(w.current.temp,w.evening.temp);
  if (max>=30) return "🥵 Very hot! Stay hydrated and wear a hat.";
  if (max>=25) return "😎 It'll be warm. Sunscreen & water are a must!";
  if (min<=5)  return "🥶 Very cold! Bring a heavy coat and gloves.";
  if (min<=10) return "🧥 Chilly today. Pack a jacket.";
  if (max>=20&&min<=12) return "👕 Big temp swing today. Dress in layers!";
  return "";
}

// ──────────────────────────────────────────────────────────
// ① 朝8時ツイート（開演前・情報収集層向け）
// ──────────────────────────────────────────────────────────
async function buildMorningTweets(now: Date): Promise<[string, string]> {
  const [weather, hours] = await Promise.all([
    fetchJson<Weather>(`${SITE_BASE}/api/weather/current`),
    fetchJson<ParkHours>(`${SITE_BASE}/api/park-hours`),
  ]);

  const grade = predictCrowd(now);
  const wd = ["日","月","火","水","木","金","土"][now.getDay()];
  const dateJa = `${now.getMonth()+1}月${now.getDate()}日(${wd})`;
  const dateEn = `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][now.getMonth()]} ${now.getDate()} (${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()]})`;

  const hoursJa = hours ? `🕘 ランド ${hours.tdl.open}〜${hours.tdl.close} / シー ${hours.tds.open}〜${hours.tds.close}` : "";
  const hoursEn = hours ? `🕘 Land ${hours.tdl.open}–${hours.tdl.close} / Sea ${hours.tds.open}–${hours.tds.close}` : "";

  const wLineJa = weather ? `🌡 現在${weatherEmoji(weather.current.code)}${weather.current.temp}° / 夕方${weatherEmoji(weather.evening.code)}${weather.evening.temp}°${weather.evening.precipProb>0?` 降水確率${weather.evening.precipProb}%`:""}` : "";
  const wLineEn = weather ? `🌡 Now ${weatherEmoji(weather.current.code)}${weather.current.temp}° / Eve ${weatherEmoji(weather.evening.code)}${weather.evening.temp}°${weather.evening.precipProb>0?` Rain ${weather.evening.precipProb}%`:""}` : "";
  const advJa = weather ? weatherAdviceJa(weather) : "";
  const advEn = weather ? weatherAdviceEn(weather) : "";

  const ja = [
    `🏰 ${dateJa} 開園前ディズニー情報`,``,
    `📊 本日の混雑予報: ${GRADE_JA[grade]}`,
    hoursJa, wLineJa, advJa,``,
    `詳細はこちら👇`, SITE_URL,
  ].filter(Boolean).join("\n");

  const en = [
    `🏰 Tokyo Disney Resort — ${dateEn}`,``,
    `📊 Today's crowd forecast: ${GRADE_EN[grade]}`,
    hoursEn, wLineEn, advEn,``,
    `Full info & wait times 👇`, SITE_URL,
  ].filter(Boolean).join("\n");

  return [ja, en];
}

// ──────────────────────────────────────────────────────────
// ② 昼13時ツイート（リアルタイム待ち時間・昼休み層向け）
// ──────────────────────────────────────────────────────────
async function buildLunchTweets(now: Date): Promise<[string, string]> {
  const [tdl, tds] = await Promise.all([
    fetchJson<ParkData>(`${SITE_BASE}/api/wait-times/tdl`),
    fetchJson<ParkData>(`${SITE_BASE}/api/wait-times/tds`),
  ]);

  const grade = predictCrowd(now);

  function topWaits(data: ParkData | null, n: number): string[] {
    if (!data) return [];
    return data.attractions
      .filter(a => a.is_open && a.wait_time > 0)
      .sort((a,b) => b.wait_time - a.wait_time)
      .slice(0, n)
      .map(a => `${a.nameJa} ${a.wait_time}分`);
  }
  function topWaitsEn(data: ParkData | null, n: number): string[] {
    if (!data) return [];
    return data.attractions
      .filter(a => a.is_open && a.wait_time > 0)
      .sort((a,b) => b.wait_time - a.wait_time)
      .slice(0, n)
      .map(a => `${a.name} ${a.wait_time} min`);
  }
  function shortWaits(data: ParkData | null, n: number): string[] {
    if (!data) return [];
    return data.attractions
      .filter(a => a.is_open && a.wait_time >= 0)
      .sort((a,b) => a.wait_time - b.wait_time)
      .slice(0, n)
      .map(a => a.wait_time === 0 ? `${a.nameJa} 待ちなし✨` : `${a.nameJa} ${a.wait_time}分`);
  }
  function shortWaitsEn(data: ParkData | null, n: number): string[] {
    if (!data) return [];
    return data.attractions
      .filter(a => a.is_open && a.wait_time >= 0)
      .sort((a,b) => a.wait_time - b.wait_time)
      .slice(0, n)
      .map(a => a.wait_time === 0 ? `${a.name} No wait ✨` : `${a.name} ${a.wait_time} min`);
  }

  const tdlTop = topWaits(tdl, 3);
  const tdsTop = topWaits(tds, 3);
  const tdlShort = shortWaits(tdl, 2);

  const tdlTopEn = topWaitsEn(tdl, 3);
  const tdsTopEn = topWaitsEn(tds, 3);
  const tdlShortEn = shortWaitsEn(tdl, 2);

  const ja = [
    `🕐 現在のディズニー待ち時間【昼】`,``,
    `📊 混雑度: ${GRADE_JA[grade]}`,``,
    tdlTop.length ? `🏰 ランド 待ち時間TOP\n${tdlTop.map(s=>`　${s}`).join("\n")}` : "",
    tdsTop.length ? `⛵ シー 待ち時間TOP\n${tdsTop.map(s=>`　${s}`).join("\n")}` : "",
    tdlShort.length ? `💡 今すぐ乗れる（ランド）\n${tdlShort.map(s=>`　${s}`).join("\n")}` : "",``,
    `リアルタイム詳細👇`, SITE_URL,
  ].filter(Boolean).join("\n");

  const en = [
    `🕐 Current Disney Wait Times [Lunch Update]`,``,
    `📊 Crowd level: ${GRADE_EN[grade]}`,``,
    tdlTopEn.length ? `🏰 Disneyland Top Waits\n${tdlTopEn.map(s=>`  ${s}`).join("\n")}` : "",
    tdsTopEn.length ? `⛵ DisneySea Top Waits\n${tdsTopEn.map(s=>`  ${s}`).join("\n")}` : "",
    tdlShortEn.length ? `💡 Short waits now (Land)\n${tdlShortEn.map(s=>`  ${s}`).join("\n")}` : "",``,
    `Real-time details 👇`, SITE_URL,
  ].filter(Boolean).join("\n");

  return [ja, en];
}

// ──────────────────────────────────────────────────────────
// ③ 夕方16時ツイート（閉園までのプラン・夜のプラン層向け）
// ──────────────────────────────────────────────────────────
async function buildEveningTweets(now: Date): Promise<[string, string]> {
  const [tdl, tds, hours] = await Promise.all([
    fetchJson<ParkData>(`${SITE_BASE}/api/wait-times/tdl`),
    fetchJson<ParkData>(`${SITE_BASE}/api/wait-times/tds`),
    fetchJson<ParkHours>(`${SITE_BASE}/api/park-hours`),
  ]);

  // 閉園まであと何時間
  function hoursUntilClose(parkHours: { open: string; close: string } | undefined): string {
    if (!parkHours) return "";
    const [ch, cm] = parkHours.close.split(":").map(Number);
    const closeMin = ch * 60 + cm;
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const diff = closeMin - nowMin;
    if (diff <= 0) return "閉園済み";
    const h = Math.floor(diff / 60), m = diff % 60;
    return h > 0 ? `あと${h}時間${m > 0 ? m + "分" : ""}` : `あと${m}分`;
  }
  function hoursUntilCloseEn(parkHours: { open: string; close: string } | undefined): string {
    if (!parkHours) return "";
    const [ch, cm] = parkHours.close.split(":").map(Number);
    const closeMin = ch * 60 + cm;
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const diff = closeMin - nowMin;
    if (diff <= 0) return "closed";
    const h = Math.floor(diff / 60), m = diff % 60;
    return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ""} left` : `${m}m left`;
  }

  function shortList(data: ParkData | null, n: number, en: boolean): string[] {
    if (!data) return [];
    return data.attractions
      .filter(a => a.is_open && a.wait_time >= 0)
      .sort((a,b) => a.wait_time - b.wait_time)
      .slice(0, n)
      .map(a => {
        const nm = en ? a.name : a.nameJa;
        return a.wait_time === 0
          ? `${nm} ${en ? "No wait ✨" : "待ちなし✨"}`
          : `${nm} ${a.wait_time}${en ? " min" : "分"}`;
      });
  }

  const tdlClose = hoursUntilClose(hours?.tdl);
  const tdsClose = hoursUntilClose(hours?.tds);
  const tdlCloseEn = hoursUntilCloseEn(hours?.tdl);
  const tdsCloseEn = hoursUntilCloseEn(hours?.tds);

  const ja = [
    `🌆 夕方のディズニー情報【16時】`,``,
    hours ? `⏰ ランド閉園 ${tdlClose} / シー閉園 ${tdsClose}` : "",``,
    shortList(tdl, 3, false).length
      ? `🏰 ランド 今から乗れる！\n${shortList(tdl, 3, false).map(s=>`　${s}`).join("\n")}` : "",
    shortList(tds, 3, false).length
      ? `⛵ シー 今から乗れる！\n${shortList(tds, 3, false).map(s=>`　${s}`).join("\n")}` : "",``,
    `夜のプランを立てよう👇`, SITE_URL,
  ].filter(Boolean).join("\n");

  const en = [
    `🌆 Disney Evening Update [4PM]`,``,
    hours ? `⏰ Land closes in ${tdlCloseEn} / Sea closes in ${tdsCloseEn}` : "",``,
    shortList(tdl, 3, true).length
      ? `🏰 Land — Ride now!\n${shortList(tdl, 3, true).map(s=>`  ${s}`).join("\n")}` : "",
    shortList(tds, 3, true).length
      ? `⛵ Sea — Ride now!\n${shortList(tds, 3, true).map(s=>`  ${s}`).join("\n")}` : "",``,
    `Plan your evening 👇`, SITE_URL,
  ].filter(Boolean).join("\n");

  return [ja, en];
}

// ──────────────────────────────────────────────────────────
// Cron エントリーポイント
// ──────────────────────────────────────────────────────────
export default {
  async scheduled(_event: ScheduledController, env: Env, _ctx: ExecutionContext) {
    // JST での現在時刻
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
    const hour = now.getHours();

    console.log(`Cron fired at JST ${hour}:00`);

    let jaText = "";
    let enText = "";

    if (hour === 8) {
      [jaText, enText] = await buildMorningTweets(now);
    } else if (hour === 13) {
      [jaText, enText] = await buildLunchTweets(now);
    } else if (hour === 16) {
      [jaText, enText] = await buildEveningTweets(now);
    } else {
      console.log(`Hour ${hour} is not a scheduled post time. Skipping.`);
      return;
    }

    console.log("JA:", jaText);
    console.log("EN:", enText);

    await postTweet(jaText, env);
    await new Promise(r => setTimeout(r, 2000));
    await postTweet(enText, env);
  },
} satisfies ExportedHandler<Env>;
