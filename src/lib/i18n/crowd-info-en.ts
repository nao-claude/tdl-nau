import type { CrowdGrade } from "@/lib/crowd-prediction";

export const CROWD_INFO_EN: Record<CrowdGrade, { label: string; avgWait: string }> = {
  A: { label: "Very Light", avgWait: "~29 min" },
  B: { label: "Light",      avgWait: "30–59 min" },
  C: { label: "Moderate",   avgWait: "60–89 min" },
  D: { label: "Busy",       avgWait: "90–109 min" },
  E: { label: "Very Busy",  avgWait: "110–129 min" },
  F: { label: "Crowded",    avgWait: "130–159 min" },
  S: { label: "Packed",     avgWait: "160+ min" },
};
