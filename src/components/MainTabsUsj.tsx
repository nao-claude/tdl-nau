"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, Map, Route } from "lucide-react";
import { ParkPanel } from "./ParkPanel";
import { CrowdCalendar } from "./CrowdCalendar";
import { AreaMap } from "./AreaMap";
import { TodaySummary } from "./TodaySummary";
import { RecommendedCourse } from "./RecommendedCourse";
import { ParkData } from "@/types";

type Tab = "map" | "realtime" | "course" | "calendar";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "map",      label: "エリア別",  icon: <Map className="w-4 h-4" /> },
  { id: "realtime", label: "ランキング", icon: <Clock className="w-4 h-4" /> },
  { id: "course",   label: "本日のおすすめ", icon: <Route className="w-4 h-4" /> },
  { id: "calendar", label: "混雑予想",  icon: <CalendarDays className="w-4 h-4" /> },
];

interface Props {
  initialData?: ParkData | null;
}

export function MainTabsUsj({ initialData }: Props) {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "map";
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div>
      {/* 今日のサマリー */}
      <TodaySummary parkId="usj" initialData={initialData} />

      {/* ガイドバナー */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/attractions/usj"
            className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md active:scale-95 transition-transform px-2 py-3 text-center"
          >
            <span className="text-xs font-bold leading-tight">USJ<br />ガイド</span>
          </Link>
          <Link
            href="/usj?tab=calendar"
            onClick={() => setTab("calendar")}
            className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md active:scale-95 transition-transform px-2 py-3 text-center"
          >
            <span className="text-xs font-bold leading-tight">📅 混雑<br />予想カレンダー</span>
          </Link>
        </div>
      </div>

      {/* タブナビ */}
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

      {/* コンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {tab === "realtime" && (
          <ParkPanel
            parkId="usj"
            parkName="ユニバーサル・スタジオ・ジャパン"
            data={initialData}
          />
        )}

        {tab === "calendar" && (
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">🎡 USJ 混雑予想カレンダー</h3>
            <CrowdCalendar parkId="usj" />
          </div>
        )}

        {tab === "map" && (
          <AreaMap parkId="usj" />
        )}

        {tab === "course" && (
          <RecommendedCourse parkId="usj" />
        )}
      </div>
    </div>
  );
}
