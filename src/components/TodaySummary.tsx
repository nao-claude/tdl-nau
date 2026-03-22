"use client";

import { useEffect, useState } from "react";
import { ParkId, ParkData } from "@/types";
import { getMonthCalendar, CROWD_INFO } from "@/lib/crowd-prediction";
import { getHolidayName } from "@/lib/holidays";

interface Props {
  parkId: ParkId;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function TodaySummary({ parkId }: Props) {
  const [data, setData] = useState<ParkData | null>(null);

  useEffect(() => {
    fetch(`/api/wait-times/${parkId}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [parkId]);

  const today = new Date();
  const days = getMonthCalendar(today.getFullYear(), today.getMonth() + 1);
  const todayEntry = days.find((d) => d.date.getDate() === today.getDate());
  const grade = todayEntry?.grade ?? "C";
  const info = CROWD_INFO[grade];
  const holidayName = getHolidayName(today);

  const openAttractions = data?.attractions.filter((a) => a.is_open) ?? [];
  const totalCount = data?.attractions.length ?? 0;
  const maxWait = openAttractions.reduce((max, a) => Math.max(max, a.wait_time), 0);
  const noWaitCount = openAttractions.filter((a) => a.wait_time === 0).length;

  const dateLabel = `${today.getMonth() + 1}月${today.getDate()}日(${WEEKDAYS[today.getDay()]})`;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* 日付・祝日 */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800">{dateLabel}</p>
            {holidayName && (
              <p className="text-xs text-red-500 font-medium">{holidayName}</p>
            )}
          </div>

          {/* 統計 */}
          <div className="flex items-center gap-3 shrink-0">
            {/* 混雑グレード */}
            <div className={`flex flex-col items-center px-3 py-1.5 rounded-xl ${info.bgColor}`}>
              <span className="text-xs text-gray-500 leading-none">今日の混雑</span>
              <span className={`text-2xl font-extrabold leading-none mt-0.5 ${info.color}`}>{grade}</span>
            </div>

            {/* 最長待ち */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 leading-none">最長待ち</span>
              {maxWait > 0 ? (
                <span className="text-xl font-bold text-red-500 leading-none mt-0.5">
                  {maxWait}<span className="text-xs font-normal text-gray-500">分</span>
                </span>
              ) : (
                <span className="text-sm font-bold text-gray-400 leading-none mt-0.5">−</span>
              )}
            </div>

            {/* 営業中 */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 leading-none">営業中</span>
              <span className="text-xl font-bold text-blue-500 leading-none mt-0.5">
                {openAttractions.length}<span className="text-xs font-normal text-gray-500">/{totalCount}</span>
              </span>
            </div>

            {/* 待ちなし */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 leading-none">待ちなし</span>
              <span className="text-xl font-bold text-green-500 leading-none mt-0.5">
                {noWaitCount}<span className="text-xs font-normal text-gray-500">本</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
