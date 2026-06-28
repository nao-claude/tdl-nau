/**
 * Disney Tweet Bot - Cloudflare Worker
 * Cron: 08:00 / 13:00 / 16:00 JST
 *
 * 朝8時: ① 混雑・天気（JA）② 混雑・天気（EN）③ TDL午前コース（JA）④ TDS午前コース（JA）
 * 昼13時: ① 待ち時間（JA）② 待ち時間（EN）③ TDL午後コース（JA・リアルタイムグレード）④ TDS午後コース（JA・リアルタイムグレード）
 * 夕方16時: ① 夕方情報（JA）② 夕方情報（EN）
 */

const SITE_BASE = "https://disneynow.tokyo";

// 時刻付きUTMパラメータでユニークURLを生成（X重複投稿ブロック回避）
function siteUrl(hour: number): string {
  return `https://disneynow.tokyo/?utm_source=x&utm_medium=bot&utm_campaign=h${hour}`;
}

// ──────────────────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────────────────
interface Env {
  X_API_KEY: string;
  X_API_SECRET: string;
  X_ACCESS_TOKEN: string;
  X_ACCESS_TOKEN_SECRET: string;
  X_BEARER_TOKEN?: string;       // 検索用（アプリ認証）
  REPLIED_TWEETS?: KVNamespace;  // 返信済みID管理（重複防止）
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

// リアルタイム待ち時間データから混雑グレードを算出（crowd-prediction.ts の gradeFromWaitData 移植）
function gradeFromWaitData(attractions: Attraction[]): string {
  const open = attractions.filter(a => a.is_open && a.wait_time > 0);
  if (open.length === 0) return "A";
  const sorted = [...open].sort((a, b) => b.wait_time - a.wait_time);
  const top = sorted.slice(0, Math.min(5, sorted.length));
  const avg = top.reduce((sum, a) => sum + a.wait_time, 0) / top.length;
  if (avg >= 150) return "S";
  if (avg >= 110) return "F";
  if (avg >= 80)  return "E";
  if (avg >= 55)  return "D";
  if (avg >= 35)  return "C";
  if (avg >= 20)  return "B";
  return "A";
}

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
// おすすめコース生成（RecommendedCourse.tsx の移植）
// ──────────────────────────────────────────────────────────

// TDL 人気アトラクション（固定リスト）
const TDL_COURSE_LIST = [
  { id: 197, name: "美女と野獣・魔法のものがたり" },
  { id: 196, name: "ベイマックスのハッピーライド" },
  { id: 174, name: "プーさんのハニーハント" },
  { id: 164, name: "ピーター・パン空の旅" },
  { id: 160, name: "ビッグサンダー・マウンテン" },
  { id: 171, name: "ホーンテッドマンション" },
  { id: 162, name: "スプラッシュ・マウンテン" },
  { id: 189, name: "モンスターズ・インク" },
  { id: 183, name: "スター・ツアーズ" },
  { id: 167, name: "ミッキーのフィルハーマジック" },
];

// TDS 人気アトラクション（固定リスト）
const TDS_COURSE_LIST = [
  { id: 219, name: "ソアリン：ファンタスティック・フライト" },
  { id: 255, name: "アナとエルサのフローズンジャーニー" },
  { id: 256, name: "ラプンツェルのランタンフェスティバル" },
  { id: 257, name: "ピーター・パンのネバーランドアドベンチャー" },
  { id: 243, name: "タワー・オブ・テラー" },
  { id: 222, name: "インディ・ジョーンズ・アドベンチャー" },
  { id: 223, name: "センター・オブ・ジ・アース" },
  { id: 218, name: "トイ・ストーリー・マニア！" },
  { id: 242, name: "レイジングスピリッツ" },
  { id: 247, name: "ニモ＆フレンズ・シーライダー" },
];

// ツイート用短縮名（280文字制限対応）
const TDL_COURSE_SHORT = [
  "美女と野獣", "ベイマックス", "プーさん", "ピーターパン",
  "ビッグサンダー", "ホーンテッド", "スプラッシュ", "モンスターズ",
  "スターツアーズ", "フィルハーマジック",
];
const TDS_COURSE_SHORT = [
  "ソアリン", "アナ雪", "ラプンツェル", "ピーターパン(TDS)",
  "タワテラ", "インディ", "センターオブアース", "トイストーリー",
  "レイジング", "シーライダー",
];

interface CourseItem {
  name: string;
  section: "morning" | "afternoon";
}

interface CourseResult {
  morning: CourseItem[];
  afternoon: CourseItem[];
  advice: string;
}

/**
 * 混雑グレードに応じたおすすめコースを生成する
 * RecommendedCourse.tsx の buildTomorrowCourse を移植
 */
function buildRecommendedCourse(
  parkId: "tdl" | "tds",
  grade: string
): CourseResult {
  const list = parkId === "tdl" ? TDL_COURSE_LIST : TDS_COURSE_LIST;

  let morningItems: typeof list;
  let afternoonItems: typeof list;
  let advice: string;

  if (grade === "A" || grade === "B") {
    morningItems  = list.slice(0, 4);
    afternoonItems = list.slice(4, 8);
    advice = "今日は比較的空いています。人気アトラクションもじっくり楽しめそう！開園に合わせて到着でOK。";
  } else if (grade === "C" || grade === "D") {
    morningItems  = list.slice(0, 3);
    afternoonItems = list.slice(5, 8);
    advice = "混雑が予想されます。開園30分前の到着がおすすめ。午前中に人気アトラクションを優先しましょう。";
  } else if (grade === "S") {
    morningItems  = list.slice(0, 2);
    afternoonItems = list.slice(6, 9);
    advice = "超混雑予想！開園1時間前の到着で朝一番勝負。DPA対象アトラクションは即確保が必須です。";
  } else {
    // E / F
    morningItems  = list.slice(0, 2);
    afternoonItems = list.slice(6, 9);
    advice = "かなり混雑する見込みです。開園45分前の到着を推奨。午後は待ち時間の短いものを優先しましょう。";
  }

  const morning   = morningItems.map(a => ({ name: a.name, section: "morning"   as const }));
  const afternoon = afternoonItems.map(a => ({ name: a.name, section: "afternoon" as const }));

  return { morning, afternoon, advice };
}

/**
 * おすすめコースのツイート文を構築する（280文字制限対応コンパクト版）
 */
function buildCourseTweet(
  parkId: "tdl" | "tds",
  grade: string,
  dateJa: string
): string {
  const parkEmoji = parkId === "tdl" ? "🏰" : "⛵";
  const parkLabel = parkId === "tdl" ? "TDL" : "TDS";
  const shortNames = parkId === "tdl" ? TDL_COURSE_SHORT : TDS_COURSE_SHORT;

  // 混雑グレードに応じたインデックス（buildRecommendedCourseと同一ロジック）
  let morningIdx: number[], afternoonIdx: number[];
  if (grade === "A" || grade === "B") {
    morningIdx = [0, 1, 2, 3]; afternoonIdx = [4, 5, 6, 7];
  } else if (grade === "C" || grade === "D") {
    morningIdx = [0, 1, 2]; afternoonIdx = [5, 6, 7];
  } else {
    // E / F / S
    morningIdx = [0, 1]; afternoonIdx = [6, 7, 8];
  }

  const morning   = morningIdx.map(i => shortNames[i]).join("/");
  const afternoon = afternoonIdx.map(i => shortNames[i]).join("/");

  return [
    `${parkEmoji} ${dateJa} ${parkLabel}おすすめコース`,
    `📊 混雑: ${GRADE_JA[grade]}`,
    ``,
    `午前→${morning}`,
    `午後→${afternoon}`,
    ``,
    `詳細&待ち時間👇`,
    siteUrl(8),
  ].join("\n");
}

// ──────────────────────────────────────────────────────────
// 自動リプライ（検索 → 返信）
// ──────────────────────────────────────────────────────────

const SEARCH_QUERIES = [
  `(TDL OR TDS OR ディズニーランド OR ディズニーシー) (混雑 OR 待ち時間 OR 混んでる) -is:retweet -is:reply lang:ja`,
  `ディズニー 今日 (混んでる OR 待ち時間 OR 空いてる) -is:retweet -is:reply lang:ja`,
  `(東京ディズニー OR tdr_official) 待ち時間 -is:retweet -is:reply lang:ja`,
];

const REPLY_TEMPLATES = [
  "リアルタイムの待ち時間はこちらで確認できます📊 https://disneynow.tokyo",
  "TDLなうで今の待ち時間・混雑予想をチェックできますよ✅ https://disneynow.tokyo",
  "待ち時間・DPA攻略情報はこちらで👇 https://disneynow.tokyo",
  "混雑予想カレンダー＆リアルタイム待ち時間はTDLなうで！ https://disneynow.tokyo",
  "今日の混雑・待ち時間情報はこちらで確認できます🏰 https://disneynow.tokyo",
];

interface SearchTweet {
  id: string;
  text: string;
  author_id: string;
}

async function searchRecentTweets(query: string, env: Env): Promise<SearchTweet[]> {
  if (!env.X_BEARER_TOKEN) {
    console.warn("X_BEARER_TOKEN not set, skipping search");
    return [];
  }
  const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=10&tweet.fields=author_id`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${env.X_BEARER_TOKEN}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("Search failed:", res.status, await res.text());
      return [];
    }
    const data = await res.json() as { data?: SearchTweet[] };
    return data.data ?? [];
  } catch (e) {
    console.error("Search error:", String(e));
    return [];
  }
}

async function postReply(inReplyToId: string, text: string, env: Env): Promise<void> {
  const url = "https://api.twitter.com/2/tweets";
  const authHeader = await buildOAuthHeader("POST", url, env);
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ text, reply: { in_reply_to_tweet_id: inReplyToId } }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Reply API error ${res.status}: ${body}`);
  }
  const data = await res.json() as { data: { id: string } };
  console.log("Reply posted:", data.data.id, "→", inReplyToId);
}

