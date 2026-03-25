#!/usr/bin/env node
// 毎朝8時に今日のディズニー情報をX（Twitter）に投稿するスクリプト
// GitHub Actionsから実行される
// 必要な環境変数: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET

import { TwitterApi } from "twitter-api-v2";

async function postTweet(text) {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET } = process.env;
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
    throw new Error("X API credentials are not set in environment variables.");
  }
  const client = new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_TOKEN_SECRET,
  });
  return client.v2.tweet(text);
}

// ── 混雑予測ロジック（crowd-prediction.ts の移植）───────────────
const FIXED_HOLIDAYS = {
  "01-01": "元日", "02-11": "建国記念の日", "02-23": "天皇誕生日",
  "04-29": "昭和の日", "05-03": "憲法記念日", "05-04": "みどりの日",
  "05-05": "こどもの日", "08-11": "山の日", "11-03": "文化の日", "11-23": "勤労感謝の日",
};

function isHoliday(date) {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  if (FIXED_HOLIDAYS[mmdd]) return true;
  const month = date.getMonth() + 1;
  const weekday = date.getDay();
  const weekOfMonth = Math.ceil(date.getDate() / 7);
  if (month === 1 && weekday === 1 && weekOfMonth === 2) return true;
  if (month === 7 && weekday === 1 && weekOfMonth === 3) return true;
  if (month === 9 && weekday === 1 && weekOfMonth === 3) return true;
  if (month === 10 && weekday === 1 && weekOfMonth === 2) return true;
  const year = date.getFullYear();
  const spring = Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  const autumn = Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  if (month === 3 && date.getDate() === spring) return true;
  if (month === 9 && date.getDate() === autumn) return true;
  return false;
}

function isSchoolVacation(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month === 7 && day >= 20) return true;
  if (month === 8) return true;
  if (month === 3 && day >= 20) return true;
  if (month === 4 && day <= 7) return true;
  if (month === 12 && day >= 25) return true;
  if (month === 1 && day <= 7) return true;
  return false;
}

function getEventBoost(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const events = [
    { start: [4, 29], end: [5, 6],   boost: 3 },
    { start: [9, 1],  end: [10, 31], boost: 1 },
    { start: [11, 8], end: [12, 24], boost: 2 },
    { start: [12, 25],end: [12, 31], boost: 3 },
    { start: [3, 1],  end: [3, 19],  boost: 2 },
    { start: [3, 20], end: [3, 31],  boost: 1 },
  ];
  for (const e of events) {
    const after = month > e.start[0] || (month === e.start[0] && day >= e.start[1]);
    const before = month < e.end[0]  || (month === e.end[0]  && day <= e.end[1]);
    if (after && before) return e.boost;
  }
  return 0;
}

function predictCrowd(date) {
  const weekday = date.getDay();
  const month = date.getMonth() + 1;
  const holiday = isHoliday(date);
  const vacation = isSchoolVacation(date);
  const eventBoost = getEventBoost(date);
  const isWeekend = weekday === 0 || weekday === 6;

  let score = 0;
  if (isWeekend) score += 3;
  else if (weekday === 5) score += 1;

  if (month === 3) {
    score += 1;
    if (holiday) {
      score += isWeekend ? 1 : 3;
    } else if (date.getDate() <= 19) {
      score += eventBoost;
    } else {
      if (!isWeekend) {
        if (vacation) score += 2;
        score += eventBoost;
      }
    }
  } else {
    if (holiday) score += isWeekend ? 1 : 3;
    if (vacation) score += 2;
    score += eventBoost;
  }

  if (score >= 9) return "S";
  if (score >= 7) return "F";
  if (score >= 6) return "E";
  if (score >= 5) return "D";
  if (score >= 3) return "C";
  if (score >= 2) return "B";
  return "A";
}

const GRADE_LABELS = {
  A: "ガラガラ🟢 待ち時間ほぼなし！",
  B: "空いてます🟢 狙い目な日です",
  C: "まあまあ混んでます🟡",
  D: "やや混雑🟠 人気アトラクションは並びます",
  E: "混雑してます🔴 待ち時間長めです",
  F: "かなり混雑🔴 覚悟して行きましょう",
  S: "超混雑🚨 待ち時間MAXです",
};

const GRADE_LABELS_EN = {
  A: "Very Empty 🟢",
  B: "Quiet 🟢",
  C: "Moderate 🟡",
  D: "Somewhat Busy 🟠",
  E: "Busy 🔴",
  F: "Very Busy 🔴",
  S: "Extremely Busy 🚨",
};

