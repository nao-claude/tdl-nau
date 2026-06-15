"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, CalendarDays, Map, Route } from "lucide-react";
import { ParkPanel } from "./ParkPanel";
import { CrowdCalendar } from "./CrowdCalendar";
import { AreaMap } from "./AreaMap";
import { TodaySummary } from "./TodaySummary";
import { RecommendedCourse } from "./RecommendedCourse";
import { ParkId, ParkData } from "@/types";

type Tab = "realtime" | "calendar" | "map" | "course";
type Park = ParkId;

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "map",      label: "エリア別",   icon: <Map className="w-4 h-4" /> },
  { id: "realtime", label: "ランキング",  icon: <Clock className="w-4 h-4" /> },
  { id: "course",   label: "本日のおすすめ", icon: <Route className="w-4 h-4" /> },
  { id: "calendar", label: "混雑予想",   icon: <CalendarDays className="w-4 h-4" /> },
];

const PARKS: { id: Park; label: string }[] = [
  { id: "tdl", label: "ランド" },
  { id: "tds", label: "シー" },
];


interface Props {
  initialTdlData?: ParkData | null;
  initialTdsData?: ParkData | null;
}

export function MainTabs({ initialTdlData, initialTdsData }: Props) {
  const searchParams = useSearchParams();
  const tabParam = (searchParams.get("tab") as Tab) ?? "map";
  const [tab, setTab] = useState<Tab>(tabParam);

  useEffect(() => {
    setTab(tabParam);
  }, [tabParam]);
  const [park, setPark] = useState<Park>("tdl");

  const initialData = park === "tdl" ? initialTdlData : initialTdsData;

  return (
    <div>
      {/* 今日のサマリー */}
      <TodaySummary parkId={park} initialData={initialData} />

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

      {/* パーク切り替え（混雑予想タブ以外で表示） */}
      {tab !== "calendar" && (
        <div className="max-w-4xl mx-auto px-4 pt-3">
          <div className="flex gap-2">
            {PARKS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPark(p.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all min-h-[44px] flex items-center
                  ${park === p.id ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* コンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {tab === "realtime" && (
          <ParkPanel
            parkId={park}
            parkName={park === "tdl" ? "東京ディズニーランド" : "東京ディズニーシー"}
            data={initialData}
          />
        )}

        {tab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">🏰 ランド</h3>
              <CrowdCalendar parkId="tdl" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-2">⛵ シー</h3>
              <CrowdCalendar parkId="tds" />
            </div>
          </div>
        )}

        {tab === "map" && (
          <AreaMap parkId={park} />
        )}

        {tab === "course" && (
          <RecommendedCourse parkId={park} />
        )}
      </div>
    </div>
  );
}
