import { NextResponse } from "next/server";

export interface ParkHours {
  open: string;
  close: string;
}

export interface TodayParkHours {
  tdl: ParkHours | null;
  tds: ParkHours | null;
}

export async function GET() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const ymd = `${y}${m}${d}`;
  const yyyymm = `${y}${m}`;

  try {
    const res = await fetch(
      `https://www.tokyodisneyresort.jp/ticket/index/${yyyymm}/`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "ja,en;q=0.9",
        },
        signal: AbortSignal.timeout(8000), // 8秒でタイムアウトしてfallbackを返す
        next: { revalidate: 28800 }, // 8時間キャッシュ（1日3回のみ取得）
      }
    );

    if (!res.ok) return NextResponse.json(fallback());

    const html = await res.text();

    // ticketPopup = { "20260323": { "tdl": { "openTime": { "open": "9:00", "close": "21:00" } }, "tds": {...} } }
    // ネストされたJSONを正確に取得するためブレースカウンタで抽出
    const startIdx = html.indexOf("var ticketPopup");
    if (startIdx === -1) return NextResponse.json(fallback());
    const jsonStart = html.indexOf("{", startIdx);
    if (jsonStart === -1) return NextResponse.json(fallback());

    let depth = 0;
    let jsonEnd = -1;
    for (let i = jsonStart; i < html.length; i++) {
      if (html[i] === "{") depth++;
      else if (html[i] === "}") {
        depth--;
        if (depth === 0) { jsonEnd = i; break; }
      }
    }
    if (jsonEnd === -1) return NextResponse.json(fallback());

    const popup = JSON.parse(html.slice(jsonStart, jsonEnd + 1));
    const today = popup[ymd];
    if (!today) return NextResponse.json(fallback());

    return NextResponse.json({
      tdl: today.tdl?.openTime ?? null,
      tds: today.tds?.openTime ?? null,
    } as TodayParkHours, {
      headers: { "Cache-Control": "public, s-maxage=28800, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json(fallback());
  }
}

function fallback(): TodayParkHours {
  return { tdl: { open: "9:00", close: "21:00" }, tds: { open: "9:00", close: "21:00" } };
}