// ── 天気絵文字 ────────────────────────────────────────────────────
function weatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code <= 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "❄️";
  return "⛈️";
}

// ── 共通データ取得 ────────────────────────────────────────────────
async function fetchSharedData() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const grade = predictCrowd(now);

  // 天気
  let weather = null;
  try {
    const res = await fetch("https://disneynow.tokyo/api/weather/current", { signal: AbortSignal.timeout(5000) });
    weather = await res.json();
  } catch {
    console.warn("Weather fetch failed, skipping weather line.");
  }

  // 待ち時間
  let waitTimes = null;
  try {
    const [tdlRes, tdsRes] = await Promise.all([
      fetch("https://disneynow.tokyo/api/wait-times/tdl", { signal: AbortSignal.timeout(5000) }),
      fetch("https://disneynow.tokyo/api/wait-times/tds", { signal: AbortSignal.timeout(5000) }),
    ]);
    const [tdl, tds] = await Promise.all([tdlRes.json(), tdsRes.json()]);
    waitTimes = {
      tdlMax: Math.max(0, ...tdl.attractions.filter(a => a.is_open).map(a => a.wait_time)),
      tdsMax: Math.max(0, ...tds.attractions.filter(a => a.is_open).map(a => a.wait_time)),
    };
  } catch {
    console.warn("Wait times fetch failed, skipping wait line.");
  }

  // 営業時間
  let parkHours = null;
  try {
    const res = await fetch("https://disneynow.tokyo/api/park-hours", { signal: AbortSignal.timeout(5000) });
    const h = await res.json();
    if (h.tdl && h.tds) {
      parkHours = { tdl: h.tdl, tds: h.tds };
    }
  } catch {
    console.warn("Park hours fetch failed, skipping hours line.");
  }

  // 短縮URL（1回だけ取得）
  let siteUrl = "https://disneynow.tokyo";
  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(siteUrl)}`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) siteUrl = await res.text();
  } catch {
    console.warn("TinyURL fetch failed, using original URL.");
  }

  return { now, grade, weather, waitTimes, parkHours, siteUrl };
}

// ── 日本語ツイート文生成 ──────────────────────────────────────────
function buildTweetText({ now, grade, weather, waitTimes, parkHours, siteUrl }) {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const dateLabel = `${now.getMonth() + 1}月${now.getDate()}日(${weekdays[now.getDay()]})`;
  const gradeLabel = GRADE_LABELS[grade];

  let weatherLine = "";
  let weatherAdvice = "";
  if (weather) {
    const w = weather;
    const eveRain = w.evening.precipProb > 0 ? ` 降水確率${w.evening.precipProb}%` : "";
    weatherLine = `🌡 現在${weatherEmoji(w.current.code)}${w.current.temp}° / 夕方${weatherEmoji(w.evening.code)}${w.evening.temp}°${eveRain}`;

    const isRainy = [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w.current.code)
      || [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w.evening.code);
    const rainLikely = w.evening.precipProb >= 50;
    if (isRainy) {
      weatherAdvice = "☔ 今日は雨です。カッパか折りたたみ傘を忘れずに！";
    } else if (rainLikely) {
      weatherAdvice = `🌂 夕方から雨の可能性あり（${w.evening.precipProb}%）。折りたたみ傘があると安心です。`;
    }

    if (!weatherAdvice) {
      const maxTemp = Math.max(w.current.temp, w.evening.temp);
      const minTemp = Math.min(w.current.temp, w.evening.temp);
      if (maxTemp >= 30) {
        weatherAdvice = "🥵 かなり暑いです！熱中症対策に飲み物・帽子をお忘れなく。";
      } else if (maxTemp >= 25) {
        weatherAdvice = "😎 暑くなります。日焼け止め・水分補給をしっかりと！";
      } else if (minTemp <= 5) {
        weatherAdvice = "🥶 かなり寒いです！厚手のコートや手袋を忘れずに。";
      } else if (minTemp <= 10) {
        weatherAdvice = "🧥 肌寒いです。上着を1枚持って行きましょう。";
      } else if (maxTemp >= 20 && minTemp <= 12) {
        weatherAdvice = "👕 朝晩と昼間で気温差があります。脱ぎ着しやすい服装がおすすめ！";
      }
    }
  }

  const waitLine = waitTimes
    ? `🎢 ランド 待ち時間最長${waitTimes.tdlMax}分 / シー 待ち時間最長${waitTimes.tdsMax}分`
    : "";

  const hoursLine = parkHours
    ? `🕘 ランド ${parkHours.tdl.open}〜${parkHours.tdl.close} / シー ${parkHours.tds.open}〜${parkHours.tds.close}`
    : "";

  const allLines = [
    `🏰 ${dateLabel} 現在のディズニーランド情報`,
    ``,
    `📊 本日の混雑: ${gradeLabel}`,
    waitLine,
    weatherLine,
    hoursLine,
    weatherAdvice,
    ``,
    `詳細・リアルタイム待ち時間はこちら👇`,
    siteUrl,
    ``,
  ].filter(Boolean);

  return allLines.join("\n");
}

// ── 英語ツイート文生成 ────────────────────────────────────────────
function buildEnglishTweetText({ now, grade, weather, waitTimes, parkHours, siteUrl }) {
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dateLabel = `${monthNames[now.getMonth()]} ${now.getDate()} (${weekdayNames[now.getDay()]})`;
  const gradeLabel = GRADE_LABELS_EN[grade];

  let weatherLine = "";
  let weatherAdvice = "";
  if (weather) {
    const w = weather;
    const eveRain = w.evening.precipProb > 0 ? ` Rain ${w.evening.precipProb}%` : "";
    weatherLine = `🌡 Now ${weatherEmoji(w.current.code)}${w.current.temp}° / Eve ${weatherEmoji(w.evening.code)}${w.evening.temp}°${eveRain}`;

    const isRainy = [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w.current.code)
      || [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w.evening.code);
    const rainLikely = w.evening.precipProb >= 50;
    if (isRainy) {
      weatherAdvice = "☔ Rain today! Don't forget a raincoat or umbrella.";
    } else if (rainLikely) {
      weatherAdvice = `🌂 Rain possible in the evening (${w.evening.precipProb}%). A folding umbrella is recommended.`;
    }

    if (!weatherAdvice) {
      const maxTemp = Math.max(w.current.temp, w.evening.temp);
      const minTemp = Math.min(w.current.temp, w.evening.temp);
      if (maxTemp >= 30) {
        weatherAdvice = "🥵 Very hot today! Stay hydrated and wear a hat.";
      } else if (maxTemp >= 25) {
        weatherAdvice = "😎 It'll be warm. Don't forget sunscreen and water!";
      } else if (minTemp <= 5) {
        weatherAdvice = "🥶 Very cold! Bring a heavy coat and gloves.";
      } else if (minTemp <= 10) {
        weatherAdvice = "🧥 Chilly today. Pack a jacket.";
      } else if (maxTemp >= 20 && minTemp <= 12) {
        weatherAdvice = "👕 Big temp swing today. Dress in layers!";
      }
    }
  }

  const waitLine = waitTimes
    ? `🎢 Land: Max wait ${waitTimes.tdlMax} min / Sea: Max wait ${waitTimes.tdsMax} min`
    : "";

  const hoursLine = parkHours
    ? `🕘 Land ${parkHours.tdl.open}–${parkHours.tdl.close} / Sea ${parkHours.tds.open}–${parkHours.tds.close}`
    : "";

  const allLines = [
    `🏰 Tokyo Disney Resort - ${dateLabel}`,
    ``,
    `📊 Today's crowd: ${gradeLabel}`,
    waitLine,
    weatherLine,
    hoursLine,
    weatherAdvice,
    ``,
    `Real-time wait times 👇`,
    siteUrl,
    ``,
  ].filter(Boolean);

  return allLines.join("\n");
}

// ── sleep ─────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── メイン ─────────────────────────────────────────────────────────
async function main() {
  const shared = await fetchSharedData();

  // 日本語ツイート
  const jaText = buildTweetText(shared);
  console.log("=== Japanese Tweet ===\n" + jaText);
  console.log(`Length: ${jaText.length} chars\n`);

  // 英語ツイート
  const enText = buildEnglishTweetText(shared);
  console.log("=== English Tweet ===\n" + enText);
  console.log(`Length: ${enText.length} chars\n`);

  if (process.env.DRY_RUN === "true") {
    console.log("[DRY RUN] Not posting.");
    return;
  }

  // 日本語投稿
  try {
    const jaResult = await postTweet(jaText);
    console.log("Posted (JA):", jaResult.data?.id);
  } catch (e) {
    console.error("Failed to post Japanese tweet:", e);
  }

  // 少し間隔を空ける
  await sleep(1500);

  // 英語投稿
  try {
    const enResult = await postTweet(enText);
    console.log("Posted (EN):", enResult.data?.id);
  } catch (e) {
    console.error("Failed to post English tweet:", e);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
