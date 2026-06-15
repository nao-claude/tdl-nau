import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = {
  title: "東京ディズニーランド・シー レストラン・グルメ完全ガイド 2026 | TDLなう",
  description:
    "東京ディズニーランド・ディズニーシーの人気レストラン・グルメを完全解説。予約方法・待たずに食べるコツ・おすすめメニュー・スナック攻略・アレルギー対応まで徹底ガイド。",
  alternates: { canonical: "https://disneynow.tokyo/guide/dining" },
};

const TDL_RESTAURANTS = [
  {
    name: "クイーン・オブ・ハートのバンケットホール",
    area: "ファンタジーランド",
    style: "バイキング",
    price: "3,000〜4,000円",
    note: "アリス・イン・ワンダーランドの世界観。大容量のビュッフェ形式で子どもから大人まで人気。混雑日は予約必須。",
    gradient: "from-red-400 to-pink-500",
    icon: "🃏",
  },
  {
    name: "グランマ・サラのキッチン",
    area: "ウエスタンランド",
    style: "カジュアルダイニング",
    price: "2,000〜3,000円",
    note: "南部の家庭料理がテーマ。チキンやミートパイが名物。子連れファミリーに人気で、土日は混雑する。",
    gradient: "from-amber-500 to-orange-500",
    icon: "🍗",
  },
  {
    name: "ブルーバイユー・レストラン",
    area: "アドベンチャーランド",
    style: "レストラン（要予約）",
    price: "5,000〜8,000円",
    note: "カリブの海賊のライド脇に位置する、幻想的な雰囲気のレストラン。ランドで最も人気が高いレストランのひとつ。事前予約が強く推奨される。",
    gradient: "from-blue-500 to-indigo-600",
    icon: "⚓",
  },
  {
    name: "ウォルト・ディズニー・ワールドのカフェ",
    area: "ワールドバザール",
    style: "カフェ",
    price: "1,000〜2,000円",
    note: "軽食・デザート中心。待ち時間が比較的短く、ランチタイムを外した時間帯に立ち寄りやすい。",
    gradient: "from-yellow-400 to-amber-400",
    icon: "☕",
  },
];

const TDS_RESTAURANTS = [
  {
    name: "マゼランズ",
    area: "ミステリアスアイランド",
    style: "レストラン（要予約）",
    price: "5,000〜9,000円",
    note: "ジュール・ヴェルヌの世界観を再現した高級レストラン。記念日・誕生日に最適。事前予約が必須。",
    gradient: "from-slate-600 to-gray-800",
    icon: "🧭",
  },
  {
    name: "ヴォルケイニア・レストラン",
    area: "ミステリアスアイランド",
    style: "カジュアルダイニング",
    price: "2,000〜3,000円",
    note: "火山島をイメージした個性的な空間。インド・アジア料理がテーマで独自の世界観が魅力。子どもにも人気。",
    gradient: "from-orange-500 to-red-600",
    icon: "🌋",
  },
  {
    name: "リストランテ・ディ・カナレット",
    area: "メディテレーニアンハーバー",
    style: "イタリアンレストラン",
    price: "3,000〜5,000円",
    note: "ハーバーを眺めながら食事ができるイタリアンレストラン。パスタ・リゾットが人気。テラス席は眺めが良く人気が高い。",
    gradient: "from-teal-500 to-cyan-600",
    icon: "🍝",
  },
  {
    name: "セバスチャンのカリプソキッチン",
    area: "マーメイドラグーン",
    style: "カジュアルダイニング",
    price: "1,500〜2,500円",
    note: "リトル・マーメイドの世界観で子ども向けメニューが充実。ファミリー層に人気で、混雑日はやや待つことも。",
    gradient: "from-purple-500 to-violet-600",
    icon: "🦀",
  },
];

const SNACKS = [
  { name: "ポップコーン", desc: "エリア別に異なるフレーバーが楽しめる。バケットを購入すると追加購入時に割引あり。定番はキャラメル・カレーなど。", icon: "🍿", color: "bg-yellow-50 border-yellow-200" },
  { name: "チュロス", desc: "エリアごとに異なるフレーバーが時期によって変わる限定品も。並ばずサクッと食べられるのが魅力。", icon: "🥐", color: "bg-amber-50 border-amber-200" },
  { name: "スモークターキーレッグ", desc: "ウエスタンランドの定番スナック。豪快な骨付き肉で食べ応え満点。テーマパークの醍醐味を味わえる。", icon: "🍗", color: "bg-orange-50 border-orange-200" },
  { name: "ミッキーワッフル・シュガービート", desc: "ミッキーの形のワッフルはインスタ映えする人気商品。甘さ控えめで子どもに人気。", icon: "🧇", color: "bg-pink-50 border-pink-200" },
  { name: "クラムチャウダー（TDS）", desc: "アメリカンウォーターフロントのクラムチャウダーはシーの名物。パンボウルに入ったスタイルが定番で寒い季節に特に人気。", icon: "🍲", color: "bg-blue-50 border-blue-200" },
];

