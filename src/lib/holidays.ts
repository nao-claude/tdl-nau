// 日本の祝日名を返すユーティリティ

const FIXED_HOLIDAYS: Record<string, string> = {
  "01-01": "元日",
  "02-11": "建国記念",
  "02-23": "天皇誕生日",
  "04-29": "昭和の日",
  "05-03": "憲法記念日",
  "05-04": "みどりの日",
  "05-05": "こどもの日",
  "08-11": "山の日",
  "11-03": "文化の日",
  "11-23": "勤労感謝",
};

export function getHolidayName(date: Date): string | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();
  const weekOfMonth = Math.ceil(day / 7);
  const year = date.getFullYear();

  const mmdd = `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  if (FIXED_HOLIDAYS[mmdd]) return FIXED_HOLIDAYS[mmdd];

  // ハッピーマンデー
  if (month === 1 && weekday === 1 && weekOfMonth === 2) return "成人の日";
  if (month === 7 && weekday === 1 && weekOfMonth === 3) return "海の日";
  if (month === 9 && weekday === 1 && weekOfMonth === 3) return "敬老の日";
  if (month === 10 && weekday === 1 && weekOfMonth === 2) return "スポーツの日";

  // 春分・秋分
  const springEquinox = Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  const autumnEquinox = Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  if (month === 3 && day === springEquinox) return "春分の日";
  if (month === 9 && day === autumnEquinox) return "秋分の日";

  // 振替休日（日曜が祝日 → 翌月曜）
  if (weekday === 1) {
    const yesterday = new Date(date);
    yesterday.setDate(day - 1);
    if (getHolidayName(yesterday)) return "振替休日";
  }

  return null;
}