async function searchAndReply(env: Env): Promise<void> {
  const query = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
  console.log("Searching:", query);

  const tweets = await searchRecentTweets(query, env);
  if (tweets.length === 0) {
    console.log("No tweets found");
    return;
  }

  let replyCount = 0;
  const MAX_REPLIES_PER_RUN = 3;

  for (const tweet of tweets) {
    if (replyCount >= MAX_REPLIES_PER_RUN) break;

    // 重複チェック（KVが設定されている場合のみ）
    if (env.REPLIED_TWEETS) {
      const alreadyRepliedTweet = await env.REPLIED_TWEETS.get(`tweet:${tweet.id}`);
      if (alreadyRepliedTweet) continue;
      // 同じユーザーには24時間以内に1回まで
      const alreadyRepliedUser = await env.REPLIED_TWEETS.get(`user:${tweet.author_id}`);
      if (alreadyRepliedUser) continue;
    }

    const replyText = REPLY_TEMPLATES[Math.floor(Math.random() * REPLY_TEMPLATES.length)];
    try {
      await postReply(tweet.id, replyText, env);

      if (env.REPLIED_TWEETS) {
        await env.REPLIED_TWEETS.put(`tweet:${tweet.id}`, "1", { expirationTtl: 60 * 60 * 24 * 30 });
        await env.REPLIED_TWEETS.put(`user:${tweet.author_id}`, "1", { expirationTtl: 60 * 60 * 24 });
      }
      replyCount++;
      await new Promise(r => setTimeout(r, 4000));
    } catch (e) {
      console.error(`Reply to ${tweet.id} FAILED:`, String(e));
    }
  }

  console.log(`searchAndReply: ${replyCount} replies sent`);
}

