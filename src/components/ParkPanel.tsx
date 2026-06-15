"use client";

import { useEffect, useState, useCallback } from "react";
import { ParkId, ParkData } from "@/types";
import { WaitTimeCard } from "./WaitTimeCard";
import { RefreshCw } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { ShowSchedule } from "./ShowSchedule";
import { TodayParkHours } from "@/app/api/park-hours/route";

type WaitFilter = "all" | "under30" | "nowait";

interface Props {
  parkId: ParkId;
  parkName: string;
  /** MainTabs から渡される場合は自前フェッチをスキップ */
  data?: ParkData | null;
  parkHours?: TodayParkHours | null;
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

const DEFAULT_HOURS_PP: TodayParkHours = {
  tdl: { open: "9:00", close: "21:00" },
  tds: { open: "9:00", close: "21:00" },
};

export function ParkPanel({ parkId, parkName, data: dataProp, parkHours: parkHoursProp }: Props) {
  const [dataInternal, setDataInternal] = useState<ParkData | null>(null);
  const [loading, setLoading] = useState(!dataProp);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [hoursInternal, setHoursInternal] = useState<TodayParkHours>(DEFAULT_HOURS_PP);
  const { isFavorite, toggle } = useFavorites();
  const [waitFilter, setWaitFilter] = useState<WaitFilter>("all");

  // park-hours を独立取得（失敗してもDEFAULT_HOURSで継続）
  useEffect(() => {
    if (parkHoursProp !== undefined) return;
    fetch("/api/park-hours")
      .then((r) => (r.ok ? r.json() : DEFAULT_HOURS_PP))
      .catch(() => DEFAULT_HOURS_PP)
      .then(setHoursInternal);
  }, [parkHoursProp]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wait-times/${parkId}`, {
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("fetch failed");
      const json: ParkData = await res.json();
      setDataInternal(json);
      setLastUpdated(new Date().toLocaleTimeString("ja-JP"));
    } catch {
      // エラー時はローディングを解除（データはnullのまま）
    } finally {
      setLoading(false);
    }
  }, [parkId]);

  useEffect(() => {
    if (dataProp !== undefined) return;
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load, dataProp]);

  // dataProp が更新されたら lastUpdated を更新
  useEffect(() => {
    if (dataProp !== undefined && dataProp !== null) {
      setLastUpdated(new Date().toLocaleTimeString("ja-JP"));
    }
  }, [dataProp]);

  const data = dataProp !== undefined ? dataProp : dataInternal;
  const hours = parkHoursProp !== undefined && parkHoursProp !== null ? parkHoursProp : hoursInternal;
  // dataProp が渡されていて null（ローディング中）の場合もローディング扱い
  const isLoadingEffective = dataProp !== undefined ? dataProp === null : loading;

  const parkHour = hours[parkId];
  const isClosed = parkHour ? !isWithinParkHours(parkHour.open, parkHour.close) : false;

  const effectiveAttractions = isClosed && data
    ? data.attractions.map((a) => ({ ...a, is_open: false, wait_time: 0 }))
    : (data?.attractions ?? []);

  const openCount = effectiveAttractions.filter((a) => a.is_open).length;
  const totalCount = data?.attractions.length ?? 0;
  const maxWait = effectiveAttractions.reduce((max, a) => Math.max(max, a.wait_time), 0);

  const filteredAttractions = effectiveAttractions.filter((a) => {
    if (waitFilter === "under30") return a.is_open && a.wait_time <= 30;
    if (waitFilter === "nowait") return a.is_open && a.wait_time === 0;
    return true;
  });

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
          disabled={isLoadingEffective}
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingEffective ? "animate-spin" : ""}`} />
          更新
        </button>
      </div>

      {/* 更新時刻 */}
      {lastUpdated && (
        <p className="text-xs text-gray-400">最終取得: {lastUpdated}</p>
      )}

      {/* お気に入り説明 */}
      <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
        <span className="text-red-400 text-base leading-none">♡</span>
        <p className="text-xs text-red-600 font-medium">をタップしてお気に入り登録。次回から素早く確認できます。</p>
      </div>

      {/* 待ち時間フィルター */}
      <div className="flex gap-2">
        {([
          { id: "all",     label: "すべて" },
          { id: "under30", label: "30分以内" },
          { id: "nowait",  label: "待ちなし" },
        ] as { id: WaitFilter; label: string }[]).map((f) => (
          <button
            key={f.id}
            onClick={() => setWaitFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              waitFilter === f.id
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {f.id !== "all" && "✅ "}{f.label}
            {f.id === "under30" && data && (
              <span className="ml-1 opacity-80">
                ({effectiveAttractions.filter((a) => a.is_open && a.wait_time <= 30).length})
              </span>
            )}
            {f.id === "nowait" && data && (
              <span className="ml-1 opacity-80">
                ({effectiveAttractions.filter((a) => a.is_open && a.wait_time === 0).length})
              </span>
            )}
          </button>
        ))}
      </div>

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
      {isLoadingEffective && !data ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredAttractions.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">該当するアトラクションがありません</p>
          )}
          {filteredAttractions.map((attraction) => (
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
