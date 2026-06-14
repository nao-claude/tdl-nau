import type { Metadata } from "next";
import Link from "next/link";
import { Map, Clock, CalendarDays } from "lucide-react";
import { AttractionGuide } from "@/components/AttractionGuide";
import { TDL_ATTRACTIONS } from "@/lib/attraction-data";
import { AdBanner } from "@/components/AdBanner";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "ディズニーランド アトラクション一覧 2026 | 待ち時間・身長制限・DPA対象【最新】",
  description: "ディズニーランド全アトラクションの今日のリアルタイム待ち時間・身長制限・DPA対象を無料で一覧表示。美女と野獣・ビッグサンダー等の混雑時間帯も解説。",
  alternates: {
    canonical: "https://disneynow.tokyo/attractions/tdl",
    languages: {
      ja: "https://disneynow.tokyo/attractions/tdl",
      en: "https://disneynow.tokyo/en/attractions/tdl",
    },
  },
};

export default function TDLAttractionsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader>
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            <Link href="/?tab=map" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              <Map className="w-4 h-4" />エリア別
            </Link>
            <Link href="/?tab=realtime" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              <Clock className="w-4 h-4" />ランキング
            </Link>
            <Link href="/?tab=calendar" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              <CalendarDays className="w-4 h-4" />混雑予想
            </Link>
          </div>
        </div>
      </SiteHeader>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">トップ</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-600">アトラクション攻略</span>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-medium">ランド</span>
        </nav>

        {/* タイトル */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏰</span>
            <h2 className="text-xl font-bold text-gray-900">東京ディズニーランド</h2>
          </div>
          <p className="text-sm text-gray-500">アトラクションガイド — 身長制限・DPA・おすすめ時間帯</p>
        </div>

        {/* パーク切り替え */}
        <div className="flex gap-2 mb-6">
          <span className="px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] flex items-center bg-gray-900 text-white">
            🏰 ランド
          </span>
          <Link
            href="/attractions/tds"
            className="px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] flex items-center bg-white text-gray-600 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            ⛵ シー
          </Link>
        </div>

        <AdBanner adSlot="1897618790" />

        <div className="mt-6">
          <AttractionGuide parkId="tdl" attractions={TDL_ATTRACTIONS} locale="ja" />
        </div>

        <AdBanner adSlot="2084274874" containerClassName="mt-6" />

        {/* エリア別ガイドリンク */}
        <div className="mt-6">
          <p className="text-sm font-bold text-gray-700 mb-3">エリア別攻略ガイド</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { slug: "world-bazaar", name: "ワールドバザール" },
              { slug: "adventureland", name: "アドベンチャーランド" },
              { slug: "westernland", name: "ウエスタンランド" },
              { slug: "fantasyland", name: "ファンタジーランド" },
              { slug: "new-fantasyland", name: "ニューファンタジーランド" },
              { slug: "toontown", name: "トゥーンタウン" },
              { slug: "tomorrowland", name: "トゥモローランド" },
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/area/tdl/${area.slug}`}
                className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:border-blue-400 transition-colors"
              >
                <span className="text-base">🏰</span>
                <p className="text-xs font-bold text-gray-900">{area.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1">
          <Link href="/privacy" className="underline">プライバシーポリシー</Link>
        </p>
      </footer>
    </main>
  );
}
