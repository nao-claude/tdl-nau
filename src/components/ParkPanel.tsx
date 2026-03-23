"use client";

import { useEffect, useState, useCallback } from "react";
import { ParkId, ParkData } from "@/types";
import { WaitTimeCard } from "./WaitTimeCard";
import { RefreshCw } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { ShowSchedule } from "./ShowSchedule";
import { TodayParkHours } from "@/app/api/park-hours/route";

interface Props {
  parkId: ParkId;
  parkName: string;
}

function isWithinParkHours(open: string, close: string): boolean {
  const now = new Date();
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  return nowMin >= openMin && nowMin < closeMin;
}

export function ParkPanel({ parkId, parkName }: Props) {
  const [data, setData] = useState<ParkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [hours, setHours] = useState<TodayParkHours>({
    tdl: { open: "9:00", close: "21:00" },
    tds: { open: "9:00", close: "21:00" },
  });
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    fetch("/api/park-hours")
      .then((r) => r.json())
      .then(setHours)
      .catch(() => {});
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wait-times/${parkId}`);
      const json: ParkData = await res.json();
      setData(json);
      setLastUpdated(new Date().toLocaleTimeString("ja-JP"));
    } finally {
      setLoading(false);
    }
  }, [parkId]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5 * 60 * 1000); // 5分毎に自動更新
    return () => clearInterval(interval);
  }, [load]);

  const openCount = data?.attractions.filter((a) => a.is_open).length ?? 0;
  const totalCount = data?.attractions.length ?? 0;
  const maxWait = data?.attractions.reduce((max, a) => Math.max(max, a.wait_time), 0) ?? 0;

  return (
    <div className="flex flex-col gap-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{parkName}</h2>
          <p className="text-sm text-gray-500">
            {openCount}/{totalCount} 営業中
            {maxWait > 0 && <span className="ml-2">最大 <span className="font-semibold text-red-500">{maxWait}分</span></span>}
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          更新
        </button>
      </div>

      {/* 更新時刻 */}
      {lastUpdated && (
        <p className="text-xs text-gray-400">最終取得: {lastUpdated}</p>
      )}

      {/* お気に入り説明 */}
      <p className="text-xs text-gray-400">♡ をタップしてお気に入り登録。次回から素早く確認できます。</p>

      {/* 営業時間外メッセージ */}
      {(() => {
        const parkHour = hours[parkId];
        if (!parkHour || isWithinParkHours(parkHour.open, parkHour.close)) return null;
        const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
        const [oh, om] = parkHour.open.split(":").map(Number);
        const isBefore = nowMin < oh * 60 + om;
        return (
          <div className="flex flex-col items-center py-4 gap-1 text-gray-400">
            <span className="text-3xl">🏰</span>
            <p className="font-semibold text-gray-600">{isBefore ? "開園前です" : "閉園しました"}</p>
            <p className="text-sm">
              {isBefore ? `本日の開園時間: ${parkHour.open}` : `本日の営業は終了しました（${parkHour.close} 閉園）`}
            </p>
          </div>
        );
      })()}

      {/* アトラクション一覧 */}
      {loading && !data ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.attractions.map((attraction) => (
            <WaitTimeCard
              key={attraction.id}
              attraction={attraction}
              isFavorite={isFavorite(attraction.id)}
              onToggleFavorite={toggle}
            />
          ))}
        </div>
      )}

      {/* ショー・パレード */}
      <ShowSchedule parkId={parkId} />
    </div>
  );
}
