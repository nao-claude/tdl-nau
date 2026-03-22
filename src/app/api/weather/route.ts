import { NextRequest, NextResponse } from "next/server";

// 東京ディズニーリゾート付近
const LAT = 35.63;
const LON = 139.88;

export interface DayWeather {
  date: string; // "YYYY-MM-DD"
  code: number;
  maxTemp: number;
  minTemp: number;
}

function pad(n: number) { return String(n).padStart(2, "0"); }
function toDateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const year  = parseInt(searchParams.get("year")  ?? "0");
  const month = parseInt(searchParams.get("month") ?? "0");
  if (!year || !month) return NextResponse.json({ error: "Invalid params" }, { status: 400 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month - 1, 1);
  const lastDay  = new Date(year, month, 0);

  // 過去日（archive）と予報日（forecast 7日）を分ける
  const result: DayWeather[] = [];

  // 過去分
  const archiveEnd = new Date(Math.min(lastDay.getTime(), today.getTime() - 86400000));
  if (firstDay <= archiveEnd) {
    try {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LAT}&longitude=${LON}`
        + `&start_date=${toDateStr(firstDay)}&end_date=${toDateStr(archiveEnd)}`
        + `&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      const data = await res.json();
      data.daily.time.forEach((date: string, i: number) => {
        result.push({
          date,
          code:    data.daily.weathercode[i],
          maxTemp: Math.round(data.daily.temperature_2m_max[i]),
          minTemp: Math.round(data.daily.temperature_2m_min[i]),
        });
      });
    } catch { /* 取得失敗は無視 */ }
  }

  // 予報分（今日から7日間のうち当月分）
  const forecastEnd = new Date(today);
  forecastEnd.setDate(today.getDate() + 6);
  const forecastInMonth = new Date(Math.min(lastDay.getTime(), forecastEnd.getTime()));
  if (today <= lastDay && today >= firstDay) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}`
        + `&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=7`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      const data = await res.json();
      data.daily.time.forEach((date: string, i: number) => {
        const d = new Date(date);
        if (d >= today && d >= firstDay && d <= forecastInMonth) {
          result.push({
            date,
            code:    data.daily.weathercode[i],
            maxTemp: Math.round(data.daily.temperature_2m_max[i]),
            minTemp: Math.round(data.daily.temperature_2m_min[i]),
          });
        }
      });
    } catch { /* 取得失敗は無視 */ }
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300" },
  });
}
