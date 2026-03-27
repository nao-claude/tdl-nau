"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, Map } from "lucide-react";
import { ParkPanel } from "./ParkPanel";
import { CrowdCalendar } from "./CrowdCalendar";
import { AreaMap } from "./AreaMap";
import { TodaySummary } from "./TodaySummary";
import { RecommendedCourse } from "./RecommendedCourse";
import { ParkId, ParkData } from "@/types";
import { TodayParkHours } from "@/app/api/park-hours/route";

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

const DEFAULT_HOURS: TodayParkHours = {
  tdl: { open: "9:00", close: "21:00" },
  tds: { open: "9:00", close: "21:00" },
};

export function MainTabs() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "map";
  const [tab, setTab]   = useState<Tab>(initialTab);
  const [park, setPark] = useState<Park>("tdl");

  // ランキングタブ用の一元データ管理
  // null = 未取得またはフェッチ中, ParkData = 取得済み
  const [waitData, setWaitData] = useState<ParkData | null>(null);
  const [parkHours, setParkHours] = useState<TodayParkHours | null>(null);

  // タブに関わらず常時データを取得
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      // park が切り替わったらデータをクリア（null = ローディング中を示す）
      setWaitData(null);
      try {
        const [waitRes, hoursRes] = await Promise.all([
          fetch(`/api/wait-times/${park}`, { signal: AbortSignal.timeout(10000) }),
          fetch("/api/park-hours", { signal: AbortSignal.timeout(10000) }),
        ]);
        if (cancelled) return;
        const waitJson: ParkData = waitRes.ok ? await waitRes.json() : await Promise.reject();
        const hoursJson: TodayParkHours = hoursRes.ok ? await hoursRes.json() : DEFAULT_HOURS;
        if (cancelled) return;
        setWaitData(waitJson);
        setParkHours(hoursJson);
      } catch {
        // フェッチ失敗時: null のままにして子コンポーネントの表示に任せる
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // 5分毎に自動更新
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [park]);

  return (
    <div>
      {/* 今日のサマリー */}
      <TodaySummary parkId={park} />

      {/* 本日のおすすめコース（タブに関わらず常時表示） */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <RecommendedCourse
          parkId={park}
          data={waitData}
          parkHours={parkHours}
        />
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
            data={waitData}
            parkHours={parkHours}
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
