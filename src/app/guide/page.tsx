import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";

export const metadata: Metadata = {
  title: "ディズニー攻略記事一覧 | TDLなう",
  description:
    "東京ディズニーランド・ディズニーシーの攻略記事まとめ。初心者ガイド・子連れプラン・費用節約・雨の日攻略・カップルデートプランなど全記事を掲載。",
  alternates: { canonical: "https://disneynow.tokyo/guide" },
};

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

const ALL_ARTICLES = [
  {
    href: "/guide/hotel",
    imageId: 1117,
    imageAlt: "東京ディズニーリゾート周辺ホテル",
    category: "ホテル",
    categoryColor: "bg-red-100 text-red-700",
    title: "ディズニー近隣ホテル完全ガイド 2026【楽天・じゃらん比較】",
    desc: "オフィシャルホテル全6軒を徹底比較。シャトルバス・早朝入園特典・料金相場・格安ホテルの探し方まで解説。",
    date: "2026.06.15",
  },
  {
    href: "/guide/couple",
    imageId: 1117,
    imageAlt: "ラプンツェルのランタンフェスティバル",
    category: "デート",
    categoryColor: "bg-pink-100 text-pink-700",
    title: "カップル・デート攻略ガイド 2026",
    desc: "フォトスポット・ディナー予約・プロポーズ情報まで完全網羅。TDSをカップルで最大限楽しむ方法。",
    date: "2026.06.08",
  },
  {
    href: "/guide/repeat-visitor",
    imageId: 631,
    imageAlt: "センター・オブ・ジ・アース",
    category: "上級者向け",
    categoryColor: "bg-indigo-100 text-indigo-700",
    title: "リピーター・2回目以降の攻略ガイド",
    desc: "穴場スポット・空いている時間帯・アトラクションの隠れた見どころなど、リピーターだけが知るテクニック集。",
    date: "2026.06.08",
  },
  {
    href: "/guide/budget",
    imageId: 1005,
    imageAlt: "ソアリン：ファンタスティック・フライト",
    category: "節約",
    categoryColor: "bg-green-100 text-green-700",
    title: "ディズニー費用・節約完全ガイド 2026",
    desc: "1日の費用内訳（チケット・DPA・食費・グッズ）と節約テク7選。予算シミュレーション付き。",
    date: "2026.06.07",
  },
  {
    href: "/guide/rainy-day",
    imageId: 611,
    imageAlt: "ホーンテッドマンション",
    category: "天気対策",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "雨の日のディズニー完全攻略",
    desc: "実は雨の日は待ち時間が短くて狙い目。屋内アトラクション一覧・雨具の選び方・雨の日限定プラン。",
    date: "2026.06.07",
  },
  {
    href: "/guide/packing-list",
    imageId: 1054,
    imageAlt: "美女と野獣「魔法のものがたり」",
    category: "準備",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "ディズニー持ち物リスト完全版 2026",
    desc: "必須アイテムから季節別・子連れ追加グッズまで。前日チェックリスト付きで忘れ物ゼロを目指す。",
    date: "2026.06.07",
  },
  {
    href: "/guide/first-time-tdl",
    imageId: 1047,
    imageAlt: "ベイマックスのハッピーライド",
    category: "初心者",
    categoryColor: "bg-yellow-100 text-yellow-700",
    title: "初めてのディズニーランド完全攻略ガイド 2026",
    desc: "チケット購入から当日の動き方・DPA戦略まで、初心者が知りたい情報を網羅。",
    date: "2026.05.01",
  },
  {
    href: "/guide/family-disney",
    imageId: 661,
    imageAlt: "プーさんのハニーハント",
    category: "子連れ",
    categoryColor: "bg-lime-100 text-lime-700",
    title: "子連れディズニー完全ガイド",
    desc: "年齢別プラン・身長制限・ベビーカー情報など、子連れファミリーが知っておきたい全情報。",
    date: "2026.04.15",
  },
  {
    href: "/guide/anniversary",
    imageId: 1054,
    imageAlt: "美女と野獣「魔法のものがたり」",
    category: "記念日",
    categoryColor: "bg-rose-100 text-rose-700",
    title: "誕生日・記念日特典の完全活用ガイド",
    desc: "バースデーシール・記念日の特別演出・キャストに声をかけてもらうコツを徹底解説。",
    date: "2026.04.10",
  },
  {
    href: "/guide/dining",
    imageId: 1005,
    imageAlt: "ソアリン",
    category: "グルメ",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "ディズニー レストラン・グルメ攻略",
    desc: "予約方法・穴場の時間帯・おすすめメニューをTDL/TDS別に解説。",
    date: "2026.04.05",
  },
  {
    href: "/dpa",
    imageId: 1110,
    imageAlt: "アナとエルサのフローズンジャーニー",
    category: "DPA",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "DPA（ディズニー・プレミアアクセス）攻略ガイド 2026",
    desc: "どれから買うべきか・売り切れる時間帯・予算別おすすめ戦略を完全解説。",
    date: "2026.03.29",
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>攻略記事一覧</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">ディズニー攻略記事一覧</h1>
        <p className="text-sm text-gray-500 mb-6">TDL・TDSをもっと楽しむための攻略情報まとめ</p>

        {/* 記事グリッド */}
        <div className="grid grid-cols-1 gap-4">
          {ALL_ARTICLES.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:border-gray-400 transition-colors"
            >
              {/* サムネイル */}
              <div className="relative shrink-0" style={{ width: 120, height: 90 }}>
                <Image
                  src={`${CDN}/${article.imageId}_thum_name.jpg`}
                  alt={article.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              {/* テキスト */}
              <div className="flex-1 py-3 pr-3 min-w-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${article.categoryColor}`}>
                  {article.category}
                </span>
                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug line-clamp-2">
                  {article.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                  {article.desc}
                </p>
                <p className="text-xs text-gray-400 mt-1.5">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 待ち時間へ */}
        <div className="mt-8">
          <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
            <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
            <span className="text-white">›</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AmazonBanner keyword="ディズニー 攻略 グッズ" label="Amazonでディズニーグッズを探す" />
      </div>
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1 flex items-center justify-center gap-3">
          <Link href="/privacy" className="underline">プライバシーポリシー</Link>
          <span>·</span>
          <Link href="/about" className="underline">このサイトについて</Link>
        </p>
      </footer>
    </main>
  );
}