// ──────────────────────────────────────────────────────────
// ① 朝8時ツイート（開演前・情報収集層向け）
// ──────────────────────────────────────────────────────────
async function buildMorningTweets(now: Date): Promise<string[]> {
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

  // ① JA 朝の基本情報ツイート
  const ja = [
    `🏰 ${dateJa} 開園前ディズニー情報`,``,
    `📊 本日の混雑予報: ${GRADE_JA[grade]}`,
    hoursJa, wLineJa, advJa,``,
    `詳細はこちら👇`, siteUrl(8),
  ].filter(Boolean).join("\n");

  // ② EN 朝の基本情報ツイート
  const en = [
    `🏰 Tokyo Disney Resort — ${dateEn}`,``,
    `📊 Today's crowd forecast: ${GRADE_EN[grade]}`,
    hoursEn, wLineEn, advEn,``,
    `Full info & wait times 👇`, siteUrl(8),
  ].filter(Boolean).join("\n");

  // ③ TDL おすすめコースツイート（JA）
  const tdlCourse = buildCourseTweet("tdl", grade, dateJa);

  // ④ TDS おすすめコースツイート（JA）
  const tdsCourse = buildCourseTweet("tds", grade, dateJa);

  return [ja, en, tdlCourse, tdsCourse];
}

