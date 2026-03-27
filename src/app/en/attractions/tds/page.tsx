import type { Metadata } from "next";
import Link from "next/link";
import { AttractionGuide } from "@/components/AttractionGuide";
import { TDS_ATTRACTIONS } from "@/lib/attraction-data";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export const metadata: Metadata = {
  title: "Tokyo DisneySea Attraction Guide | Wait Times · Height Requirements · DPA",
  description: "Complete guide to all Tokyo DisneySea attractions. Check real-time wait times, height requirements, DPA eligibility, best visiting times, and thrill levels at a glance.",
  alternates: { canonical: "https://disneynow.tokyo/en/attractions/tds" },
};

export default function TDSAttractionsPageEn() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/en" className="text-2xl">🏰</Link>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">TDL Now</h1>
              <p className="text-xs text-gray-500">Tokyo Disneyland &amp; DisneySea Real-time Wait Times</p>
            </div>
          </div>
          <LocaleSwitcher currentLocale="en" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/en" className="hover:text-gray-600">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-600">Attraction Guide</span>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-medium">DisneySea</span>
        </nav>

        {/* Title */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">⛵</span>
            <h2 className="text-xl font-bold text-gray-900">Tokyo DisneySea</h2>
          </div>
          <p className="text-sm text-gray-500">Attraction Strategy Guide — Height Req · DPA · Best Times</p>
        </div>

        {/* Park switcher */}
        <div className="flex gap-2 mb-6">
          <Link
            href="/en/attractions/tdl"
            className="px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] flex items-center bg-white text-gray-600 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            🏰 Disneyland
          </Link>
          <span className="px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] flex items-center bg-gray-900 text-white">
            ⛵ DisneySea
          </span>
        </div>

        <AdBanner adSlot="1111111111" />

        <div className="mt-6">
          <AttractionGuide parkId="tds" attractions={TDS_ATTRACTIONS} locale="en" />
        </div>

        <div className="mt-6">
          <AdBanner adSlot="2222222222" />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>Unofficial site. Not affiliated with Oriental Land Co., Ltd.</p>
        <p className="mt-1">
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </footer>
    </main>
  );
}
