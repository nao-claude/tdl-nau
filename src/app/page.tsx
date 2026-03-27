import Link from "next/link";
import { Suspense } from "react";
import { MainTabs } from "@/components/MainTabs";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏰</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">TDLなう</h1>
              <p className="text-xs text-gray-500">東京ディズニーランド・シー リアルタイム待ち時間</p>
            </div>
          </div>
          <LocaleSwitcher currentLocale="ja" />
        </div>
      </header>

      {/* 広告①：コンテンツ上部 */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <AdBanner adSlot="1111111111" />
      </div>

      <Suspense>
        <MainTabs />
      </Suspense>

      {/* 広告②：コンテンツ下部 */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AdBanner adSlot="2222222222" />
      </div>

      {/* アトラクションアトラクションガイドリンク */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <h2 className="text-sm font-bold text-gray-700 mb-3">アトラクションアトラクションガイド</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/attractions/tdl"
            className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <span className="text-2xl">🏰</span>
            <div>
              <p className="text-sm font-bold text-gray-900">東京ディズニーランド</p>
              <p className="text-xs text-gray-500">待ち時間・DPA・身長制限</p>
            </div>
          </Link>
          <Link
            href="/attractions/tds"
            className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <span className="text-2xl">⛵</span>
            <div>
              <p className="text-sm font-bold text-gray-900">東京ディズニーシー</p>
              <p className="text-xs text-gray-500">待ち時間・DPA・身長制限</p>
            </div>
          </Link>
        </div>
      </div>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1 flex items-center justify-center gap-3">
          <a href="/privacy" className="underline">プライバシーポリシー</a>
          <span>·</span>
          <Link href="/faq" className="underline">よくある質問</Link>
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
