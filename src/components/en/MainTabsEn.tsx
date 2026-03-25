"use client";

import { useState } from "react";
import { Clock, CalendarDays, Map } from "lucide-react";
import { ParkPanelEn } from "./ParkPanelEn";
import { CrowdCalendarEn } from "./CrowdCalendarEn";
import { AreaMapEn } from "./AreaMapEn";
import { TodaySummaryEn } from "./TodaySummaryEn";
import { ParkId } from "@/types";

type Tab = "realtime" | "calendar" | "map";
type Park = ParkId;

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "map",      label: "By Area",         icon: <Map className="w-4 h-4" /> },
  { id: "realtime", label: "Ranking",          icon: <Clock className="w-4 h-4" /> },
  { id: "calendar", label: "Crowd Forecast",   icon: <CalendarDays className="w-4 h-4" /> },
];

const PARKS: { id: Park; label: string }[] = [
  { id: "tdl", label: "Land" },
  { id: "tds", label: "Sea" },
];

export function MainTabsEn() {
  const [tab, setTab]   = useState<Tab>("map");
  const [park, setPark] = useState<Park>("tdl");

  return (
    <div>
      {/* Today's summary */}
      <TodaySummaryEn parkId={park} />

      {/* Tab nav */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors
                ${tab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Park switcher (realtime & map only) */}
      {tab !== "calendar" && (
        <div className="max-w-4xl mx-auto px-4 pt-3">
          <div className="flex gap-2">
            {PARKS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPark(p.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${park === p.id ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {tab === "realtime" && (
          <>
            <ParkPanelEn
              parkId={park}
              parkName={park === "tdl" ? "Tokyo Disneyland" : "Tokyo DisneySea"}
            />
          </>
        )}

        {tab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">🏰 Land</h3>
              <CrowdCalendarEn parkId="tdl" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">⛵ Sea</h3>
              <CrowdCalendarEn parkId="tds" />
            </div>
          </div>
        )}

        {tab === "map" && (
          <AreaMapEn parkId={park} />
        )}
      </div>
    </div>
  );
}
