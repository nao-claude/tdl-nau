import { Suspense } from "react";
import Link from "next/link";
import { MainTabsUsjEn } from "@/components/en/MainTabsUsjEn";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { fetchParkData } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USJ Now | Universal Studios Japan Real-time Wait Times & Crowd Forecast",
  description: "Check real-time wait times at Universal Studios Japan (USJ) by area and ranking. Includes crowd forecast calendar, recommended course, and Express Pass info.",
  alternates: {
    canonical: "https://disneynow.tokyo/en/usj",
    languages: {
      "ja": "https://disneynow.tokyo/usj",
      "en": "https://disneynow.tokyo/en/usj",
    },
  },
};

export const revalidate = 60;

export default async function UsjPageEn() {
  const result = await fetchParkData("usj").catch(() => null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎡</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                USJ Now
                <span className="sr-only"> — Universal Studios Japan Real-time Wait Times</span>
              </h1>
              <p className="text-xs text-gray-500">Universal Studios Japan Real-time Wait Times</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/en" className="text-xs text-blue-500 hover:text-blue-600">
              TDL/TDS →
            </Link>
            <LocaleSwitcher currentLocale="en" jaPath="/usj" enPath="/en/usj" />
          </div>
        </div>
      </header>

      {/* Ad: above content */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <AdBanner adSlot="1897618790" />
      </div>

      {/* About section */}
      <section className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-2">About USJ Now</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            USJ Now is an unofficial real-time wait time tracker for Universal Studios Japan. Check wait times by attraction, area, or ranking — all in one place.
            Popular areas including Super Nintendo World, The Wizarding World of Harry Potter, and Jurassic Park are covered.
          </p>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
            <li>· Auto-refreshes every 5 minutes</li>
            <li>· Crowd forecast in 7 grades (A–S)</li>
            <li>· View by area or ranking</li>
            <li>· AI-powered recommended course</li>
            <li>· Height requirements &amp; Express Pass info</li>
            <li>· Save favorites for quick access</li>
          </ul>
        </div>
      </section>

      <Suspense>
        <MainTabsUsjEn initialData={result} />
      </Suspense>

      {/* Ad: below content */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AdBanner adSlot="2084274874" />
      </div>

      {/* Attraction Guide link */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <h2 className="text-sm font-bold text-gray-700 mb-3">Attraction Strategy Guide</h2>
        <Link
          href="/en/attractions/usj"
          className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
        >
          <span className="text-2xl">🎡</span>
          <div>
            <p className="text-sm font-bold text-gray-900">USJ Attraction Guide</p>
            <p className="text-xs text-gray-500">Wait times · Height requirements · Express Pass</p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>Unofficial site. Not affiliated with Universal Studios Japan.</p>
        <p className="mt-1 flex items-center justify-center gap-3 flex-wrap">
          <a href="/privacy" className="underline">Privacy Policy</a>
          <span>·</span>
          <Link href="/about" className="underline">About</Link>
          <span>·</span>
          <Link href="/contact" className="underline">Contact</Link>
        </p>
        <p className="mt-1">
          Powered by{" "}
          <a href="https://queue-times.com" target="_blank" rel="noopener noreferrer" className="underline">
            Queue-Times.com
          </a>
        </p>
      </footer>
    </main>
  );
}
