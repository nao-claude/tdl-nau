import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = {
  title: "子連れディズニー完全ガイド 2026 | 年齢別プラン・身長制限まとめ | TDLなう",
  description:
    "子どもを連れてディズニーランド・シーへ行く方向けの完全ガイド。年齢別おすすめアトラクション・身長制限まとめ・赤ちゃん連れの注意点・ライダースイッチの使い方まで詳しく解説。",
  alternates: { canonical: "https://disneynow.tokyo/guide/family-disney" },
};

const AGE_PLANS = [
  {
    age: "0〜2歳（ベビー）",
    color: "bg-pink-50 border-pink-200",
    titleColor: "text-pink-700",
    imageId: "661",
    imageAlt: "プーさんのハニーハント",
    points: [
      "身長制限なしのアトラクションのみ乗車可能。ほとんどのアトラクションに制限なし",
      "長時間の移動・待ちで疲れやすいため、午前中に乗れるものに乗り、昼寝時間を確保するのが理想",
      "ベビーカー持ち込み可。ベビーカーレンタル（有料）もあり",
      "おむつ替え台・授乳室はワールドバザール内のベビーセンターが便利",
      "食物アレルギーがある場合は事前にレストランへ連絡を",
    ],
    recommended: ["イッツ・ア・スモールワールド", "プーさんのハニーハント", "ホーンテッドマンション（暗さは注意）", "シンデレラのフェアリーテイル・ホール"],
  },
  {
    age: "3〜5歳（幼児）",
    color: "bg-orange-50 border-orange-200",
    titleColor: "text-orange-700",
    imageId: "521",
    imageAlt: "ピーター・パン空の旅",
    points: [
      "キャラクターに強く反応し始める年齢。グリーティングを積極的に計画に入れる",
      "身長制限（90〜102cm程度）を事前に確認。測定しておくと当日スムーズ",
      "ファンタジーランドのアトラクションが特に人気。迷子対策を事前に話し合っておく",
      "昼寝の習慣がある子は、ロッカーに荷物を預けてベビーカーで昼寝させるルートも有効",
      "パレードは子どもの目線で見える前列を早めに確保",
    ],
    recommended: ["プーさんのハニーハント", "ピーター・パン空の旅", "ダンボのフライングエレファント", "バズ・ライトイヤーのアストロブラスター"],
  },
  {
    age: "6〜9歳（小学生低学年）",
    color: "bg-yellow-50 border-yellow-200",
    titleColor: "text-yellow-700",
    imageId: "1047",
    imageAlt: "ベイマックスのハッピーライド",
    points: [
      "身長102cm前後に達している子が多く、選択肢が広がる",
      "スプラッシュ・マウンテン（90cm〜）はこの年代で初体験する子が多い",
      "疲れにくく1日中動けるため、スケジュールを詰め込みすぎないよう注意",
      "ショー・パレードへの興味が高まる年代。エンターテイメントも計画に組み込む",
      "自分でアプリを操作したがる子もいるため、事前に使い方を教えておく",
    ],
    recommended: ["ビッグサンダー・マウンテン（102cm〜）", "スプラッシュ・マウンテン（90cm〜）", "バズ・ライトイヤーのアストロブラスター", "スター・ツアーズ"],
  },
  {
    age: "10歳以上（小学生高学年〜）",
    color: "bg-green-50 border-green-200",
    titleColor: "text-green-700",
    imageId: "1054",
    imageAlt: "美女と野獣",
    points: [
      "スペース・マウンテン（102cm〜）など、ほぼすべてのアトラクションに乗れる",
      "DPAの仕組みを一緒に計画する良い機会。子どもに「どれに乗りたいか」を選ばせる",
      "ショー・パレードよりアトラクションを優先したがる傾向に。事前に家族でプランを話し合う",
      "体力があるため1日中歩けるが、食事・水分補給はしっかり計画を",
      "グループ行動の意識が芽生える年代。迷子対策として集合場所を決めておく",
    ],
    recommended: ["スペース・マウンテン", "ビッグサンダー・マウンテン", "スプラッシュ・マウンテン", "ハイパースペース・マウンテン"],
  },
];

