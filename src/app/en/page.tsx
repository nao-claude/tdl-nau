import type { Metadata } from "next";
import Link from "next/link";
import { MainTabsEn } from "@/components/en/MainTabsEn";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export const metadata: Metadata = {
  metadataBase: new URL("https://disneynow.tokyo"),
  title: "TDL Now | Tokyo Disneyland & DisneySea Real-time Wait Times",
  description: "Check real-time wait times, area crowd status, crowd forecast calendar, weather, and ticket prices for Tokyo Disneyland and DisneySea on one screen.",
  keywords: "TDL wait times, TDS wait times, Tokyo Disneyland crowd, Tokyo DisneySea crowd, Tokyo Disney Resort wait times",
  openGraph: {
    title: "TDL Now | Tokyo Disneyland & DisneySea Real-time Wait Times",
    description: "Real-time wait times and crowd forecast for Tokyo Disneyland & DisneySea",
    url: "https://disneynow.tokyo/en",
    siteName: "TDL Now",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@disneynow_tokyo",
    creator: "@disneynow_tokyo",
    title: "TDL Now | Tokyo Disneyland & DisneySea Real-time Wait Times",
    description: "Real-time wait times and crowd forecast for Tokyo Disneyland & DisneySea",
  },
  alternates: {
    canonical: "https://disneynow.tokyo/en",
    languages: {
      "ja": "https://disneynow.tokyo",
      "en": "https://disneynow.tokyo/en",
    },
  },
};

export default function HomeEn() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏰</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">TDL Now</h1>
              <p className="text-xs text-gray-500">Tokyo Disneyland &amp; DisneySea Real-time Wait Times</p>
            </div>
          </div>
          <LocaleSwitcher currentLocale="en" />
        </div>
      </header>

      {/* Ad: above content */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <AdBanner adSlot="1111111111" />
      </div>

      <MainTabsEn />

      {/* Ad: below content */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AdBanner adSlot="2222222222" />
      </div>

      {/* Attraction Guide Links */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <h2 className="text-sm font-bold text-gray-700 mb-3">Attraction Strategy Guide</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/en/attractions/tdl"
            className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <span className="text-2xl">🏰</span>
            <div>
              <p className="text-sm font-bold text-gray-900">Tokyo Disneyland</p>
              <p className="text-xs text-gray-500">Wait times · DPA · Height req.</p>
            </div>
          </Link>
          <Link
            href="/en/attractions/tds"
            className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <span className="text-2xl">⛵</span>
            <div>
              <p className="text-sm font-bold text-gray-900">Tokyo DisneySea</p>
              <p className="text-xs text-gray-500">Wait times · DPA · Height req.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>Unofficial site. Not affiliated with Oriental Land Co., Ltd.</p>
        <p className="mt-1">
          <a href="/privacy" className="underline">Privacy Policy</a>
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
