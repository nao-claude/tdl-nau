export type ParkId = "tdl" | "tds";

export interface Attraction {
  id: number;
  name: string;
  nameJa: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
}

export interface ThemeParksLiveData {
  id: string;
  name: string;
  entityType: string;
  externalId: string;
  queue?: { STANDBY?: { waitTime: number | null } };
  status: string;
  lastUpdated: string;
}

export interface ThemeParksResponse {
  liveData: ThemeParksLiveData[];
}

export interface ParkData {
  parkId: ParkId;
  parkName: string;
  attractions: Attraction[];
  fetchedAt: string;
}
