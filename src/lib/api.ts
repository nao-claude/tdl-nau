import { ParkId, ParkData, QueueTimesResponse, Attraction } from "@/types";
import { attractionNameJa } from "./attractions-ja";

const PARK_IDS: Record<ParkId, number> = {
  tdl: 274,
  tds: 275,
};

const PARK_NAMES: Record<ParkId, string> = {
  tdl: "東京ディズニーランド",
  tds: "東京ディズニーシー",
};

function applyJaNames(rides: Omit<Attraction, "nameJa">[]): Attraction[] {
  return rides.map((ride) => ({
    ...ride,
    nameJa: attractionNameJa[ride.id] ?? ride.name,
  }));
}

export async function fetchParkData(parkId: ParkId): Promise<ParkData> {
  const id = PARK_IDS[parkId];
  const res = await fetch(
    `https://queue-times.com/en-US/parks/${id}/queue_times.json`,
    { next: { revalidate: 300 } } // 5分キャッシュ
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch park data: ${res.status}`);
  }

  const data: QueueTimesResponse = await res.json();

  const allRides = [
    ...data.rides,
    ...data.lands.flatMap((land) => land.rides),
  ];

  return {
    parkId,
    parkName: PARK_NAMES[parkId],
    attractions: applyJaNames(allRides).sort((a, b) => {
      // 営業中を上、運休を下
      if (a.is_open !== b.is_open) return a.is_open ? -1 : 1;
      // 同じ営業状態なら待ち時間降順
      return b.wait_time - a.wait_time;
    }),
    fetchedAt: new Date().toISOString(),
  };
}