/**
 * 午後のおすすめコースツイートを構築（リアルタイム混雑度ベース）
 */
function buildAfternoonCourseTweet(
  parkId: "tdl" | "tds",
  grade: string,
  dateJa: string
): string {
  const parkEmoji = parkId === "tdl" ? "🏰" : "⛵";
  const parkName  = parkId === "tdl" ? "ディズニーランド" : "ディズニーシー";
  const course    = buildRecommendedCourse(parkId, grade);

  const lines = course.afternoon.map((item, i) => `　${i + 1}. ${item.name}`).join("\n");

  return [
    `${parkEmoji} ${dateJa} ${parkName} 午後のおすすめコース`,
    ``,
    `📊 現在の混雑度: ${GRADE_JA[grade]}`,
    ``,
    `【今から乗るならここ！】`,
    lines,
    ``,
    `💡 ${course.advice}`,
    ``,
    `リアルタイム待ち時間👇`,
    siteUrl(13),
  ].join("\n");
}

// ──────────────────────────────────────────────────────────
// ② 昼13時ツイート（リアルタイム待ち時間・昼休み層向け）
// ──────────────────────────────────────────────────────────
async function buildLunchTweets(now: Date): Promise<string[]> {
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

  // リアルタイムデータから実際の混雑グレードを算出
  const allAttractions = [
    ...(tdl?.attractions ?? []),
    ...(tds?.attractions ?? []),
  ];
  const realtimeGrade = allAttractions.length > 0 ? gradeFromWaitData(allAttractions) : grade;

  const tdlTop = topWaits(tdl, 3);
  const tdsTop = topWaits(tds, 3);
  const tdlShort = shortWaits(tdl, 2);

  const tdlTopEn = topWaitsEn(tdl, 3);
  const tdsTopEn = topWaitsEn(tds, 3);
  const tdlShortEn = shortWaitsEn(tdl, 2);

  const wd = ["日","月","火","水","木","金","土"][now.getDay()];
  const dateJa = `${now.getMonth()+1}月${now.getDate()}日(${wd})`;

  // 最長待ちと最短待ちを1件ずつ抽出
  const topTdl = tdlTop[0] ?? "";
  const shortTdl = tdlShort[0] ?? "";
  const topTds = tdsTop[0] ?? "";

  const ja = [
    `🕐 ${dateJa} ディズニー昼の混雑情報`,``,
    `📊 現在の混雑度: ${GRADE_JA[realtimeGrade]}`,``,
    topTdl    ? `🏰 ランド最長待ち: ${topTdl}` : "",
    topTds    ? `⛵ シー最長待ち: ${topTds}` : "",
    shortTdl  ? `💡 今すぐ乗れる: ${shortTdl}` : "",``,
    `リアルタイム待ち時間はこちら👇`,
    siteUrl(13),
  ].filter(Boolean).join("\n");

  // EN: アトラクション名を省いて待ち時間(分)のみ表示（280文字制限対応）
  const tdlMaxMin = tdl?.attractions.filter(a => a.is_open && a.wait_time > 0).sort((a,b) => b.wait_time - a.wait_time)[0]?.wait_time;
  const tdsMaxMin = tds?.attractions.filter(a => a.is_open && a.wait_time > 0).sort((a,b) => b.wait_time - a.wait_time)[0]?.wait_time;
  const tdlMinMin = tdl?.attractions.filter(a => a.is_open && a.wait_time >= 0).sort((a,b) => a.wait_time - b.wait_time)[0]?.wait_time;

  const en = [
    `🕐 Disney Update [${now.getMonth()+1}/${now.getDate()} Lunch]`,``,
    `📊 Crowd: ${GRADE_EN[realtimeGrade]}`,``,
    tdlMaxMin != null ? `🏰 Land top wait: ${tdlMaxMin}min` : "",
    tdsMaxMin != null ? `⛵ Sea top wait: ${tdsMaxMin}min` : "",
    tdlMinMin != null ? `💡 Short wait: ${tdlMinMin === 0 ? "No wait ✨" : `${tdlMinMin}min`}` : "",``,
    `Real-time wait times 👇`,
    siteUrl(13),
  ].filter(Boolean).join("\n");

  // 午後コースは朝のコースツイートと内容が重複しTwitter APIに弾かれるため除外
  return [ja, en];
}

