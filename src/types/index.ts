export type ParkId = "tdl" | "tds";

export interface Attraction {
  id: number;
  name: string;
  nameJa: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
}

export interface QueueTimesResponse {
  lands: {
    id: number;
    name: string;
    rides: Attraction[];
  }[];
  rides: Attraction[];
}

export interface ParkData {
  parkId: ParkId;
  parkName: string;
  attractions: Attraction[];
  fetchedAt: string;
}
