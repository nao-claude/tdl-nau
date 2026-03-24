import { NextResponse } from "next/server";

const LAT = 35.63;
const LON = 139.88;

export interface CurrentWeather {
  current: {
    temp: number;
    code: number;
    precipitation: number;
  };
  evening: {
    temp: number;
    code: number;
    precipProb: number;
  };
}

export async function GET() {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,weathercode,precipitation` +
      `&hourly=temperature_2m,weathercode,precipitation_probability` +
      `&timezone=Asia%2FTokyo&forecast_days=1`;

    const res = await fetch(url, { next: { revalidate: 600 } }); // 10分キャッシュ
    const data = await res.json();

    const current = {
      temp: Math.round(data.current.temperature_2m),
      code: data.current.weathercode,
      precipitation: data.current.precipitation ?? 0,
    };

    // 18時のデータ（index=18）
    const eveningIndex = 18;
    const evening = {
      temp: Math.round(data.hourly.temperature_2m[eveningIndex]),
      code: data.hourly.weathercode[eveningIndex],
      precipProb: data.hourly.precipitation_probability[eveningIndex] ?? 0,
    };

    return NextResponse.json({ current, evening } satisfies CurrentWeather, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
