// 混雑予測ロジック
// 根拠: 曜日 + 日本の祝日 + 長期休暇 + 特別イベント期間

export type CrowdGrade = "A" | "B" | "C" | "D" | "E" | "F" | "S";

export interface CrowdInfo {
  grade: CrowdGrade;
  label: string;
  color: string;
  bgColor: string;
  avgWait: string;
}

export const CROWD_INFO: Record<CrowdGrade, CrowdInfo> = {
  A: { grade: "A", label: "かなり空き", color: "text-sky-600",    bgColor: "bg-sky-100",    avgWait: "人気5本平均〜19分" },
  B: { grade: "B", label: "やや空き",   color: "text-green-600",  bgColor: "bg-green-100",  avgWait: "20〜34分" },
  C: { grade: "C", label: "普通",       color: "text-lime-600",   bgColor: "bg-lime-100",   avgWait: "35〜54分" },
  D: { grade: "D", label: "やや混雑",   color: "text-yellow-600", bgColor: "bg-yellow-100", avgWait: "55〜74分" },
  E: { grade: "E", label: "混雑",       color: "text-orange-600", bgColor: "bg-orange-100", avgWait: "75〜94分" },
  F: { grade: "F", label: "かなり混雑", color: "text-red-600",    bgColor: "bg-red-100",    avgWait: "95〜119分" },
  S: { grade: "S", label: "超混雑",     color: "text-purple-600", bgColor: "bg-purple-100", avgWait: "120分〜" },
};

// 日本の祝日（固定祝日）
const FIXED_HOLIDAYS: Record<string, string> = {
  "01-01": "元日",
  "02-11": "建国記念の日",
  "02-23": "天皇誕生日",
  "04-29": "昭和の日",
  "05-03": "憲法記念日",
  "05-04": "みどりの日",
  "05-05": "こどもの日",
  "08-11": "山の日",
  "11-03": "文化の日",
  "11-23": "勤労感謝の日",

};

function isHoliday(date: Date): boolean {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  if (FIXED_HOLIDAYS[mmdd]) return true;

  // ハッピーマンデー系（簡易判定）
  const month = date.getMonth() + 1;
  const weekday = date.getDay(); // 0=日
  const weekOfMonth = Math.ceil(date.getDate() / 7);

  if (month === 1 && weekday === 1 && weekOfMonth === 2) return true; // 成人の日
  if (month === 7 && weekday === 1 && weekOfMonth === 3) return true; // 海の日
  if (month === 9 && weekday === 1 && weekOfMonth === 3) return true; // 敬老の日
  if (month === 10 && weekday === 1 && weekOfMonth === 2) return true; // スポーツの日

  // 春分・秋分（簡易近似）
  const year = date.getFullYear();
  const springEquinox = Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  const autumnEquinox = Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  if (month === 3 && date.getDate() === springEquinox) return true;
  if (month === 9 && date.getDate() === autumnEquinox) return true;

  return false;
}

function isSchoolVacation(date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // 夏休み (7/20〜8/31)
  if (month === 7 && day >= 20) return true;
  if (month === 8) return true;
  // 春休み (3/20〜4/7): 春分の日以降は事実上の春休み
  if (month === 3 && day >= 20) return true;
  if (month === 4 && day <= 7) return true;
  // 冬休み (12/25〜1/7)
  if (month === 12 && day >= 25) return true;
  if (month === 1 && day <= 7) return true;
  return false;
}

type EventPeriod = { start: [number, number]; end: [number, number]; name: string; boost: number };

function getEventBoost(date: Date): number {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const events: EventPeriod[] = [
    { start: [4, 29], end: [5, 6],   name: "GW",            boost: 3 },
    { start: [9, 1],  end: [10, 31], name: "ハロウィン",     boost: 1 },
    { start: [11, 8], end: [12, 24], name: "クリスマス",     boost: 2 },
    { start: [12, 25],end: [12, 31], name: "年末クリスマス", boost: 3 },
    { start: [3, 1],  end: [3, 19],  name: "春イベント前半", boost: 2 }, // 3月前半は卒業式シーズンで混雑
    { start: [3, 20], end: [3, 31],  name: "春イベント後半", boost: 1 }, // 春休み期間はvacationで加算されるため抑制
  ];

  for (const event of events) {
    const [sm, sd] = event.start;
    const [em, ed] = event.end;
    const afterStart = month > sm || (month === sm && day >= sd);
    const beforeEnd  = month < em || (month === em && day <= ed);
    if (afterStart && beforeEnd) return event.boost;
  }
  return 0;
}

function calcScore(date: Date): number {
  const weekday = date.getDay(); // 0=日, 6=土
  const month = date.getMonth() + 1;
  const holiday = isHoliday(date);
  const vacation = isSchoolVacation(date);
  const eventBoost = getEventBoost(date);
  const isWeekend = weekday === 0 || weekday === 6;

  let score = 0;

  // 曜日ベース
  if (isWeekend) score += 3;
  else if (weekday === 5) score += 1; // 金曜

  if (month === 3) {
    // 3月は春休み・卒業旅行・修学旅行シーズンで年間屈指の混雑月
    // 全日+1のベースラインを加算
    score += 1;
    if (holiday) {
      // 祝日は休暇・イベントと重複加算しない
      score += isWeekend ? 1 : 3;
    } else if (date.getDate() <= 19) {
      // 3/1〜3/19: 土日にもイベント加算して変化をつける
      score += eventBoost;
    } else {
      // 3/20〜: 春休み期間。土日は週末ボーナスのみ、平日は休暇+イベントを加算
      if (!isWeekend) {
        if (vacation) score += 2;
        score += eventBoost;
      }
    }
  } else {
    // 通常ロジック（GW・夏・冬など）
    if (holiday) score += isWeekend ? 1 : 3;
    if (vacation) score += 2;
    score += eventBoost;
  }

  return score;
}

export function predictCrowd(date: Date): CrowdGrade {
  const score = calcScore(date);
  if (score >= 9) return "S";
  if (score >= 7) return "F";
  if (score >= 6) return "E";
  if (score >= 5) return "D";
  if (score >= 3) return "C";
  if (score >= 2) return "B";
  return "A";
}

export function getMonthCalendar(year: number, month: number) {
  const days: { date: Date; grade: CrowdGrade }[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    days.push({ date, grade: predictCrowd(date) });
  }
  return days;
}
