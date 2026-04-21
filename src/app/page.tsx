import Link from "next/link";
import { Suspense } from "react";
import { MainTabs } from "@/components/MainTabs";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { fetchParkData } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  const [tdlResult, tdsResult] = await Promise.allSettled([
    fetchParkData("tdl"),
    fetchParkData("tds"),
  ]);
  const initialTdlData = tdlResult.status === "fulfilled" ? tdlResult.value : null;
  const initialTdsData = tdsResult.status === "fulfilled" ? tdsResult.value : null;
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏰</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                TDLなう
                <span className="sr-only"> — 東京ディズニーランド・ディズニーシー リアルタイム待ち時間・混雑予想</span>
              </h1>
              <p className="text-xs text-gray-500">東京ディズニーランド・シー リアルタイム待ち時間</p>
            </div>
          </div>
          <LocaleSwitcher currentLocale="ja" />
        </div>
      </header>

      {/* 広告①：コンテンツ上部 */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <AdBanner adSlot="1897618790" />
      </div>

      {/* サービス紹介 — SSRされる静的コンテンツ */}
      <section className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-2">TDLなうとは</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            東京ディズニーランド・東京ディズニーシーのリアルタイム待ち時間を、アトラクション別・エリア別に無料で確認できる非公式情報サイトです。
            混雑予想カレンダー（1ヶ月先まで表示）やDPA攻略ガイド、おすすめ周遊コースなど、パーク訪問をもっと楽しくする情報をまとめています。
          </p>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
            <li>・待ち時間は5分ごとに自動更新</li>
            <li>・混雑予想をA〜Sの7段階で表示</li>
            <li>・DPA購入タイミング・売り切れ目安を掲載</li>
            <li>・身長制限・所要時間をアトラクション別に掲載</li>
            <li>・おすすめ周遊コースをリアルタイムで自動提案</li>
            <li>・英語版ページあり（訪日外国人の方にも対応）</li>
          </ul>
        </div>
      </section>

      <Suspense>
        <MainTabs initialTdlData={initialTdlData} initialTdsData={initialTdsData} />
      </Suspense>

      {/* 広告②：コンテンツ下部 */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AdBanner adSlot="2084274874" />
      </div>

      {/* ガイド・FAQリンク */}
      <div className="max-w-4xl mx-auto px-4 pb-6 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-3">アトラクションガイド</h2>
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
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-3">お役立ち情報</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/gw2026"
              className="flex items-center gap-3 bg-gradient-to-r from-rose-500 to-orange-400 rounded-2xl p-4 shadow-sm hover:from-rose-600 hover:to-orange-500 transition-colors"
            >
              <span className="text-2xl">🎌</span>
              <div>
                <p className="text-sm font-bold text-white">GW2026 混雑予想カレンダー</p>
                <p className="text-xs text-rose-100">4/29〜5/6 日別混雑レベル・攻略ポイント</p>
              </div>
            </Link>
            <Link
              href="/dpa"
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-4 shadow-sm hover:from-blue-700 hover:to-blue-600 transition-colors"
            >
              <span className="text-2xl">🎫</span>
              <div>
                <p className="text-sm font-bold text-white">DPA攻略ガイド</p>
                <p className="text-xs text-blue-100">どれから買う？売り切れ時間・予算別戦略</p>
              </div>
            </Link>
            <Link
              href="/faq"
              className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
            >
              <span className="text-2xl">❓</span>
              <div>
                <p className="text-sm font-bold text-gray-900">よくある質問（FAQ）</p>
                <p className="text-xs text-gray-500">待ち時間・DPA・チケット・混雑など21問</p>
              </div>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/about"
                className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:border-gray-400 transition-colors"
              >
                <span className="text-xl">ℹ️</span>
                <p className="text-xs font-bold text-gray-900">このサイトについて</p>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:border-gray-400 transition-colors"
              >
                <span className="text-xl">✉️</span>
                <p className="text-xs font-bold text-gray-900">お問い合わせ</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1 flex items-center justify-center gap-3 flex-wrap">
          <a href="/privacy" className="underline">プライバシーポリシー</a>
          <span>·</span>
          <Link href="/faq" className="underline">よくある質問</Link>
          <span>·</span>
          <Link href="/about" className="underline">このサイトについて</Link>
          <span>·</span>
          <Link href="/contact" className="underline">お問い合わせ</Link>
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
