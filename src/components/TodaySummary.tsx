"use client";

import { useEffect, useState } from "react";
import { ParkId, ParkData } from "@/types";
import { getMonthCalendar, CROWD_INFO } from "@/lib/crowd-prediction";
import { getHolidayName } from "@/lib/holidays";
import { TodayParkHours } from "@/app/api/park-hours/route";

interface Props {
  parkId: ParkId;
}

const SHARE_URL = "https://tdl-nau.vercel.app";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function TodaySummary({ parkId }: Props) {
  const [data, setData] = useState<ParkData | null>(null);
  const [hours, setHours] = useState<TodayParkHours | null>(null);

  useEffect(() => {
    fetch(`/api/wait-times/${parkId}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [parkId]);

  useEffect(() => {
    fetch("/api/park-hours")
      .then((r) => r.json())
      .then(setHours)
      .catch(() => {});
  }, []);

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

  const parkName = parkId === "tdl" ? "ランド" : "シー";
  const shareText = `今日の${parkName}は混雑度${grade}！${maxWait > 0 ? `最長待ち${maxWait}分` : "待ちなし多数"}🏰 #TDLなう`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SHARE_URL)}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* 日付・祝日・営業時間 */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800">{dateLabel}</p>
            {holidayName && (
              <p className="text-xs text-red-500 font-medium">{holidayName}</p>
            )}
            {hours && (
              <div className="flex flex-col gap-0 mt-0.5">
                {hours.tdl && (
                  <p className="text-xs text-gray-500">🏰 {hours.tdl.open}〜{hours.tdl.close}</p>
                )}
                {hours.tds && (
                  <p className="text-xs text-gray-500">⛵ {hours.tds.open}〜{hours.tds.close}</p>
                )}
              </div>
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

        {/* シェアボタン */}
        <div className="flex gap-2 shrink-0">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            シェア
          </a>
          <a
            href={lineShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#06C755] text-white text-xs font-bold hover:bg-[#05a848] transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            LINE
          </a>
        </div>
      </div>
    </div>
  );
}
