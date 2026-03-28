"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, Map } from "lucide-react";
import { ParkPanel } from "./ParkPanel";
import { CrowdCalendar } from "./CrowdCalendar";
import { AreaMap } from "./AreaMap";
import { TodaySummary } from "./TodaySummary";
import { RecommendedCourse } from "./RecommendedCourse";
import { ParkId } from "@/types";

type Tab = "realtime" | "calendar" | "map";
type Park = ParkId;

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "map",      label: "エリア別",   icon: <Map className="w-4 h-4" /> },
  { id: "realtime", label: "ランキング",  icon: <Clock className="w-4 h-4" /> },
  { id: "calendar", label: "混雑予想",   icon: <CalendarDays className="w-4 h-4" /> },
];

const PARKS: { id: Park; label: string }[] = [
  { id: "tdl", label: "ランド" },
  { id: "tds", label: "シー" },
];


export function MainTabs() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "map";
  const [tab, setTab]   = useState<Tab>(initialTab);
  const [park, setPark] = useState<Park>("tdl");

  // 各子コンポーネントが独立してデータをフェッチするためここでは不要

  return (
    <div>
      {/* 今日のサマリー */}
      <TodaySummary parkId={park} />

      {/* 本日のおすすめコース（タブに関わらず常時表示） */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <RecommendedCourse parkId={park} />
      </div>

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

      {/* アトラクションガイドバナー */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/attractions/tdl"
            className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md active:scale-95 transition-transform px-3 py-3 text-center"
          >
            <span className="text-xs font-bold leading-tight">ランド<br />アトラクションガイド</span>
          </Link>
          <Link
            href="/attractions/tds"
            className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md active:scale-95 transition-transform px-3 py-3 text-center"
          >
            <span className="text-xs font-bold leading-tight">シー<br />アトラクションガイド</span>
          </Link>
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
      </div>
    </div>
  );
}
