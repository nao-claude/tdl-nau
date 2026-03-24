import { ParkId, ParkData, ThemeParksResponse, Attraction } from "@/types";
import { attractionNameJa } from "./attractions-ja";

const ENTITY_IDS: Record<ParkId, string> = {
  tdl: "3cc919f1-d16d-43e0-8c3f-1dd269bd1a42",
  tds: "67b290d5-3478-4f23-b601-2f8fb71ba803",
};

const PARK_NAMES: Record<ParkId, string> = {
  tdl: "東京ディズニーランド",
  tds: "東京ディズニーシー",
};

export async function fetchParkData(parkId: ParkId): Promise<ParkData> {
  const entityId = ENTITY_IDS[parkId];
  const res = await fetch(
    `https://api.themeparks.wiki/v1/entity/${entityId}/live`,
    { next: { revalidate: 60 } } // 1分キャッシュ
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch park data: ${res.status}`);
  }

  const data: ThemeParksResponse = await res.json();

  const attractions: Attraction[] = data.liveData
    .filter((r) => r.entityType === "ATTRACTION")
    .map((r) => {
      const id = Number(r.externalId);
      return {
        id,
        name: r.name,
        nameJa: attractionNameJa[id] ?? r.name,
        is_open: r.status === "OPERATING",
        wait_time: r.queue?.STANDBY?.waitTime ?? 0,
        last_updated: r.lastUpdated,
      };
    })
    .sort((a, b) => {
      if (a.is_open !== b.is_open) return a.is_open ? -1 : 1;
      return b.wait_time - a.wait_time;
    });

  return {
    parkId,
    parkName: PARK_NAMES[parkId],
    attractions,
    fetchedAt: new Date().toISOString(),
  };
}
