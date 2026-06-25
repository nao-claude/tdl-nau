import { NextRequest, NextResponse } from "next/server";
import { fetchParkData } from "@/lib/api";
import { ParkId } from "@/types";

export const runtime = "nodejs";

async function fetchFromBlob(park: ParkId) {
  const url = process.env.BLOB_BASE_URL;
  if (!url) return null;
  try {
    const res = await fetch(`${url}/wait-times/${park}.json`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    // 10分以上古いデータは使わない
    const fetchedAt = new Date(data.fetchedAt).getTime();
    if (Date.now() - fetchedAt > 10 * 60 * 1000) return null;
    return data;
  } catch {
    return null;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ park: string }> }
) {
  const { park } = await params;

  if (park !== "tdl" && park !== "tds" && park !== "usj") {
    return NextResponse.json({ error: "Invalid park ID" }, { status: 400 });
  }

  try {
    // まずBlobキャッシュから取得
    const cached = await fetchFromBlob(park as ParkId);
    if (cached) {
      return NextResponse.json(cached, {
        headers: { "Cache-Control": "public, s-maxage=180, stale-while-revalidate=60" },
      });
    }

    // フォールバック: 直接外部APIから取得
    const data = await fetchParkData(park as ParkId);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=180, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
