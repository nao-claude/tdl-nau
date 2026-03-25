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

// ── ツイート文生成 ────────────────────────────────────────────────
async function buildTweetText() {
  // JSTで今日の日付
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const dateLabel = `${now.getMonth() + 1}月${now.getDate()}日(${weekdays[now.getDay()]})`;

  // 混雑予測
  const grade = predictCrowd(now);
  const gradeLabel = GRADE_LABELS[grade];

  // 天気（失敗してもツイートは送る）
  let weatherLine = "";
  let weatherAdvice = "";
  try {
    const res = await fetch("https://disneynow.tokyo/api/weather/current", { signal: AbortSignal.timeout(5000) });
    const w = await res.json();
    const eveRain = w.evening.precipProb > 0 ? ` 降水確率${w.evening.precipProb}%` : "";
    weatherLine = `🌡 現在${weatherEmoji(w.current.code)}${w.current.temp}° / 夕方${weatherEmoji(w.evening.code)}${w.evening.temp}°${eveRain}`;

    // 雨アドバイス
    const isRainy = [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w.current.code)
      || [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(w.evening.code);
    const rainLikely = w.evening.precipProb >= 50;
    if (isRainy) {
      weatherAdvice = "☔ 今日は雨です。カッパか折りたたみ傘を忘れずに！";
    } else if (rainLikely) {
      weatherAdvice = `🌂 夕方から雨の可能性あり（${w.evening.precipProb}%）。折りたたみ傘があると安心です。`;
    }

    // 気温アドバイス（雨アドバイスがない場合のみ）
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
  } catch {
    console.warn("Weather fetch failed, skipping weather line.");
  }

  // 営業時間
  let hoursLine = "";
  try {
    const res = await fetch("https://disneynow.tokyo/api/park-hours", { signal: AbortSignal.timeout(5000) });
    const h = await res.json();
    if (h.tdl && h.tds) {
      hoursLine = `🕘 ランド ${h.tdl.open}〜${h.tdl.close} / シー ${h.tds.open}〜${h.tds.close}`;
    }
  } catch {
    console.warn("Park hours fetch failed, skipping hours line.");
  }

  const allLines = [
    `🏰 ${dateLabel} のディズニー情報`,
    ``,
    `📊 混雑予想: ${gradeLabel}`,
    weatherLine,
    hoursLine,
    weatherAdvice,
    ``,
    `詳細・リアルタイム待ち時間はこちら👇`,
    `https://disneynow.tokyo`,
    ``,
    `#TDL #TDS #ディズニー`,
  ].filter(Boolean);

  return allLines.join("\n");
}

// ── メイン ─────────────────────────────────────────────────────────
async function main() {
  const text = await buildTweetText();
  console.log("Tweet text:\n" + text);
  console.log(`\nLength: ${text.length} chars`);

  if (process.env.DRY_RUN === "true") {
    console.log("\n[DRY RUN] Not posting.");
    return;
  }

  const result = await postTweet(text);
  console.log("Posted:", result.data?.id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
