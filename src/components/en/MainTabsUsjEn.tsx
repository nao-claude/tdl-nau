"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, Map, Route } from "lucide-react";
import { ParkPanelEn } from "./ParkPanelEn";
import { CrowdCalendarEn } from "./CrowdCalendarEn";
import { AreaMapEn } from "./AreaMapEn";
import { TodaySummaryEn } from "./TodaySummaryEn";
import { RecommendedCourse } from "@/components/RecommendedCourse";
import { ParkData } from "@/types";

type Tab = "map" | "realtime" | "course" | "calendar";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "map",      label: "By Area",        icon: <Map className="w-4 h-4" /> },
  { id: "realtime", label: "Ranking",         icon: <Clock className="w-4 h-4" /> },
  { id: "course",   label: "Today's Course",  icon: <Route className="w-4 h-4" /> },
  { id: "calendar", label: "Crowd Forecast",  icon: <CalendarDays className="w-4 h-4" /> },
];

interface Props {
  initialData?: ParkData | null;
}

export function MainTabsUsjEn({ initialData }: Props) {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "map";
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div>
      {/* Today's summary */}
      <TodaySummaryEn parkId="usj" initialData={initialData} />

      {/* Guide banners */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/en/attractions/usj"
            className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md active:scale-95 transition-transform px-2 py-3 text-center"
          >
            <span className="text-xs font-bold leading-tight">USJ<br />Attraction Guide</span>
          </Link>
          <Link
            href="/en/usj?tab=calendar"
            onClick={() => setTab("calendar")}
            className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md active:scale-95 transition-transform px-2 py-3 text-center"
          >
            <span className="text-xs font-bold leading-tight">📅 Crowd<br />Forecast</span>
          </Link>
        </div>
      </div>

      {/* Tab nav */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <div className="flex gap-1 bg-gray-200 p-1 rounded-xl">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-bold transition-colors
                ${tab === t.id ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {tab === "realtime" && (
          <ParkPanelEn
            parkId="usj"
            parkName="Universal Studios Japan"
          />
        )}

        {tab === "calendar" && (
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">🎡 USJ Crowd Forecast</h3>
            <CrowdCalendarEn parkId="usj" />
          </div>
        )}

        {tab === "map" && (
          <AreaMapEn parkId="usj" />
        )}

        {tab === "course" && (
          <RecommendedCourse parkId="usj" locale="en" />
        )}
      </div>
    </div>
  );
}
