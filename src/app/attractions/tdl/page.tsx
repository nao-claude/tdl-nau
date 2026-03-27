import type { Metadata } from "next";
import Link from "next/link";
import { AttractionGuide } from "@/components/AttractionGuide";
import { TDL_ATTRACTIONS } from "@/lib/attraction-data";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export const metadata: Metadata = {
  title: "東京ディズニーランド アトラクションガイド | 待ち時間・身長制限・DPA一覧",
  description: "東京ディズニーランドの全アトラクション情報。リアルタイム待ち時間・身長制限・DPA対象・おすすめ時間帯・スリル度を一覧で確認できます。",
  alternates: { canonical: "https://disneynow.tokyo/attractions/tdl" },
};

export default function TDLAttractionsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl">🏰</Link>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">TDLなう</h1>
              <p className="text-xs text-gray-500">東京ディズニーランド・シー リアルタイム待ち時間</p>
            </div>
          </div>
          <LocaleSwitcher currentLocale="ja" />
        </div>
        {/* タブナビ */}
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            <Link href="/" className="flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              トップ
            </Link>
            <span className="flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium bg-white text-gray-900 shadow-sm">
              ランド
            </span>
            <Link href="/attractions/tds" className="flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-white/60 transition-colors">
              シー
            </Link>
          </div>
        </div>
      </header>

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

        <AdBanner adSlot="1111111111" />

        <div className="mt-6">
          <AttractionGuide parkId="tdl" attractions={TDL_ATTRACTIONS} locale="ja" />
        </div>

        <div className="mt-6">
          <AdBanner adSlot="2222222222" />
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
