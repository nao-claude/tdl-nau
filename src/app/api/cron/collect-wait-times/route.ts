import { put } from "@vercel/blob";
import { fetchParkData } from "@/lib/api";
import { ParkId } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const PARKS: ParkId[] = ["tdl", "tds", "usj"];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const results = await Promise.allSettled(
    PARKS.map(async (park) => {
      const data = await fetchParkData(park);
      await put(`wait-times/${park}.json`, JSON.stringify(data), {
        access: "public",
        contentType: "application/json",
        allowOverwrite: true,
      });
      return park;
    })
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").map((r) => (r as PromiseFulfilledResult<ParkId>).value);
  const failed = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason?.message);

  return Response.json({ succeeded, failed, collectedAt: new Date().toISOString() });
}