/**
 * 夕方〜閉園までのおすすめコースツイートを構築（リアルタイム混雑度ベース）
 */
function buildEveningCourseTweet(
  parkId: "tdl" | "tds",
  grade: string,
  dateJa: string
): string {
  const parkEmoji = parkId === "tdl" ? "🏰" : "⛵";
  const parkName  = parkId === "tdl" ? "ディズニーランド" : "ディズニーシー";
  const course    = buildRecommendedCourse(parkId, grade);

  // 夕方は午後コースのアトラクションを使用
  const lines = course.afternoon.map((item, i) => `　${i + 1}. ${item.name}`).join("\n");

  return [
    `${parkEmoji} ${dateJa} ${parkName} 夕方〜閉園のおすすめコース`,
    ``,
    `📊 現在の混雑度: ${GRADE_JA[grade]}`,
    ``,
    `【今から間に合う！夕方コース】`,
    lines,
    ``,
    `💡 待ち時間が落ち着く夕方が狙い目。閉園間際は列が短くなるアトラクションも！`,
    ``,
    `リアルタイム待ち時間👇`,
    siteUrl(16),
  ].join("\n");
}

// ──────────────────────────────────────────────────────────
// ③ 夕方16時ツイート（閉園までのプラン・夜のプラン層向け）
// ──────────────────────────────────────────────────────────
async function buildEveningTweets(now: Date): Promise<string[]> {
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

  // リアルタイム混雑グレード算出
  const allAttractions = [
    ...(tdl?.attractions ?? []),
    ...(tds?.attractions ?? []),
  ];
  const grade = predictCrowd(now);
  const realtimeGrade = allAttractions.length > 0 ? gradeFromWaitData(allAttractions) : grade;

  const wd = ["日","月","火","水","木","金","土"][now.getDay()];
  const dateJa = `${now.getMonth()+1}月${now.getDate()}日(${wd})`;

  const shortTdl = shortList(tdl, 1, false)[0] ?? "";
  const shortTds = shortList(tds, 1, false)[0] ?? "";
  const shortTdlEn = shortList(tdl, 1, true)[0] ?? "";
  const shortTdsEn = shortList(tds, 1, true)[0] ?? "";

  const ja = [
    `🌆 ${dateJa} ディズニー夕方情報`,``,
    hours ? `⏰ ランド閉園まで${tdlClose} / シー閉園まで${tdsClose}` : "",``,
    `📊 現在の混雑度: ${GRADE_JA[realtimeGrade]}`,
    shortTdl ? `🏰 ランドで今すぐ乗れる: ${shortTdl}` : "",
    shortTds ? `⛵ シーで今すぐ乗れる: ${shortTds}` : "",``,
    `夕方以降のプランはこちら👇`,
    siteUrl(16),
  ].filter(Boolean).join("\n");

  // EN: アトラクション名を省いて待ち時間(分)のみ表示（280文字制限対応）
  const tdlShortMin = tdl?.attractions.filter(a => a.is_open && a.wait_time >= 0).sort((a,b) => a.wait_time - b.wait_time)[0]?.wait_time;
  const tdsShortMin = tds?.attractions.filter(a => a.is_open && a.wait_time >= 0).sort((a,b) => a.wait_time - b.wait_time)[0]?.wait_time;

  const en = [
    `🌆 Disney Evening [${now.getMonth()+1}/${now.getDate()} 4PM]`,``,
    hours ? `⏰ Land: ${tdlCloseEn} / Sea: ${tdsCloseEn}` : "",``,
    `📊 Crowd: ${GRADE_EN[realtimeGrade]}`,
    tdlShortMin != null ? `🏰 Land short wait: ${tdlShortMin === 0 ? "No wait ✨" : `${tdlShortMin}min`}` : "",
    tdsShortMin != null ? `⛵ Sea short wait: ${tdsShortMin === 0 ? "No wait ✨" : `${tdsShortMin}min`}` : "",``,
    `Evening plan & wait times 👇`,
    siteUrl(16),
  ].filter(Boolean).join("\n");

  // 夕方コースは朝のコースツイートと内容が重複しTwitter APIに弾かれるため除外
  return [ja, en];
}

