"use client";

import { Attraction } from "@/types";
import { Clock, CheckCircle, XCircle, Heart } from "lucide-react";
import { getAttractionPasses } from "@/lib/attraction-passes";
import { getAttractionImageUrl } from "@/lib/attraction-images";
import Image from "next/image";

interface Props {
  attraction: Attraction;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

function waitTimeColor(minutes: number): string {
  if (minutes === 0) return "text-gray-400";
  if (minutes <= 20) return "text-green-500";
  if (minutes <= 40) return "text-yellow-500";
  if (minutes <= 60) return "text-orange-500";
  return "text-red-500";
}

function waitTimeBg(minutes: number): string {
  if (minutes === 0) return "bg-gray-50";
  if (minutes <= 20) return "bg-green-50";
  if (minutes <= 40) return "bg-yellow-50";
  if (minutes <= 60) return "bg-orange-50";
  return "bg-red-50";
}

export function WaitTimeCard({ attraction, isFavorite, onToggleFavorite }: Props) {
  const { nameJa, is_open, wait_time } = attraction;
  const passes = getAttractionPasses(attraction.id);
  const imageUrl = getAttractionImageUrl(attraction.id);

  return (
    <div className={`rounded-xl p-3 border ${waitTimeBg(wait_time)} border-gray-200 flex items-center justify-between gap-3`}>
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={() => onToggleFavorite(attraction.id)} className="shrink-0">
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-400 text-red-400" : "text-gray-300 hover:text-red-300"}`} />
        </button>
        {/* アトラクション画像アイコン */}
        {imageUrl ? (
          <div className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 ${!is_open ? "opacity-40 grayscale" : ""}`}>
            <Image src={imageUrl} alt={nameJa} width={56} height={56} className="w-full h-full object-cover" unoptimized />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gray-200 shrink-0 flex items-center justify-center">
            {is_open ? <CheckCircle className="w-6 h-6 text-green-400" /> : <XCircle className="w-6 h-6 text-gray-300" />}
          </div>
        )}
        <div className="min-w-0">
          <span className={`text-base font-semibold truncate block ${is_open ? "text-gray-800" : "text-gray-400"}`}>
            {nameJa}
          </span>
          {passes.length > 0 && (
            <div className="flex gap-1 mt-1">
              {passes.includes("dpa") && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white leading-none">DPA発売中</span>
              )}
              {passes.includes("special") && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white leading-none">40周年PP</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {is_open ? (
          wait_time > 0 ? (
            <>
              <Clock className={`w-5 h-5 ${waitTimeColor(wait_time)}`} />
              <span className={`text-2xl font-bold ${waitTimeColor(wait_time)}`}>
                {wait_time}
              </span>
              <span className="text-sm text-gray-500">分</span>
            </>
          ) : (
            <span className="text-base text-green-600 font-medium">待ちなし</span>
          )
        ) : (
          <span className="text-sm text-gray-400">運休中</span>
        )}
      </div>
    </div>
  );
}
