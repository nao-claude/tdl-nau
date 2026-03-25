"use client";

import { useEffect, useState, useCallback } from "react";
import { ParkId, ParkData } from "@/types";
import { WaitTimeCardEn } from "@/components/en/WaitTimeCardEn";
import { RefreshCw } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { ShowSchedule } from "@/components/ShowSchedule";
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

export function ParkPanelEn({ parkId, parkName }: Props) {
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
      setLastUpdated(new Date().toLocaleTimeString("en-US"));
    } finally {
      setLoading(false);
    }
  }, [parkId]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  const parkHour = hours[parkId];
  const isClosed = parkHour ? !isWithinParkHours(parkHour.open, parkHour.close) : false;

  const effectiveAttractions = isClosed && data
    ? data.attractions.map((a) => ({ ...a, is_open: false, wait_time: 0 }))
    : (data?.attractions ?? []);

  const openCount = effectiveAttractions.filter((a) => a.is_open).length;
  const totalCount = data?.attractions.length ?? 0;
  const maxWait = effectiveAttractions.reduce((max, a) => Math.max(max, a.wait_time), 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{parkName}</h2>
          <p className="text-sm text-gray-500">
            {openCount}/{totalCount} open
            {maxWait > 0 && <span className="ml-2">max <span className="font-semibold text-red-500">{maxWait} min</span></span>}
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="text-xs text-gray-400">Updated: {lastUpdated}</p>
      )}

      {/* Favorites hint */}
      <p className="text-xs text-gray-400">Tap ♡ to add favorites for quick access next time.</p>

      {/* Closed / before open message */}
      {(() => {
        const parkHour = hours[parkId];
        if (!parkHour || isWithinParkHours(parkHour.open, parkHour.close)) return null;
        const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
        const [oh, om] = parkHour.open.split(":").map(Number);
        const isBefore = nowMin < oh * 60 + om;
        return (
          <div className="flex flex-col items-center py-4 gap-1 text-gray-400">
            <span className="text-3xl">🏰</span>
            <p className="font-semibold text-gray-600">{isBefore ? "Not yet open" : "Now closed"}</p>
            <p className="text-sm">
              {isBefore ? `Today's opening time: ${parkHour.open}` : `Today's operation has ended (closed at ${parkHour.close})`}
            </p>
          </div>
        );
      })()}

      {/* Attraction list */}
      {loading && !data ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {effectiveAttractions.map((attraction) => (
            <WaitTimeCardEn
              key={attraction.id}
              attraction={attraction}
              isFavorite={isFavorite(attraction.id)}
              onToggleFavorite={toggle}
            />
          ))}
        </div>
      )}

      {/* Shows & Parades */}
      <ShowSchedule parkId={parkId} />
    </div>
  );
}
