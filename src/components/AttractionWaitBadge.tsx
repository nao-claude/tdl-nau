"use client";

import { useEffect, useState } from "react";
import { ParkId, ParkData } from "@/types";
import { RefreshCw } from "lucide-react";

interface Props {
  parkId: ParkId;
  attractionId: number;
}

export function AttractionWaitBadge({ parkId, attractionId }: Props) {
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/wait-times/${parkId}`)
      .then((r) => r.json())
      .then((data: ParkData) => {
        const attraction = data.attractions.find((a) => a.id === attractionId);
        if (attraction) {
          setIsOpen(attraction.is_open);
          setWaitTime(attraction.wait_time);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [parkId, attractionId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-3 animate-pulse">
        <RefreshCw className="w-4 h-4 text-gray-300 animate-spin" />
        <span className="text-sm text-gray-400">待ち時間を取得中...</span>
      </div>
    );
  }

  if (isOpen === null) return null;

  if (!isOpen) {
    return (
      <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
        <span className="text-2xl">🔒</span>
        <div>
          <p className="text-xs text-gray-500">現在の状況</p>
          <p className="text-sm font-bold text-gray-500">運休中・営業時間外</p>
        </div>
      </div>
    );
  }

  const badgeColor =
    waitTime === 0 ? "bg-green-50 border-green-200" :
    waitTime! <= 30 ? "bg-green-50 border-green-200" :
    waitTime! <= 60 ? "bg-yellow-50 border-yellow-200" :
    waitTime! <= 90 ? "bg-orange-50 border-orange-200" :
    "bg-red-50 border-red-200";

  const timeColor =
    waitTime === 0 ? "text-green-600" :
    waitTime! <= 30 ? "text-green-600" :
    waitTime! <= 60 ? "text-yellow-600" :
    waitTime! <= 90 ? "text-orange-600" :
    "text-red-600";

  return (
    <div className={`flex items-center gap-3 border rounded-2xl px-4 py-3 ${badgeColor}`}>
      <span className="text-2xl">⏱️</span>
      <div>
        <p className="text-xs text-gray-500">現在の待ち時間</p>
        {waitTime === 0 ? (
          <p className={`text-xl font-extrabold ${timeColor}`}>待ちなし</p>
        ) : (
          <p className={`text-xl font-extrabold ${timeColor}`}>
            {waitTime}<span className="text-sm font-normal text-gray-500 ml-1">分待ち</span>
          </p>
        )}
      </div>
    </div>
  );
}
