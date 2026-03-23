"use client";

import { useEffect, useState, useCallback } from "react";
import { ParkId, ParkData, Attraction } from "@/types";
import { TDL_AREAS, TDS_AREAS, AreaDef } from "@/lib/park-areas";
import { Clock, XCircle, RefreshCw, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { getAttractionPasses } from "@/lib/attraction-passes";
import { getAttractionImageUrl } from "@/lib/attraction-images";
import { ShowSchedule } from "./ShowSchedule";
import Image from "next/image";

interface Props {
  parkId: ParkId;
}

function waitBadge(attraction: Attraction) {
  if (!attraction.is_open) {
    return <span className="text-xs text-gray-400 flex items-center gap-0.5"><XCircle className="w-3 h-3" />運休</span>;
  }
  if (attraction.wait_time === 0) {
    return <span className="text-xs text-green-600 font-medium">待ちなし</span>;
  }

  let color = "text-green-600";
  if (attraction.wait_time > 60) color = "text-red-600";
  else if (attraction.wait_time > 40) color = "text-orange-600";
  else if (attraction.wait_time > 20) color = "text-yellow-600";

  return (
    <span className={`text-xs font-bold flex items-center gap-0.5 ${color}`}>
      <Clock className="w-3 h-3" />{attraction.wait_time}分
    </span>
  );
}

export function AreaMap({ parkId }: Props) {
  const [data, setData] = useState<ParkData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const areas = parkId === "tdl" ? TDL_AREAS : TDS_AREAS;
  const { isFavorite, toggle, count } = useFavorites();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/wait-times/${parkId}`);
    const json: ParkData = await res.json();
    setData(json);
    setLastUpdated(new Date().toLocaleTimeString("ja-JP"));
    setLoading(false);
  }, [parkId]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  const attractionMap = new Map<number, Attraction>(
    data?.attractions.map((a) => [a.id, a]) ?? []
  );

  // お気に入りのアトラクション一覧（待ち時間降順）
  const favoriteAttractions = data?.attractions.filter((a) => isFavorite(a.id)) ?? [];

  return (
    <div className="flex flex-col gap-3">
      {/* お気に入り説明 */}
      <p className="text-xs text-gray-400">♡ をタップしてお気に入り登録。次回から素早く確認できます。</p>

      {/* 更新時刻・フィルター */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        {lastUpdated && <span>最終更新: {lastUpdated}</span>}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFavoritesOnly((v) => !v)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors ${
              showFavoritesOnly
                ? "bg-red-50 border-red-300 text-red-500"
                : "border-gray-200 text-gray-400 hover:border-gray-400"
            }`}
          >
            <Heart className={`w-3 h-3 ${showFavoritesOnly ? "fill-red-500" : ""}`} />
            お気に入り{count > 0 && `(${count})`}
          </button>
          <button onClick={load} disabled={loading} className="flex items-center gap-1 text-blue-400 hover:text-blue-500 disabled:opacity-50">
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            更新
          </button>
        </div>
      </div>

      {/* お気に入り絞り込み表示 */}
      {showFavoritesOnly ? (
        favoriteAttractions.length === 0 ? (
          <div className="text-center py-10 text-sm text-gray-400">
            <Heart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>お気に入りがまだありません</p>
            <p className="text-xs mt-1">♡ をタップして追加してください</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-red-200 p-3">
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
              <Heart className="w-4 h-4 fill-red-400 text-red-400" />
              お気に入り
            </h4>
            <div className="grid grid-cols-1 gap-1">
              {favoriteAttractions.map((attraction) => {
                const passes = getAttractionPasses(attraction.id);
                return (
                  <div key={attraction.id} className="flex items-center justify-between bg-red-50 rounded-lg px-2.5 py-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <button onClick={() => toggle(attraction.id)} className="shrink-0">
                        <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                      </button>
                      <div className="min-w-0">
                        <span className={`text-xs truncate block ${attraction.is_open ? "text-gray-800" : "text-gray-400"}`}>
                          {attraction.nameJa}
                        </span>
                        {passes.length > 0 && (
                          <div className="flex gap-1 mt-0.5">
                            {passes.includes("dpa") && <span className="text-xs font-bold px-1 py-0.5 rounded bg-blue-600 text-white leading-none" style={{fontSize:"9px"}}>DPA</span>}
                            {passes.includes("special") && <span className="text-xs font-bold px-1 py-0.5 rounded bg-amber-500 text-white leading-none" style={{fontSize:"9px"}}>40周</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    {waitBadge(attraction)}
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        /* エリア別表示（最大待ち時間降順） */
        [...areas]
          .map((area: AreaDef) => {
            const rides = area.attractionIds
              .map((id) => attractionMap.get(id))
              .filter((a): a is Attraction => !!a);
            const maxWait = rides.reduce((m, r) => Math.max(m, r.wait_time), 0);
            return { area, rides, maxWait };
          })
          .sort((a, b) => b.maxWait - a.maxWait)
          .map(({ area, rides, maxWait }) => {
          if (rides.length === 0) return null;

          const openCount = rides.filter((r) => r.is_open).length;

          return (
            <div key={area.name} className={`rounded-xl border p-3 ${area.color}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-gray-800">{area.name}</h4>
                <span className="text-xs text-gray-500">
                  {openCount}/{rides.length}営業
                  {maxWait > 0 && <span className="ml-1 text-red-500 font-medium">最大{maxWait}分</span>}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {rides.map((attraction) => {
                  const passes = getAttractionPasses(attraction.id);
                  const imageUrl = getAttractionImageUrl(attraction.id);
                  return (
                    <div key={attraction.id} className="flex items-center justify-between bg-white/70 rounded-xl p-3 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <button onClick={() => toggle(attraction.id)} className="shrink-0">
                          <Heart className={`w-5 h-5 transition-colors ${isFavorite(attraction.id) ? "fill-red-400 text-red-400" : "text-gray-300 hover:text-red-300"}`} />
                        </button>
                        {imageUrl ? (
                          <div className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 ${!attraction.is_open ? "opacity-40 grayscale" : ""}`}>
                            <Image src={imageUrl} alt={attraction.nameJa} width={56} height={56} className="w-full h-full object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <span className={`text-sm md:text-base font-semibold block ${attraction.is_open ? "text-gray-800" : "text-gray-400"}`}>
                            {attraction.nameJa}
                          </span>
                          {passes.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {passes.includes("dpa") && <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white leading-none">DPA</span>}
                              {passes.includes("special") && <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white leading-none">40周</span>}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0">
                        {waitBadge(attraction)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* ショー・パレード */}
      <ShowSchedule parkId={parkId} />
    </div>
  );
}
