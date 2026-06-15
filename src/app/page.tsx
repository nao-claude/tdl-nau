import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { MainTabs } from "@/components/MainTabs";
import { AdBanner } from "@/components/AdBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { ShareBar } from "@/components/ShareBar";
import { fetchParkData } from "@/lib/api";

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

const LATEST_ARTICLES = [
  {
    href: "/guide/hotel",
    imageId: 1117,
    imageAlt: "東京ディズニーリゾート周辺ホテル",
    category: "ホテル",
    title: "ディズニー近隣ホテル完全ガイド 2026",
    desc: "オフィシャルホテル全6軒を比較。シャトルバス・料金・格安ホテルの探し方まで",
    date: "2026.06.15",
  },
  {
    href: "/guide/couple",
    imageId: 1117,
    imageAlt: "ラプンツェルのランタンフェスティバル",
    category: "デート",
    title: "カップル・デート攻略ガイド 2026",
    desc: "フォトスポット・ディナー予約・プロポーズ情報まで完全網羅",
    date: "2026.06.08",
  },
  {
    href: "/guide/repeat-visitor",
    imageId: 631,
    imageAlt: "センター・オブ・ジ・アース",
    category: "上級者向け",
    title: "リピーター・2回目以降の攻略ガイド",
    desc: "穴場スポット・マニアックな見どころ・空いている時間帯を徹底解説",
    date: "2026.06.08",
  },
  {
    href: "/guide/budget",
    imageId: 1005,
    imageAlt: "ソアリン：ファンタスティック・フライト",
    category: "節約",
    title: "ディズニー費用・節約完全ガイド 2026",
    desc: "1日の費用内訳と節約テク7選。予算シミュレーション付き",
    date: "2026.06.07",
  },
];

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
      <SiteHeader />

      {/* 広告①：コンテンツ上部 */}
      <AdBanner adSlot="1897618790" containerClassName="max-w-4xl mx-auto px-4 pt-3" />

      <Suspense>
        <MainTabs initialTdlData={initialTdlData} initialTdsData={initialTdsData} />
      </Suspense>

      {/* 次のアクション誘導 */}
      <section className="max-w-4xl mx-auto px-4 pt-3 pb-1">
        <p className="text-xs text-gray-400 mb-2 font-medium">待ち時間を確認したら</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Link href="/summer2026" className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl px-3 py-3 shadow-sm hover:opacity-90 transition-opacity">
            <span className="text-xl shrink-0">📅</span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">混雑カレンダー</p>
              <p className="text-xs text-yellow-100 leading-tight mt-0.5 truncate">夏休み混雑予想</p>
            </div>
          </Link>
          <Link href="/dpa" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl px-3 py-3 shadow-sm hover:opacity-90 transition-opacity">
            <span className="text-xl shrink-0">🎫</span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">DPA攻略</p>
              <p className="text-xs text-blue-100 leading-tight mt-0.5 truncate">どれから買う？</p>
            </div>
          </Link>
          <Link href="/guide/first-time-tdl" className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl px-3 py-3 shadow-sm hover:opacity-90 transition-opacity">
            <span className="text-xl shrink-0">🗺️</span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">周遊ルート</p>
              <p className="text-xs text-emerald-100 leading-tight mt-0.5 truncate">おすすめ回り方</p>
            </div>
          </Link>
          <Link href="/attractions/tds" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl px-3 py-3 shadow-sm hover:opacity-90 transition-opacity">
            <span className="text-xl shrink-0">⛵</span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">シー全一覧</p>
              <p className="text-xs text-purple-100 leading-tight mt-0.5 truncate">身長制限・DPA</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 広告②：コンテンツ下部 */}
      <AdBanner adSlot="2084274874" containerClassName="max-w-4xl mx-auto px-4 pb-4" />

      {/* サービス紹介 */}
      <section className="max-w-4xl mx-auto px-4 pt-2 pb-4">
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

      {/* 新着記事 */}
      <section className="max-w-4xl mx-auto px-4 pb-2 pt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-700">新着攻略記事</h2>
          <Link href="/guide" className="text-xs text-blue-500 hover:underline">すべての記事を見る →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {LATEST_ARTICLES.map((article) => (
            <Link key={article.href} href={article.href} className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:border-gray-400 transition-colors">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={`${CDN}/${article.imageId}_thum_name.jpg`}
                  alt={article.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <span className="absolute top-2 left-2 text-xs font-bold bg-white/90 text-gray-700 px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">{article.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{article.desc}</p>
                <p className="text-xs text-gray-400 mt-1.5">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/guide" className="mt-3 flex items-center justify-center gap-1 w-full bg-white border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-700 hover:border-gray-400 transition-colors shadow-sm">
          攻略記事一覧を見る
          <span className="text-gray-400">›</span>
        </Link>
      </section>

      {/* リンク集 */}
      <div className="max-w-4xl mx-auto px-4 pb-6 space-y-6">

        {/* エリアガイド */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-3">エリア別ガイド</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Link href="/attractions/tdl" className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors">
              <span className="text-2xl">🏰</span>
              <div>
                <p className="text-sm font-bold text-gray-900">ランドガイド</p>
                <p className="text-xs text-gray-500">DPA・身長制限・全アトラクション</p>
              </div>
            </Link>
            <Link href="/attractions/tds" className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors">
              <span className="text-2xl">⛵</span>
              <div>
                <p className="text-sm font-bold text-gray-900">シーガイド</p>
                <p className="text-xs text-gray-500">DPA・身長制限・全アトラクション</p>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { href: "/area/tdl/fantasyland", label: "🏰 ファンタジーランド" },
              { href: "/area/tdl/new-fantasyland", label: "🏰 ニューファンタジーランド" },
              { href: "/area/tdl/tomorrowland", label: "🏰 トゥモローランド" },
              { href: "/area/tdl/westernland", label: "🏰 ウエスタンランド" },
              { href: "/area/tds/fantasy-springs", label: "⛵ ファンタジースプリングス" },
              { href: "/area/tds/mysterious-island", label: "⛵ ミステリアスアイランド" },
              { href: "/area/tds/port-discovery", label: "⛵ ポート・ディスカバリー" },
              { href: "/area/tds/american-waterfront", label: "⛵ アメリカンウォーターフロント" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-xs bg-white rounded-xl border border-gray-200 px-3 py-2 hover:border-gray-400 transition-colors text-gray-800 font-medium truncate">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 攻略ガイド */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-3">攻略ガイド</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: "/guide/hotel", icon: "🏨", title: "近隣ホテル完全ガイド", sub: "楽天・じゃらんで最安値比較" },
              { href: "/guide/first-time-tdl", icon: "📖", title: "初めてのTDL完全ガイド", sub: "チケット・DPA・回り方" },
              { href: "/guide/family-disney", icon: "👨‍👩‍👧", title: "子連れ完全ガイド", sub: "年齢別プラン・身長制限" },
              { href: "/guide/anniversary", icon: "🎂", title: "誕生日・記念日特典", sub: "バースデーシール攻略" },
              { href: "/guide/dining", icon: "🍽️", title: "レストラン・グルメ", sub: "予約方法・穴場時間帯" },
              { href: "/guide/packing-list", icon: "🎒", title: "持ち物リスト完全版", sub: "忘れ物ゼロで楽しむ準備" },
              { href: "/guide/rainy-day", icon: "🌧️", title: "雨の日ディズニー攻略", sub: "実は狙い目？屋内完全版" },
              { href: "/guide/budget", icon: "💰", title: "費用・節約完全ガイド", sub: "1日の予算シミュレーション" },
              { href: "/guide/couple", icon: "💑", title: "カップル・デート攻略", sub: "フォトスポット・プロポーズ" },
              { href: "/guide/repeat-visitor", icon: "🔁", title: "リピーター攻略ガイド", sub: "穴場・マニアック情報" },
              { href: "/dpa", icon: "🎫", title: "DPA攻略ガイド", sub: "どれから買う？売り切れ時間" },
              { href: "/faq", icon: "❓", title: "よくある質問（FAQ）", sub: "待ち時間・DPA・チケット" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:border-gray-400 transition-colors">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5 truncate">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 季節イベント */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-3">季節イベント混雑予想</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/gw2026" className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-400 rounded-2xl p-3 shadow-sm hover:opacity-90 transition-opacity">
              <span className="text-xl shrink-0">🎌</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">GW2026</p>
                <p className="text-xs text-rose-100 leading-tight mt-0.5">4/29〜5/6</p>
              </div>
            </Link>
            <Link href="/summer2026" className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl p-3 shadow-sm hover:opacity-90 transition-opacity">
              <span className="text-xl shrink-0">☀️</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">夏休み2026</p>
                <p className="text-xs text-yellow-100 leading-tight mt-0.5">7〜8月</p>
              </div>
            </Link>
            <Link href="/halloween2026" className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl p-3 shadow-sm hover:opacity-90 transition-opacity">
              <span className="text-xl shrink-0">🎃</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">ハロウィーン2026</p>
                <p className="text-xs text-orange-100 leading-tight mt-0.5">9〜10月</p>
              </div>
            </Link>
            <Link href="/christmas2026" className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-green-600 rounded-2xl p-3 shadow-sm hover:opacity-90 transition-opacity">
              <span className="text-xl shrink-0">🎄</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">クリスマス2026</p>
                <p className="text-xs text-red-100 leading-tight mt-0.5">11〜12月</p>
              </div>
            </Link>
          </div>
        </div>

      </div>

      {/* シェア・ブックマーク促進 */}
      <section className="max-w-4xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-900">このサイトをお気に入り登録</p>
            <p className="text-xs text-gray-500 mt-0.5">次回の来園前にすぐ確認できます</p>
          </div>
          <ShareBar />
        </div>
      </section>

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
