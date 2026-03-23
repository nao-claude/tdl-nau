"use client";

import { useState } from "react";
import { Clock, CalendarDays, Map } from "lucide-react";
import { ParkPanel } from "./ParkPanel";
import { CrowdCalendar } from "./CrowdCalendar";
import { AreaMap } from "./AreaMap";
import { TodaySummary } from "./TodaySummary";
import { ParkId } from "@/types";

type Tab = "realtime" | "calendar" | "map";
type Park = ParkId;

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "map",      label: "待ち時間",    icon: <Map className="w-4 h-4" /> },
  { id: "realtime", label: "待ち時間 長〜", icon: <Clock className="w-4 h-4" /> },
  { id: "calendar", label: "混雑予想",    icon: <CalendarDays className="w-4 h-4" /> },
];

const PARKS: { id: Park; label: string }[] = [
  { id: "tdl", label: "ランド" },
  { id: "tds", label: "シー" },
];

export function MainTabs() {
  const [tab, setTab]   = useState<Tab>("map");
  const [park, setPark] = useState<Park>("tdl");

  return (
    <div>
      {/* 今日のサマリー */}
      <TodaySummary parkId={park} />

      {/* タブナビ */}
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

      {/* パーク切り替え（リアルタイム・マップのみ） */}
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

      {/* コンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {tab === "realtime" && (
          <>
            {/* 凡例 */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 bg-white rounded-xl p-3 border border-gray-200 mb-4">
              <span className="font-medium text-gray-700">待ち時間:</span>
              <span className="text-green-500 font-medium">● 〜20分</span>
              <span className="text-yellow-500 font-medium">● 21〜40分</span>
              <span className="text-orange-500 font-medium">● 41〜60分</span>
              <span className="text-red-500 font-medium">● 61分〜</span>
            </div>
            <ParkPanel
              parkId={park}
              parkName={park === "tdl" ? "東京ディズニーランド" : "東京ディズニーシー"}
            />
          </>
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
      </div>
    </div>
  );
}
