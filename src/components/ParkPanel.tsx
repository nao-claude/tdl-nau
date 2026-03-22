"use client";

import { useEffect, useState, useCallback } from "react";
import { ParkId, ParkData } from "@/types";
import { WaitTimeCard } from "./WaitTimeCard";
import { RefreshCw } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { ShowSchedule } from "./ShowSchedule";

interface Props {
  parkId: ParkId;
  parkName: string;
}

export function ParkPanel({ parkId, parkName }: Props) {
  const [data, setData] = useState<ParkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { isFavorite, toggle } = useFavorites();

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
