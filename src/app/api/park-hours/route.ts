import { NextResponse } from "next/server";

export const maxDuration = 5;

export interface ParkHours {
  open: string;
  close: string;
}

export interface TodayParkHours {
  tdl: ParkHours | null;
  tds: ParkHours | null;
  [key: string]: ParkHours | null | undefined;
}

// 公式サイトのスクレイピングはVercelのIPからブロックされるため
// 通常営業時間をデフォルトとして返す
export async function GET() {
  return NextResponse.json(
    {
      tdl: { open: "9:00", close: "21:00" },
      tds: { open: "9:00", close: "21:00" },
      usj: { open: "9:00", close: "21:00" },
    } as TodayParkHours,
    {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    }
  );
}
