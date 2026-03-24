import { NextRequest, NextResponse } from "next/server";
import { STATIC_TICKET_PRICES } from "@/lib/ticket-prices-static";

export interface DayTicketPrice {
  date: string; // "YYYY-MM-DD"
  tdlPrice: number | null;
  tdsPrice: number | null;
}

function staticFallback(year: number, month: number): DayTicketPrice[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  const entries = Object.entries(STATIC_TICKET_PRICES)
    .filter(([date]) => date.startsWith(prefix));
  if (entries.length === 0) return [];
  return entries.map(([date, p]) => ({ date, tdlPrice: p.tdl, tdsPrice: p.tds }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const year  = parseInt(searchParams.get("year")  ?? "0");
  const month = parseInt(searchParams.get("month") ?? "0");
  if (!year || !month) return NextResponse.json({ error: "Invalid params" }, { status: 400 });

  const yyyymm = `${year}${String(month).padStart(2, "0")}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000); // 5秒でタイムアウト
    const res = await fetch(
      `https://www.tokyodisneyresort.jp/ticket/index/${yyyymm}/`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "ja,en;q=0.9",
        },
        signal: controller.signal,
        next: { revalidate: 60 * 60 * 24 * 30 }, // 30日
      }
    );
    clearTimeout(timer);

    if (!res.ok) return NextResponse.json(staticFallback(year, month), { status: 200 });

    const html = await res.text();

    const tdlPrices = new Map<string, number>();
    const tdsPrices = new Map<string, number>();

    // <a data-park="tdl" data-ymd="20260322" ...> ... <div class="type">10900</div>
    const cellRegex = /data-park="(tdl|tds)"[^>]*?data-ymd="(\d{8})"[\s\S]*?<div class="type">(\d*)<\/div>/g;
    let m: RegExpExecArray | null;
    while ((m = cellRegex.exec(html)) !== null) {
      const park  = m[1];
      const ymd   = m[2];
      const price = m[3] ? parseInt(m[3]) : null;
      if (!price) continue;
      const dateStr = `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
      if (park === "tdl") tdlPrices.set(dateStr, price);
      else                tdsPrices.set(dateStr, price);
    }

    // 両パークの日付を合わせて結果を生成
    const allDates = new Set([...tdlPrices.keys(), ...tdsPrices.keys()]);
    const result: DayTicketPrice[] = [...allDates]
      .sort()
      .map((date) => ({
        date,
        tdlPrice: tdlPrices.get(date) ?? null,
        tdsPrice: tdsPrices.get(date) ?? null,
      }));

    // スクレイピングで取得できなかった日付はフォールバックで補完
    const fallback = staticFallback(year, month);
    const resultDates = new Set(result.map((r) => r.date));
    const merged = [
      ...result,
      ...fallback.filter((f) => !resultDates.has(f.date)),
    ].sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(merged.length > 0 ? merged : fallback, {
      headers: { "Cache-Control": "public, s-maxage=2592000, stale-while-revalidate=86400" }, // 30日
    });
  } catch {
    return NextResponse.json(staticFallback(year, month));
  }
}