export default function DiningGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>レストラン・グルメガイド</span>
        </nav>

        {/* ヒーロー */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 180 }}>
          <Image
            src="https://media1.tokyodisneyresort.jp/images/adventure/attraction/1005_thum_name.jpg"
            alt="ディズニーシー ソアリン"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-xl font-bold text-white leading-tight">レストラン・グルメ完全ガイド 2026</h1>
            <p className="text-xs text-white/80 mt-1">人気レストラン・予約方法・待たずに食べるコツ・スナック攻略</p>
          </div>
        </div>

        {/* 食事のタイミング攻略 */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">混まずに食べるための時間帯攻略</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            パーク内のレストランは<strong>12〜13時が最も混雑</strong>します。時間帯を少しずらすだけで待ち時間を大幅に短縮できます。
          </p>
          <div className="space-y-2">
            {[
              { time: "11時台（最推奨）", icon: "✅", color: "bg-green-100 text-green-800", body: "昼食の混雑前に食べる。座席も余裕があり、ゆっくり食事できる。食後は人気アトラクションへ向かうのが効率的。" },
              { time: "12〜13時（要注意）", icon: "⚠️", color: "bg-red-100 text-red-800", body: "最も混雑するピーク時間帯。レストランで30〜60分以上待つことも。アトラクションに集中するほうが1日を有効に使える。" },
              { time: "14〜15時（穴場）", icon: "✅", color: "bg-green-100 text-green-800", body: "昼食のピークが過ぎた後の穴場時間。人気レストランでもすぐ入れることが多い。おやつ感覚でスナックとの組み合わせも◎。" },
              { time: "18時以降（夕食）", icon: "🌙", color: "bg-blue-100 text-blue-800", body: "夕食タイムは再び混雑するが、予約レストランなら快適。夜の雰囲気で食事するのが記念日・デートに最適。" },
            ].map((row, i) => (
              <div key={i} className={`rounded-xl p-3 flex gap-2 ${row.color}`}>
                <span className="shrink-0">{row.icon}</span>
                <div>
                  <p className="font-bold text-sm mb-0.5">{row.time}</p>
                  <p className="text-xs">{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 予約方法 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">レストラン予約の方法</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            人気レストラン（ブルーバイユー・マゼランズなど）は<strong>事前予約が必須</strong>です。予約なしで当日訪れると長時間待つか、入れないことも。
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "東京ディズニーリゾート公式サイトで予約", body: "訪問の1〜2ヶ月前から予約受付開始。人気レストランは数分で満席になることも。早めの予約が必須。" },
              { step: "2", title: "公式アプリから当日空席を確認", body: "当日分の空き席がある場合もあります。入園後にアプリで「レストラン」→「予約なし空席確認」でチェック。" },
              { step: "3", title: "プライオリティシーティング（優先案内）の利用", body: "一部レストランでは「プライオリティシーティング」を利用できます。席を確保するものではなく、来店時に優先して案内してもらえるサービスです。" },
            ].map((row) => (
              <div key={row.step} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{row.step}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{row.title}</p>
                  <p className="text-xs text-gray-600">{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TDL人気レストラン */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">東京ディズニーランド 人気レストラン</h2>
          <div className="space-y-3">
            {TDL_RESTAURANTS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* カラーバナー */}
                <div className={`bg-gradient-to-r ${r.gradient} px-4 py-3 flex items-center gap-3`}>
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-white truncate">{r.name}</p>
                    <p className="text-xs text-white/80">{r.area}</p>
                  </div>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">{r.style}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-gray-700">💰 {r.price}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TDS人気レストラン */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">東京ディズニーシー 人気レストラン</h2>
          <div className="space-y-3">
            {TDS_RESTAURANTS.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* カラーバナー */}
                <div className={`bg-gradient-to-r ${r.gradient} px-4 py-3 flex items-center gap-3`}>
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-white truncate">{r.name}</p>
                    <p className="text-xs text-white/80">{r.area}</p>
                  </div>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">{r.style}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-gray-700">💰 {r.price}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* スナック・テイクアウト攻略 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">スナック・テイクアウト攻略</h2>
          <p className="text-sm text-gray-600 mb-3">
            アトラクションの待ち時間を節約するなら、歩きながら食べられるスナックの活用がおすすめです。
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SNACKS.map((s) => (
              <div key={s.name} className={`flex flex-col items-center text-center p-3 rounded-xl border ${s.color}`}>
                <span className="text-3xl mb-1">{s.icon}</span>
                <p className="text-xs font-bold text-gray-800 mb-1">{s.name}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* アレルギー対応 */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">食物アレルギーへの対応</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            東京ディズニーリゾートは食物アレルギーへの対応に積極的に取り組んでいます。
          </p>
          <div className="space-y-2 text-sm">
            {[
              { title: "レストランでの対応", body: "グルテンフリー・乳製品フリーなどの特定アレルギー対応メニューを用意しているレストランがあります。予約時または入店時にキャストへ申告してください。" },
              { title: "アレルギーブックの活用", body: "パーク内の各レストランには食物アレルギー対応の「アレルギーブック」が用意されており、どのメニューに何が含まれるか確認できます。" },
              { title: "外部からの持ち込み", body: "アレルギー対応が必要な場合、外部からの飲食物の持ち込みが認められる場合があります。事前にゲストサービスへご相談ください。" },
            ].map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-3">
                <p className="font-bold text-blue-800 mb-1">{row.title}</p>
                <p className="text-xs text-gray-700">{row.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* よくある質問 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">グルメ・食事に関するよくある質問</h2>
          <div className="space-y-3">
            {[
              { q: "外部からの飲食物の持ち込みはできますか？", a: "原則として禁止されています。ただし、乳幼児の離乳食・アレルギー対応食品など特別な事情がある場合はゲストサービスにご相談ください。" },
              { q: "パーク内の食事代の目安はどのくらいですか？", a: "スナック類は300〜800円程度、クイックサービス（軽食・フードコート）は1,000〜2,500円程度、レストランは2,000〜8,000円程度が目安です。1人1日の食費は3,000〜5,000円が現実的なラインです。" },
              { q: "子ども向けメニューはありますか？", a: "多くのレストランでお子様メニューが用意されています。量が少なめで価格も安く、ミッキー型のハンバーグなどかわいいメニューも。公式アプリでメニューを事前確認できます。" },
              { q: "ポップコーンのバケットは持ち込めますか？", a: "前回購入したポップコーンバケットを持参すると、追加購入時に割引価格でポップコーンを入れてもらえます。バケットの持ち込みは可能です。" },
            ].map((item, i) => (
              <details key={i} className="border border-gray-200 rounded-xl overflow-hidden group">
                <summary className="flex items-start gap-3 px-4 py-3 cursor-pointer list-none hover:bg-gray-50">
                  <span className="text-blue-500 font-bold text-sm shrink-0 mt-0.5">Q</span>
                  <span className="text-sm font-medium text-gray-900 flex-1">{item.q}</span>
                  <span className="text-gray-400 text-xs mt-0.5 shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-3 pt-0 flex gap-3">
                  <span className="text-green-600 font-bold text-sm shrink-0">A</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
            <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
            <span className="text-white">›</span>
          </Link>
          <Link href="/guide/first-time-tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">初めてのディズニーランド完全攻略ガイド</p>
              <p className="text-xs text-gray-500">入園から閉園まで完全解説</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link href="/guide/family-disney" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">子連れディズニー完全ガイド</p>
              <p className="text-xs text-gray-500">年齢別プラン・身長制限まとめ</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。<br />
          メニュー・価格・サービスは変更になる場合があります。最新情報は公式サイトでご確認ください。
        </p>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1"><Link href="/privacy" className="underline">プライバシーポリシー</Link></p>
      </footer>

      <Script id="dining-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "東京ディズニーランド・シー レストラン・グルメ完全ガイド 2026",
        "description": "東京ディズニーランド・シーの人気レストラン・グルメを完全解説。予約方法・待たずに食べるコツ・おすすめメニュー・スナック攻略・アレルギー対応まで徹底ガイド。",
        "url": "https://disneynow.tokyo/guide/dining",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-05-01",
        "dateModified": "2026-05-01",
      })}} />
    </main>
  );
}
