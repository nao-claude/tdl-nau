"use client";

import { useEffect, useState, useCallback } from "react";
import { ParkId } from "@/types";
import { ShowInfo } from "@/app/api/shows/[park]/route";
import { RefreshCw, Music2 } from "lucide-react";

interface Props {
  parkId: ParkId;
}

export function ShowSchedule({ parkId }: Props) {
  const [shows, setShows] = useState<ShowInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/shows/${parkId}`);
      const data: ShowInfo[] = await res.json();
      setShows(data);
      setLastUpdated(new Date().toLocaleTimeString("ja-JP"));
    } finally {
      setLoading(false);
    }
  }, [parkId]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  if (!loading && shows.length === 0) return null;

  return (
    <div className="mt-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Music2 className="w-4 h-4 text-purple-500" />
          <h3 className="text-sm font-bold text-gray-800">本日のショー・パレード</h3>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && <span className="text-xs text-gray-400">{lastUpdated}</span>}
          <button onClick={load} disabled={loading} className="text-blue-400 hover:text-blue-500 disabled:opacity-50">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {loading && shows.length === 0 ? (
        <div className="flex justify-center py-6">
          <RefreshCw className="w-5 h-5 animate-spin text-gray-300" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {shows.map((show) => (
            <div
              key={show.id}
              className={`rounded-xl border p-3 ${show.cancelled ? "bg-gray-50 border-gray-100 opacity-50" : "bg-white border-gray-200"}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <span className={`text-sm font-semibold ${show.cancelled ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {show.name}
                  </span>
                  {show.area && (
                    <span className="text-xs text-gray-400 ml-1.5">{show.area}</span>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  {show.cancelled && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-gray-400 text-white leading-none">中止</span>
                  )}
                  {show.hasDpa && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white leading-none">DPA</span>
                  )}
                  {show.hasPp && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white leading-none">PP</span>
                  )}
                </div>
              </div>

              {/* 公演時刻 */}
              {!show.cancelled && show.times.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {show.times.map((t, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        t.cancelled
                          ? "bg-gray-100 text-gray-400 line-through"
                          : t.lottery
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {t.from}
                      {t.lottery && <span className="ml-0.5 text-purple-500">🎫</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2">🎫 = 抽選・整理券制　※東京ディズニーリゾート公式より取得</p>
    </div>
  );
}