export default function FamilyDisneyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>子連れディズニー完全ガイド</span>
        </nav>

        {/* ヒーロー画像 */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 180 }}>
          <Image
            src="https://media1.tokyodisneyresort.jp/images/adventure/attraction/661_thum_name.jpg"
            alt="プーさんのハニーハント"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-xl font-bold text-white leading-tight">子連れディズニー完全ガイド 2026</h1>
            <p className="text-xs text-white/80 mt-1">年齢別おすすめプラン・身長制限まとめ・ライダースイッチまで詳しく解説</p>
          </div>
        </div>

        {/* 年齢別プラン */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">年齢別おすすめプラン</h2>
          <div className="space-y-4">
            {AGE_PLANS.map((plan) => (
              <div key={plan.age} className={`rounded-2xl border p-5 ${plan.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative rounded-xl overflow-hidden shrink-0" style={{ width: 64, height: 64 }}>
                    <Image
                      src={`https://media1.tokyodisneyresort.jp/images/adventure/attraction/${plan.imageId}_thum_name.jpg`}
                      alt={plan.imageAlt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className={`text-base font-bold ${plan.titleColor}`}>{plan.age}</h3>
                </div>
                <ul className="space-y-1.5 mb-3">
                  {plan.points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-0.5 shrink-0">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white/60 rounded-xl p-3">
                  <p className="text-xs font-bold text-gray-600 mb-1">おすすめアトラクション</p>
                  <p className="text-xs text-gray-600">{plan.recommended.join("　/　")}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 身長制限まとめ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">身長制限まとめ（ランド）</h2>
          <p className="text-sm text-gray-600 mb-3">当日に子どもが乗れないと泣いてしまうことも。事前に身長を測って確認しておきましょう。</p>
          <div className="space-y-2">
            {[
              { cm: "制限なし", attractions: "美女と野獣、プーさんのハニーハント、ピーター・パン、イッツ・ア・スモールワールド など" },
              { cm: "90cm以上", attractions: "スプラッシュ・マウンテン" },
              { cm: "102cm以上", attractions: "ビッグサンダー・マウンテン、スペース・マウンテン、ベイマックスのハッピーライド（一部）" },
              { cm: "117cm以上", attractions: "スター・ウォーズ：ハイパースペース・マウンテン" },
            ].map((row, i) => (
              <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="shrink-0 w-20 text-xs font-bold text-blue-700 bg-blue-100 rounded-lg px-2 py-1 text-center leading-tight flex items-center justify-center">{row.cm}</span>
                <p className="text-xs text-gray-700 flex items-center">{row.attractions}</p>
              </div>
            ))}
          </div>
          <Link href="/attractions/tdl" className="mt-4 flex items-center justify-between bg-gray-900 rounded-xl p-3 hover:bg-gray-700 transition-colors">
            <p className="text-sm font-bold text-white">アトラクション別の詳細を見る</p>
            <span className="text-white">›</span>
          </Link>
        </section>

        {/* ライダースイッチ */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">ライダースイッチ（交代乗車）とは</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            身長制限などで子どもが乗れないアトラクションでも、大人が交代で乗れる「ライダースイッチ」制度があります。
          </p>
          <div className="space-y-2 text-sm">
            {[
              { step: "1", desc: "アトラクション入口のキャストに「ライダースイッチを利用したい」と伝える" },
              { step: "2", desc: "1人目が通常の列に並んで乗車する（待ち時間は通常通り）" },
              { step: "3", desc: "1人目が乗り終わると、2人目はほぼ待ち時間なしで乗車できる専用レーンを案内してもらえる" },
            ].map((row) => (
              <div key={row.step} className="flex gap-3 bg-white rounded-xl p-3">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{row.step}</span>
                <p className="text-xs text-gray-700 flex items-center">{row.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">※ライダースイッチはDPAとは別のサービスです。詳しくはキャストへお問い合わせください。</p>
        </section>

        {/* ベビーセンター情報 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">ベビー・小さな子ども向け設備</h2>
          <div className="space-y-3">
            {[
              { icon: "🍼", title: "ベビーセンター（授乳室・おむつ替え台）", body: "ワールドバザール奥に「ベビーセンター」があります。授乳室、おむつ替えスペース、電子レンジ（離乳食の温め）が利用可能です。" },
              { icon: "🛁", title: "おむつ・ミルクの販売", body: "ベビーセンター内でおむつや粉ミルクなど子ども用品を購入できます。忘れた場合も安心。" },
              { icon: "🚗", title: "ベビーカーレンタル", body: "入園後にワールドバザール内でベビーカーを有料でレンタルできます（数に限りあり）。" },
              { icon: "🌡️", title: "救護センター", body: "体調不良・怪我の際はパーク内の救護センターへ。場所は公式アプリのマップで確認できます。" },
            ].map((row, i) => (
              <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-xl shrink-0">{row.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{row.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* よくある質問 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">子連れ向けよくある質問</h2>
          <div className="space-y-3">
            {[
              { q: "雨の日に子連れで行っても大丈夫？", a: "雨天でも屋内アトラクションは通常通り運営されます。屋内が多いランドは雨の日でも十分楽しめます。ただし屋外パレードは中止になることがあります。" },
              { q: "子どもがグリーティングしたいと言っています。どうすれば？", a: "公式アプリでグリーティング場所・時間を確認できます。人気キャラクターは行列ができることもあるため、午前中の早い時間を狙うのが効果的です。" },
              { q: "迷子になった場合はどうすればいい？", a: "パーク内の「キャスト」（スタッフ）に声をかければサポートしてもらえます。事前に子どもと「迷子になったらシンデレラ城前で待ち合わせ」などのルールを決めておくと安心です。" },
              { q: "子どもが疲れてしまった場合は？", a: "パーク内には休憩できるベンチが多くあります。ベビーカーで昼寝させながら大人が代わりにアトラクションに乗るライダースイッチの活用もおすすめです。" },
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
          <Link href="/attractions/tdl" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
            <p className="text-sm font-bold text-white">アトラクションガイドで身長制限を確認</p>
            <span className="text-white">›</span>
          </Link>
          <Link href="/guide/first-time-tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">初めてのディズニーランド完全攻略ガイド</p>
              <p className="text-xs text-gray-500">チケット・持ち物・当日の動き方</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link href="/dpa" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">DPA攻略ガイド</p>
              <p className="text-xs text-gray-500">子連れの予算別DPA戦略</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。<br />
          最新・正確な情報は公式サイトでご確認ください。
        </p>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1"><Link href="/privacy" className="underline">プライバシーポリシー</Link></p>
      </footer>

      <Script id="family-disney-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "子連れディズニー完全ガイド 2026｜年齢別プラン・身長制限まとめ",
        "description": "子どもを連れてディズニーランド・シーへ行く方向けの完全ガイド。年齢別おすすめアトラクション・身長制限まとめ・ライダースイッチの使い方まで詳しく解説。",
        "url": "https://disneynow.tokyo/guide/family-disney",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-05-01",
        "dateModified": "2026-05-01",
      })}} />
    </main>
  );
}