// ──────────────────────────────────────────────────────────
// Cron エントリーポイント
// ──────────────────────────────────────────────────────────
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 認証情報診断: ?action=auth-check（API呼び出しのみ、投稿なし）
    if (url.searchParams.get("action") === "auth-check") {
      const tweetUrl = "https://api.twitter.com/2/users/me";
      const authHeader = await buildOAuthHeader("GET", tweetUrl, env);
      const res = await fetch(tweetUrl, { headers: { Authorization: authHeader } });
      const body = await res.text();
      return new Response(`Status: ${res.status}\nBody: ${body}`, { status: 200 });
    }

    // コースツイートのみ投稿: ?action=post-course
    if (url.searchParams.get("action") === "post-course") {
      const jstNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
      const wd = ["日","月","火","水","木","金","土"][jstNow.getDay()];
      const dateJa = `${jstNow.getMonth()+1}月${jstNow.getDate()}日(${wd})`;
      const grade = predictCrowd(jstNow);
      const tdlTweet = buildCourseTweet("tdl", grade, dateJa);
      const tdsTweet = buildCourseTweet("tds", grade, dateJa);
      const logs: string[] = [];
      try {
        await postTweet(tdlTweet, env);
        logs.push("TDL course posted successfully\n" + tdlTweet);
      } catch (e) {
        logs.push("TDL course FAILED: " + String(e));
      }
      await new Promise(r => setTimeout(r, 3000));
      try {
        await postTweet(tdsTweet, env);
        logs.push("TDS course posted successfully\n" + tdsTweet);
      } catch (e) {
        logs.push("TDS course FAILED: " + String(e));
      }
      return new Response(logs.join("\n\n"), { status: 200 });
    }

    // プレビュー: ?action=preview&hour=8|13|16（投稿せずにツイート内容を確認）
    if (url.searchParams.get("action") === "preview") {
      const h = parseInt(url.searchParams.get("hour") ?? "0");
      const jstNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
      let tweets: string[] = [];
      let labels: string[] = [];
      if (h === 8) {
        tweets = await buildMorningTweets(jstNow);
        labels = ["JA morning", "EN morning", "TDL course", "TDS course"];
      } else if (h === 13) {
        tweets = await buildLunchTweets(jstNow);
        labels = ["JA lunch", "EN lunch"];
      } else if (h === 16) {
        tweets = await buildEveningTweets(jstNow);
        labels = ["JA evening", "EN evening"];
      } else {
        return new Response("use ?action=preview&hour=8|13|16", { status: 400 });
      }
      const lines = tweets.map((t, i) => `=== ${labels[i]} (${t.length}chars) ===\n${t}`).join("\n\n");
      return new Response(lines, { status: 200 });
    }

    const hourParam = url.searchParams.get("hour");
    if (!hourParam) return new Response("use ?action=preview&hour=8|13|16 or ?action=auth-check\n⚠️ ?hour=XX は実際に投稿されます", { status: 400 });
    const hour = parseInt(hourParam);
    const now = new Date();
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const logs: string[] = [];
    const log = (msg: string) => { console.log(msg); logs.push(msg); };
    const logErr = (msg: string) => { console.error(msg); logs.push("ERROR: " + msg); };

    async function runTweets(tweets: string[], labels: string[]) {
      for (let i = 0; i < tweets.length; i++) {
        log(`${labels[i]} (${tweets[i].length}chars): ${tweets[i].slice(0, 60)}...`);
        try {
          await postTweet(tweets[i], env);
          log(`${labels[i]} posted successfully`);
        } catch (e) {
          logErr(`${labels[i]} FAILED: ${String(e)}`);
        }
        if (i < tweets.length - 1) await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (hour === 8) {
      const tweets = await buildMorningTweets(jstNow);
      await runTweets(tweets, ["JA morning", "EN morning", "TDL course", "TDS course"]);
    } else if (hour === 13) {
      const tweets = await buildLunchTweets(jstNow);
      await runTweets(tweets, ["JA lunch", "EN lunch", "TDL afternoon", "TDS afternoon"]);
    } else if (hour === 16) {
      const tweets = await buildEveningTweets(jstNow);
      await runTweets(tweets, ["JA evening", "EN evening", "TDL evening", "TDS evening"]);
    } else {
      return new Response("hour must be 8, 13, or 16", { status: 400 });
    }
    return new Response(logs.join("\n"), { status: 200 });
  },

  async scheduled(_event: ScheduledController, env: Env, _ctx: ExecutionContext) {
    // JST での現在時刻（UTC+9を直接計算 — Cloudflare Workers環境でも確実）
    const utcNow = new Date();
    const jstNow = new Date(utcNow.getTime() + 9 * 60 * 60 * 1000);
    const hour = jstNow.getUTCHours();

    console.log(`Cron fired at UTC ${utcNow.getUTCHours()}:00, JST ${hour}:00`);

    if (hour === 8) {
      // 朝8時: 4本順次投稿（基本情報JA・EN + TDLコース + TDSコース）
      const tweets = await buildMorningTweets(jstNow);

      const labels = ["JA morning", "EN morning", "TDL course", "TDS course"];
      for (let i = 0; i < tweets.length; i++) {
        console.log(`${labels[i]}:`, tweets[i]);
        try {
          await postTweet(tweets[i], env);
          console.log(`${labels[i]} posted successfully`);
        } catch (e) {
          console.error(`${labels[i]} FAILED:`, String(e));
        }
        if (i < tweets.length - 1) {
          await new Promise(r => setTimeout(r, 3000));
        }
      }

      // 自動リプライ（検索APIコストが高いため無効化中）
      // try { await searchAndReply(env); } catch (e) { console.error("searchAndReply FAILED:", String(e)); }

    } else if (hour === 13) {
      const tweets = await buildLunchTweets(jstNow);
      const labels = ["JA lunch", "EN lunch", "TDL afternoon course", "TDS afternoon course"];

      for (let i = 0; i < tweets.length; i++) {
        console.log(`${labels[i]}:`, tweets[i]);
        try {
          await postTweet(tweets[i], env);
          console.log(`${labels[i]} posted successfully`);
        } catch (e) {
          console.error(`${labels[i]} FAILED:`, String(e));
        }
        if (i < tweets.length - 1) {
          await new Promise(r => setTimeout(r, 3000));
        }
      }

      // 自動リプライ（検索APIコストが高いため無効化中）
      // try { await searchAndReply(env); } catch (e) { console.error("searchAndReply FAILED:", String(e)); }

    } else if (hour === 16) {
      const tweets = await buildEveningTweets(jstNow);
      const labels = ["JA evening", "EN evening", "TDL evening course", "TDS evening course"];

      for (let i = 0; i < tweets.length; i++) {
        console.log(`${labels[i]}:`, tweets[i]);
        try {
          await postTweet(tweets[i], env);
          console.log(`${labels[i]} posted successfully`);
        } catch (e) {
          console.error(`${labels[i]} FAILED:`, String(e));
        }
        if (i < tweets.length - 1) {
          await new Promise(r => setTimeout(r, 3000));
        }
      }

      // 自動リプライ（検索APIコストが高いため無効化中）
      // try { await searchAndReply(env); } catch (e) { console.error("searchAndReply FAILED:", String(e)); }

    } else {
      console.log(`Hour ${hour} is not a scheduled post time. Skipping.`);
    }
  },
} satisfies ExportedHandler<Env>;
