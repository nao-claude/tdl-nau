import type { Metadata } from "next";
import Link from "next/link";
import { Map, Clock, CalendarDays } from "lucide-react";
import { AttractionGuide } from "@/components/AttractionGuide";
import { USJ_ATTRACTIONS } from "@/lib/attraction-data";
import { AdBanner } from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "USJ Attraction Guide | Wait Times · Height Requirements · Express Pass",
  description: "Complete guide to all Universal Studios Japan (USJ) attractions. Check real-time wait times, height requirements, Express Pass eligibility, best visiting times, and thrill levels at a glance.",
  alternates: { canonical: "https://disneynow.tokyo/en/attractions/usj" },
};

export default function UsjAttractionsPageEn() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/en/usj" className="text-2xl">🎡</Link>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">USJ Now</h1>
              <p className="text-xs text-gray-500">Universal Studios Japan Real-time Wait Times</p>
            </div>
          </div>
          <Link href="/en" className="text-xs text-blue-500 hover:text-blue-600">TDL/TDS →</Link>
        </div>
        {/* Tab nav */}
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            <Link href="/en/usj?tab=map" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              <Map className="w-4 h-4" />By Area
            </Link>
            <Link href="/en/usj?tab=realtime" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              <Clock className="w-4 h-4" />Ranking
            </Link>
            <Link href="/en/usj?tab=calendar" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              <CalendarDays className="w-4 h-4" />Crowd
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/en/usj" className="hover:text-gray-600">USJ Now</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-medium">Attraction Guide</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎡</span>
            <h2 className="text-xl font-bold text-gray-900">Universal Studios Japan</h2>
          </div>
          <p className="text-sm text-gray-500">Attraction Strategy Guide — Height Req · Express Pass · Best Times</p>
        </div>

        <AdBanner adSlot="1897618790" />

        <div className="mt-6">
          <AttractionGuide parkId="usj" attractions={USJ_ATTRACTIONS} locale="en" />
        </div>

        <div className="mt-6">
          <AdBanner adSlot="2084274874" />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>Unofficial site. Not affiliated with Universal Studios Japan.</p>
        <p className="mt-1">
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </footer>
    </main>
  );
}
