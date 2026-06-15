import { ParkId, ParkData, ThemeParksResponse, Attraction } from "@/types";
import { attractionNameJa } from "./attractions-ja";

const ENTITY_IDS: Record<string, string> = {
  tdl: "3cc919f1-d16d-43e0-8c3f-1dd269bd1a42",
  tds: "67b290d5-3478-4f23-b601-2f8fb71ba803",
};

const PARK_NAMES: Record<ParkId, string> = {
  tdl: "東京ディズニーランド",
  tds: "東京ディズニーシー",
  usj: "ユニバーサル・スタジオ・ジャパン",
};

// USJ アトラクション日本語名マッピング（queue-times.com ID ベース）
const USJ_NAME_JA: Record<number, string> = {
  7061:  "ビッグ・バードのビッグトップ・サーカス",
  7059:  "セサミのビッグ・ドライブ",
  7063:  "ハローキティのリボン・コレクション",
  7065:  "ハローキティのカップケーキ・ドリーム",
  7067:  "エルモのゴーゴー・スケートボード",
  7071:  "エルモのリトル・ドライブ",
  7075:  "モッピーのバルーン・トリップ",
  7077:  "ハリウッド・ドリーム・ザ・ライド",
  7092:  "ザ・フライング・ダイナソー",
  7098:  "エルモのバブル・バブル",
  7214:  "SING ON TOUR",
  12061: "マリオカート〜クッパの挑戦状〜",
  12065: "ハリー・ポッター・アンド・ザ・フォービドゥン・ジャーニー",
  12066: "ミニオン・ハチャメチャ・ライド",
  12067: "ジュラシック・パーク・ザ・ライド",
  12068: "ジョーズ",
  12070: "ハリウッド・ドリーム・ザ・ライド〜バックドロップ〜",
  12071: "ヨッシー・アドベンチャー",
  12072: "フリーズ・レイ・スライダーズ",
  12073: "フライト・オブ・ザ・ヒッポグリフ",
  12075: "ザ・フライング・スヌーピー",
  12082: "スペース・ファンタジー・ザ・ライド",
  12083: "セサミストリート4-Dムービーマジック",
  12084: "シュレック4-Dアドベンチャー",
  12091: "キュリオス・ジョージのプレイランド",
  12197: "オリバンダーの店",
  13005: "名探偵コナン・ザ・ワールド",
  14402: "Mine-Cart Madness™",
  14918: "ミニオン・ハチャメチャ・ミッション〜大悪党への道〜",
  14919: "スヌーピーのフライング・エース・アドベンチャー",
  15427: "呪術廻戦・ザ・リアル4-D",
  15428: "スペース・ファンタジー・ザ・ライド〜CLUB ZEDD REMIX〜",
};

async function fetchUsjData(): Promise<ParkData> {
  const res = await fetch(
    "https://queue-times.com/parks/284/queue_times.json",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch USJ data: ${res.status}`);

  const json = await res.json();
  const attractions: Attraction[] = (json.rides as { id: number; name: string; is_open: boolean; wait_time: number; last_updated: string }[])
    .map((r) => ({
      id: r.id,
      name: r.name,
      nameJa: USJ_NAME_JA[r.id] ?? r.name,
      is_open: r.is_open,
      wait_time: r.wait_time,
      last_updated: r.last_updated ?? "",
    }))
    .sort((a, b) => {
      if (a.is_open !== b.is_open) return a.is_open ? -1 : 1;
      return b.wait_time - a.wait_time;
    });

  return {
    parkId: "usj",
    parkName: PARK_NAMES["usj"],
    attractions,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchParkData(parkId: ParkId): Promise<ParkData> {
  if (parkId === "usj") return fetchUsjData();

  const entityId = ENTITY_IDS[parkId];
  const res = await fetch(
    `https://api.themeparks.wiki/v1/entity/${entityId}/live`,
    { next: { revalidate: 60 } }
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
