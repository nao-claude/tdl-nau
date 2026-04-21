import { Suspense } from "react";
import Link from "next/link";
import { MainTabsUsj } from "@/components/MainTabsUsj";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { fetchParkData } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USJなう | ユニバーサル・スタジオ・ジャパン リアルタイム待ち時間・混雑予想",
  description: "ユニバーサル・スタジオ・ジャパン（USJ）のリアルタイム待ち時間をエリア別・ランキング別に無料で確認。混雑予想カレンダーやおすすめコースも掲載。",
  alternates: { canonical: "https://disneynow.tokyo/usj" },
};

export const revalidate = 60;

export default async function UsjPage() {
  const result = await fetchParkData("usj").catch(() => null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎡</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                USJなう
                <span className="sr-only"> — ユニバーサル・スタジオ・ジャパン リアルタイム待ち時間</span>
              </h1>
              <p className="text-xs text-gray-500">ユニバーサル・スタジオ・ジャパン リアルタイム待ち時間</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs text-blue-500 hover:text-blue-600">
              TDL/TDSへ →
            </Link>
            <LocaleSwitcher currentLocale="ja" jaPath="/usj" enPath="/en/usj" />
          </div>
        </div>
      </header>

      {/* 広告①：コンテンツ上部 */}
      <div className="max-w-4xl mx-auto px-4 pt-3">
        <AdBanner adSlot="1897618790" />
      </div>

      {/* サービス紹介 */}
      <section className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-2">USJなうとは</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            ユニバーサル・スタジオ・ジャパン（USJ）のリアルタイム待ち時間を、アトラクション別・エリア別に無料で確認できる非公式情報サイトです。
            ハリー・ポッター、スーパー・ニンテンドー・ワールドなど人気エリアの待ち時間をまとめています。
          </p>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
            <li>・待ち時間は5分ごとに自動更新</li>
            <li>・混雑予想をA〜Sの7段階で表示</li>
            <li>・エリア別・ランキング別で一覧表示</li>
            <li>・おすすめ周遊コースをリアルタイム提案</li>
            <li>・身長制限・エクスプレス・パス情報掲載</li>
            <li>・お気に入り登録で素早く確認</li>
          </ul>
        </div>
      </section>

      <Suspense>
        <MainTabsUsj initialData={result} />
      </Suspense>

      {/* 広告②：コンテンツ下部 */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AdBanner adSlot="2084274874" />
      </div>

      {/* アトラクションガイドリンク */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <h2 className="text-sm font-bold text-gray-700 mb-3">アトラクションガイド</h2>
        <Link
          href="/attractions/usj"
          className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
        >
          <span className="text-2xl">🎡</span>
          <div>
            <p className="text-sm font-bold text-gray-900">USJアトラクション攻略</p>
            <p className="text-xs text-gray-500">待ち時間・身長制限・エクスプレス・パス情報</p>
          </div>
        </Link>
      </div>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。ユニバーサル・スタジオ・ジャパンとは無関係です。</p>
        <p className="mt-1 flex items-center justify-center gap-3 flex-wrap">
          <a href="/privacy" className="underline">プライバシーポリシー</a>
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
