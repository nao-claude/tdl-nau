"use client";

import { useState, useEffect } from "react";
import { AttractionInfo, BestTime, WaitTendency } from "@/lib/attraction-data";
import { ParkId, ParkData } from "@/types";

// ──────────────────────────────────────────────────────────
// ユーティリティ
// ──────────────────────────────────────────────────────────
function ThrillStars({ level, locale }: { level: number; locale: "ja" | "en" }) {
  return (
    <div className="flex items-center gap-0.5" title={locale === "en" ? `Thrill: ${level}/5` : `スリル度: ${level}/5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-xs ${i <= level ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  );
}

const BEST_TIME_JA: Record<BestTime, string> = {
  morning: "🌅 朝一番",
  afternoon: "☀️ 午後",
  evening: "🌆 夕方",
  anytime: "🕐 いつでも",
};
const BEST_TIME_EN: Record<BestTime, string> = {
  morning: "🌅 Morning",
  afternoon: "☀️ Afternoon",
  evening: "🌆 Evening",
  anytime: "🕐 Anytime",
};

const WAIT_BADGE: Record<WaitTendency, { label: string; labelEn: string; cls: string }> = {
  high:   { label: "混みやすい", labelEn: "Often Long",  cls: "bg-red-100 text-red-700" },
  medium: { label: "普通",       labelEn: "Moderate",    cls: "bg-yellow-100 text-yellow-700" },
  low:    { label: "空きやすい", labelEn: "Usually Short", cls: "bg-green-100 text-green-700" },
};

function waitBadgeClass(minutes: number): string {
  if (minutes === 0) return "bg-green-100 text-green-700";
  if (minutes <= 20)  return "bg-green-100 text-green-700";
  if (minutes <= 40)  return "bg-yellow-100 text-yellow-700";
  if (minutes <= 60)  return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
}

// ──────────────────────────────────────────────────────────
// メインコンポーネント
// ──────────────────────────────────────────────────────────
interface Props {
  parkId: ParkId;
  attractions: AttractionInfo[];
  locale?: "ja" | "en";
}

export function AttractionGuide({ parkId, attractions, locale = "ja" }: Props) {
  const [liveData, setLiveData] = useState<ParkData | null>(null);
  const [filter, setFilter] = useState<"all" | "dpa" | "noHeight" | "low">("all");

  useEffect(() => {
    fetch(`/api/wait-times/${parkId}`)
      .then(r => r.ok ? r.json() : null)
      .then(setLiveData)
      .catch(() => {});
  }, [parkId]);

  const filtered = attractions.filter(a => {
    if (filter === "dpa")      return a.isDPA;
    if (filter === "noHeight") return a.heightMin === null;
    if (filter === "low")      return a.waitTendency === "low";
    return true;
  });

  const areas = [...new Set(attractions.map(a => locale === "en" ? a.areaEn : a.area))];

  return (
    <div>
      {/* フィルター */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: "all",      ja: "すべて",        en: "All" },
          { id: "dpa",      ja: "DPA対象",       en: "DPA" },
          { id: "noHeight", ja: "身長制限なし",  en: "No Height Req." },
          { id: "low",      ja: "空きやすい",    en: "Short Waits" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === f.id
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
            }`}
          >
            {locale === "en" ? f.en : f.ja}
          </button>
        ))}
      </div>

      {/* エリア別グルーピング */}
      {areas.map(area => {
        const areaAttractions = filtered.filter(a =>
          (locale === "en" ? a.areaEn : a.area) === area
        );
        if (areaAttractions.length === 0) return null;

        return (
          <div key={area} className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">
              {area}
            </h3>
            <div className="space-y-3">
              {areaAttractions.map(attraction => {
                const live = liveData?.attractions.find(a => a.id === attraction.id);
                const waitBadge = WAIT_BADGE[attraction.waitTendency];

                return (
                  <div key={attraction.id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                    {/* ヘッダー行 */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">
                          {locale === "en" ? attraction.nameEn : attraction.nameJa}
                        </h4>
                      </div>
                      {/* リアルタイム待ち時間 */}
                      {live && live.is_open && (
                        <div className={`shrink-0 px-2 py-1 rounded-full text-xs font-bold ${waitBadgeClass(live.wait_time)}`}>
                          {live.wait_time === 0
                            ? (locale === "en" ? "No wait" : "待ちなし")
                            : `${live.wait_time}${locale === "en" ? " min" : "分"}`}
                        </div>
                      )}
                      {live && !live.is_open && (
                        <div className="shrink-0 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
                          {locale === "en" ? "Closed" : "運休中"}
                        </div>
                      )}
                    </div>

                    {/* バッジ行 */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <ThrillStars level={attraction.thrillLevel} locale={locale} />
                      {attraction.isDPA && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          DPA
                        </span>
                      )}
                      {attraction.heightMin && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {locale === "en" ? `${attraction.heightMin}cm+` : `身長${attraction.heightMin}cm以上`}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${waitBadge.cls}`}>
                        {locale === "en" ? waitBadge.labelEn : waitBadge.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {locale === "en" ? BEST_TIME_EN[attraction.bestTime] : BEST_TIME_JA[attraction.bestTime]}
                      </span>
                    </div>

                    {/* 説明文 */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {locale === "en" ? attraction.descEn : attraction.descJa}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
