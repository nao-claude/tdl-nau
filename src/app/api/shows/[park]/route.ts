import { NextRequest, NextResponse } from "next/server";

export interface ShowTime {
  date: string;   // "YYYYMMDD"
  from: string;   // "HH:MM"
  lottery: boolean;
  cancelled: boolean;
}

export interface ShowInfo {
  id: string;
  name: string;
  area: string;
  cancelled: boolean;    // FacilityStatusCD === "003"
  hasDpa: boolean;
  hasPp: boolean;
  times: ShowTime[];
}

const PARK_URLS: Record<string, string> = {
  tdl: "https://www.tokyodisneyresort.jp/_/realtime/tdl_parade_show.json",
  tds: "https://www.tokyodisneyresort.jp/_/realtime/tds_parade_show.json",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ park: string }> }
) {
  const { park } = await params;
  const url = PARK_URLS[park];
  if (!url) return NextResponse.json({ error: "Invalid park" }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Referer: "https://www.tokyodisneyresort.jp/",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) return NextResponse.json([], { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = await res.json();

    const shows: ShowInfo[] = raw.map((item) => ({
      id: item.FacilityID ?? "",
      name: item.FacilityName ?? "",
      area: item.AreaJName ?? "",
      cancelled: item.FacilityStatusCD === "003",
      hasDpa: !!item.DPAStatusCD,
      hasPp: !!item.PPStatusCD,
      times: (item.operatingHours ?? []).map((h: any) => ({
        date: h.OperatingHoursFromDate ?? "",
        from: h.OperatingHoursFrom ?? "",
        lottery: !!h.LotteryFlg || h.ShowLineCutStatusCD === "1",
        cancelled: h.OperatingStatusCD === "003",
      })),
    }));

    return NextResponse.json(shows, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
