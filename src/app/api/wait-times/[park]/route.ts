import { NextRequest, NextResponse } from "next/server";
import { fetchParkData } from "@/lib/api";
import { ParkId } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ park: string }> }
) {
  const { park } = await params;

  if (park !== "tdl" && park !== "tds") {
    return NextResponse.json({ error: "Invalid park ID" }, { status: 400 });
  }

  try {
    const data = await fetchParkData(park as ParkId);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
