import type { Metadata } from "next";
import Link from "next/link";
import { Map, Clock, CalendarDays } from "lucide-react";
import { AttractionGuide } from "@/components/AttractionGuide";
import { TDS_ATTRACTIONS } from "@/lib/attraction-data";
import { AdBanner } from "@/components/AdBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import { ShareBar } from "@/components/ShareBar";

export const metadata: Metadata = {
  title: "ディズニーシー アトラクション一覧 2026 | 待ち時間・身長制限・DPA対象【最新】",
  description: "ディズニーシー全アトラクションの今日のリアルタイム待ち時間・身長制限・DPA対象を無料で一覧表示。ファンタジースプリングス最新情報も掲載。",
  alternates: {
    canonical: "https://disneynow.tokyo/attractions/tds",
    languages: {
      ja: "https://disneynow.tokyo/attractions/tds",
      en: "https://disneynow.tokyo/en/attractions/tds",
    },
  },
};

export default function TDSAttractionsPage() {
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
          <span className="text-gray-900 font-medium">シー</span>
        </nav>

        {/* タイトル */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">⛵</span>
            <h2 className="text-xl font-bold text-gray-900">東京ディズニーシー</h2>
          </div>
          <p className="text-sm text-gray-500">アトラクションガイド — 身長制限・DPA・おすすめ時間帯</p>
        </div>

        {/* リアルタイム待ち時間バナー */}
        <Link href="/?park=tds&tab=realtime" className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl px-4 py-3 mb-4 hover:opacity-90 transition-opacity">
          <div>
            <p className="text-sm font-bold text-white">今日のリアルタイム待ち時間を見る</p>
            <p className="text-xs text-teal-100 mt-0.5">5分ごと自動更新 · 現在の混雑状況</p>
          </div>
          <span className="text-white text-lg">›</span>
        </Link>

        {/* ファンタジースプリングス特集 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">✨</span>
            <p className="text-sm font-bold text-purple-900">ファンタジースプリングス 2026攻略</p>
          </div>
          <p className="text-xs text-purple-700 leading-relaxed mb-3">
            アナと雪の女王・ラプンツェル・ピーター・パンの3エリア。開園直後はDPAが即売り切れになるため、入園後すぐの購入が必須です。
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "アナ雪", dpa: "¥2,000〜", soldOut: "30〜60分" },
              { name: "ラプンツェル", dpa: "¥2,000〜", soldOut: "1〜2時間" },
              { name: "ピーター・パン", dpa: "¥2,000〜", soldOut: "1〜3時間" },
            ].map((a) => (
              <div key={a.name} className="bg-white rounded-xl p-2.5 text-center border border-purple-100">
                <p className="text-xs font-bold text-gray-900">{a.name}</p>
                <p className="text-xs text-purple-600 font-bold mt-1">DPA {a.dpa}</p>
                <p className="text-xs text-red-500 mt-0.5">売切 {a.soldOut}</p>
              </div>
            ))}
          </div>
          <Link href="/dpa" className="mt-3 flex items-center justify-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900">
            DPA完全攻略ガイドを見る <span>›</span>
          </Link>
        </div>

        {/* パーク切り替え */}
        <div className="flex gap-2 mb-6">
          <Link
            href="/attractions/tdl"
            className="px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] flex items-center bg-white text-gray-600 border border-gray-200 hover:border-gray-400 transition-colors"
          >
            🏰 ランド
          </Link>
          <span className="px-5 py-2.5 rounded-full text-sm font-medium min-h-[44px] flex items-center bg-gray-900 text-white">
            ⛵ シー
          </span>
        </div>

        <AdBanner adSlot="1897618790" />

        <div className="mt-6">
          <AttractionGuide parkId="tds" attractions={TDS_ATTRACTIONS} locale="ja" />
        </div>

        <AdBanner adSlot="2084274874" containerClassName="mt-6" />

        {/* エリア別ガイドリンク */}
        <div className="mt-6">
          <p className="text-sm font-bold text-gray-700 mb-3">エリア別攻略ガイド</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { slug: "mediterranean-harbor", name: "メディテレーニアンハーバー" },
              { slug: "american-waterfront", name: "アメリカンウォーターフロント" },
              { slug: "port-discovery", name: "ポート・ディスカバリー" },
              { slug: "lost-river-delta", name: "ロストリバーデルタ" },
              { slug: "arabian-coast", name: "アラビアンコースト" },
              { slug: "mermaid-lagoon", name: "マーメイドラグーン" },
              { slug: "mysterious-island", name: "ミステリアスアイランド" },
              { slug: "fantasy-springs", name: "ファンタジースプリングス" },
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/area/tds/${area.slug}`}
                className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:border-teal-400 transition-colors"
              >
                <span className="text-base">⛵</span>
                <p className="text-xs font-bold text-gray-900">{area.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* シェア */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-900">このページをシェア・保存</p>
            <p className="text-xs text-gray-500 mt-0.5">次回の来園前にすぐ確認できます</p>
          </div>
          <ShareBar
            url="https://disneynow.tokyo/attractions/tds"
            text="東京ディズニーシーのアトラクション一覧（待ち時間・DPA・身長制限）をチェック！"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-6">
        <AmazonBanner keyword="ディズニーシー グッズ 人気" label="Amazonでディズニーシーグッズを探す" />
      </div>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-2">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1">
          <Link href="/privacy" className="underline">プライバシーポリシー</Link>
        </p>
      </footer>
    </main>
  );
}
