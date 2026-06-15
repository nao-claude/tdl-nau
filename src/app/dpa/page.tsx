import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "DPA（ディズニー・プレミアアクセス）攻略ガイド 2026 | TDLなう",
  description: "東京ディズニーランド・シーのDPA完全攻略。どれから買うべきか、売り切れる時間帯、予算別おすすめ、当日の購入タイミングを徹底解説。",
  alternates: { canonical: "https://disneynow.tokyo/dpa" },
};

const TDL_DPA = [
  {
    rank: 1,
    name: "美女と野獣「魔法のものがたり」",
    price: 2000,
    soldOutTime: "開園後30〜60分",
    waitPeak: "90〜180分",
    priority: "最優先",
    priorityColor: "bg-red-100 text-red-700",
    tip: "ディズニーランドで最も人気のアトラクション。開園と同時に売り切れることも。入園後すぐに購入すること。",
  },
  {
    rank: 2,
    name: "ベイマックスのハッピーライド",
    price: 1500,
    soldOutTime: "開園後1〜2時間",
    waitPeak: "60〜120分",
    priority: "高",
    priorityColor: "bg-orange-100 text-orange-700",
    tip: "混雑日は午前中に売り切れる。美女と野獣を購入後すぐに確保したい。",
  },
  {
    rank: 3,
    name: "プーさんのハニーハント",
    price: 1500,
    soldOutTime: "開園後2〜4時間",
    waitPeak: "60〜90分",
    priority: "中",
    priorityColor: "bg-yellow-100 text-yellow-700",
    tip: "子連れファミリーに大人気。午前中のうちに購入しておくと安心。40周年プライオリティパス（無料）の対象でもある。",
  },
  {
    rank: 4,
    name: "スプラッシュ・マウンテン",
    price: 1500,
    soldOutTime: "開園後3〜5時間",
    waitPeak: "60〜90分",
    priority: "中",
    priorityColor: "bg-yellow-100 text-yellow-700",
    tip: "夏季は特に需要が高い。他の優先アトラクションを押さえた後に検討。",
  },
];

const TDS_DPA = [
  {
    rank: 1,
    name: "アナとエルサのフローズンジャーニー",
    price: 2000,
    soldOutTime: "開園後15〜30分",
    waitPeak: "120〜200分",
    priority: "最優先",
    priorityColor: "bg-red-100 text-red-700",
    tip: "TDS最新・最人気アトラクション。開園後即完売も珍しくない。入園したら何より先に購入。",
  },
  {
    rank: 2,
    name: "ラプンツェルのランタンフェスティバル",
    price: 2000,
    soldOutTime: "開園後30〜60分",
    waitPeak: "90〜150分",
    priority: "最優先",
    priorityColor: "bg-red-100 text-red-700",
    tip: "フローズンジャーニーと同じファンタジースプリングスの新アトラクション。同時に狙うのが効率的。",
  },
  {
    rank: 3,
    name: "ピーター・パンのネバーランドアドベンチャー",
    price: 2000,
    soldOutTime: "開園後1〜2時間",
    waitPeak: "90〜150分",
    priority: "高",
    priorityColor: "bg-orange-100 text-orange-700",
    tip: "ファンタジースプリングス3本のうち最後に検討。予算が厳しい場合は上位2本を優先。",
  },
  {
    rank: 4,
    name: "ソアリン：ファンタスティック・フライト",
    price: 1500,
    soldOutTime: "開園後2〜3時間",
    waitPeak: "75〜120分",
    priority: "高",
    priorityColor: "bg-orange-100 text-orange-700",
    tip: "大型スクリーンの空飛ぶ体験。子供から大人まで人気が高い。混雑日は早めに。",
  },
  {
    rank: 5,
    name: "センター・オブ・ジ・アース",
    price: 1500,
    soldOutTime: "開園後3〜5時間",
    waitPeak: "60〜90分",
    priority: "中",
    priorityColor: "bg-yellow-100 text-yellow-700",
    tip: "絶叫系が好きな人向け。夕方以降でも残っていることが多い。",
  },
  {
    rank: 6,
    name: "タワー・オブ・テラー",
    price: 1500,
    soldOutTime: "開園後4〜6時間",
    waitPeak: "60〜90分",
    priority: "低",
    priorityColor: "bg-gray-100 text-gray-600",
    tip: "絶叫系。予算に余裕があれば。夕方でも購入できることが多い。",
  },
  {
    rank: 7,
    name: "トイ・ストーリー・マニア！",
    price: 1500,
    soldOutTime: "開園後4〜6時間",
    waitPeak: "45〜75分",
    priority: "低",
    priorityColor: "bg-gray-100 text-gray-600",
    tip: "ゲーム感覚で楽しめる。比較的遅くまで残る。子供連れには嬉しい選択肢。",
  },
];

export default function DpaGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>DPA攻略ガイド</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">DPA攻略ガイド 2026</h1>
        <p className="text-sm text-gray-500 mb-6">どれから買うべきか・売り切れる時間帯・予算別戦略を解説</p>

        {/* DPAとは */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">DPAとは？</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            <strong>ディズニー・プレミアアクセス（DPA）</strong>は、東京ディズニーリゾート公式アプリから購入できる有料の優先入場サービスです。
            1アトラクションにつき1,500〜2,000円で、長い待ち行列をスキップして乗車できます。
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-gray-700 mb-1">購入方法</p>
              <p className="text-gray-600">東京ディズニーリゾート公式アプリ → 「購入」→「ディズニー・プレミアアクセス」</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-gray-700 mb-1">購入できる場所</p>
              <p className="text-gray-600">入園後、パーク内であればいつでも購入可能（在庫がある限り）</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-gray-700 mb-1">同時購入の制限</p>
              <p className="text-gray-600">1人1回につき1アトラクションのみ購入可能（使用後に次を購入）</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-gray-700 mb-1">有効期限</p>
              <p className="text-gray-600">購入当日のみ有効。当日購入・当日使用が基本</p>
            </div>
          </div>
        </section>

        {/* 当日の黄金ルール */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">⚡ 当日の黄金ルール</h2>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <p><strong>入園したらすぐに最優先DPAを購入</strong>する。アトラクションに向かう前にアプリを開くこと。</p>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <p><strong>1枚使い終わったら次をすぐ購入</strong>する。時間を置かずに連続購入するのが効率的。</p>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <p><strong>予算は1人3,000〜6,000円を想定</strong>する。2〜3枚購入が現実的なラインで満足度が高い。</p>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <p><strong>閑散日（平日A〜B判定）</strong>は待ち時間が短いためDPAを買わなくても十分楽しめる場合がある。</p>
            </li>
          </ol>
        </section>

        {/* TDL DPA一覧 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">🏰 東京ディズニーランド DPA優先順位</h2>
          <p className="text-xs text-gray-500 mb-4">混雑日（C判定以上）の目安です</p>
          <div className="space-y-3">
            {TDL_DPA.map((item) => (
              <div key={item.rank} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.rank}
                    </span>
                    <span className="font-bold text-sm text-gray-900">{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${item.priorityColor}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-400">料金</p>
                    <p className="font-bold text-gray-700">{item.price.toLocaleString()}円</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-400">売り切れ目安</p>
                    <p className="font-bold text-red-600">{item.soldOutTime}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-400">通常待ち時間</p>
                    <p className="font-bold text-orange-600">{item.waitPeak}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TDS DPA一覧 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">⛵ 東京ディズニーシー DPA優先順位</h2>
          <p className="text-xs text-gray-500 mb-4">混雑日（C判定以上）の目安です</p>
          <div className="space-y-3">
            {TDS_DPA.map((item) => (
              <div key={item.rank} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.rank}
                    </span>
                    <span className="font-bold text-sm text-gray-900">{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${item.priorityColor}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-400">料金</p>
                    <p className="font-bold text-gray-700">{item.price.toLocaleString()}円</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-400">売り切れ目安</p>
                    <p className="font-bold text-red-600">{item.soldOutTime}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-gray-400">通常待ち時間</p>
                    <p className="font-bold text-orange-600">{item.waitPeak}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 予算別おすすめ */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">💰 予算別おすすめ戦略</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <p className="font-bold text-gray-800 mb-2">1人あたり2,000円（1枚）</p>
              <p className="text-sm text-gray-600">
                ランド：<span className="font-semibold">美女と野獣</span>一択。<br />
                シー：<span className="font-semibold">アナとエルサ</span>一択。最も待ち時間が長いアトラクションに集中投資。
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <p className="font-bold text-gray-800 mb-2">1人あたり3,500〜4,000円（2枚）</p>
              <p className="text-sm text-gray-600">
                ランド：<span className="font-semibold">美女と野獣＋ベイマックス</span><br />
                シー：<span className="font-semibold">アナとエルサ＋ラプンツェル</span>。ファンタジースプリングス2本を制覇するのが最高効率。
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <p className="font-bold text-gray-800 mb-2">1人あたり6,000円（3枚以上）</p>
              <p className="text-sm text-gray-600">
                ランド：<span className="font-semibold">美女と野獣＋ベイマックス＋プーさん</span><br />
                シー：<span className="font-semibold">アナとエルサ＋ラプンツェル＋ピーターパン</span>。ファンタジースプリングス全制覇で最充実の1日に。
              </p>
            </div>
          </div>
        </section>

        {/* 時間帯別アドバイス */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">⏰ 時間帯別 DPA購入アドバイス</h2>
          <div className="space-y-2">
            {[
              { time: "開園〜30分", label: "最重要タイム", color: "border-red-300 bg-red-50", advice: "入園直後が最重要。スマホを開いてすぐ最優先DPAを購入。乗り場に向かうのは購入後。" },
              { time: "開園30分〜2時間", label: "第2波", color: "border-orange-300 bg-orange-50", advice: "最優先が売り切れていたら次の優先度のものを購入。空きがあればまだ十分間に合う。" },
              { time: "昼前後（11〜13時）", label: "注意時間", color: "border-yellow-300 bg-yellow-50", advice: "混雑のピーク。人気アトラクションのDPAは残り僅かまたは売り切れの可能性が高い。" },
              { time: "14〜17時", label: "チャンスタイム", label2: "夕方", color: "border-green-300 bg-green-50", advice: "昼過ぎに人が帰り始めると補充・空きが出ることも。待ち時間も短くなるため、あえてこの時間に乗るのも手。" },
              { time: "閉園3時間前〜", label: "売り切れ後の動き", color: "border-blue-300 bg-blue-50", advice: "DPAが全て売り切れていても、待ち時間が短くなる夕方〜夜に並ぶことで十分楽しめる。" },
            ].map((row, i) => (
              <div key={i} className={`rounded-xl border p-3 ${row.color}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-gray-500">{row.time}</span>
                  <span className="text-xs font-bold text-gray-700">{row.label}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{row.advice}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ホテルアフィリエイト */}
        <section className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <p className="text-sm font-bold text-gray-800 mb-1">🏨 舞浜・浦安エリアのホテルを探す</p>
          <p className="text-xs text-gray-500 mb-3">パーク近くに宿泊すると開園ダッシュが有利！早めの予約がおすすめです。</p>
          <div className="flex gap-2">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4AZLSM+5N0U2A+14CS+64RJ5&a8ejpredirect=https%3A%2F%2Fwww.jalan.net%2Fuw%2Fuwp2011%2Fuww2011init.do%3Fkeyword%3D%2595%2591%2595%256C%26distCd%3D06%26rootCd%3D7701%26adultNum%3D2%26roomNum%3D1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-bold py-3 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            >
              じゃらんで探す
            </a>
            <a
              href="https://hb.afl.rakuten.co.jp/hgc/522dc3a1.a8f621bb.522dc3a2.b6743386/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2Fhotel%2Fsearch%2F%3Ff_area%3D040602%26f_otona_su%3D2%26f_heya_su%3D1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-bold py-3 px-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              楽天トラベルで探す
            </a>
          </div>
        </section>

        {/* リンク */}
        <div className="flex flex-col gap-2">
          <Link href="/attractions/tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">🏰 ランド アトラクションガイド</p>
              <p className="text-xs text-gray-500">身長制限・スリル度・所要時間を確認</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link href="/attractions/tds" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">⛵ シー アトラクションガイド</p>
              <p className="text-xs text-gray-500">身長制限・スリル度・所要時間を確認</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
            <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
            <span className="text-white">›</span>
          </Link>
        </div>

        <AmazonBanner keyword="ディズニー グッズ 人気" label="Amazonでディズニー人気商品を探す" className="mt-4" />
        <p className="text-xs text-gray-400 text-center mt-6">
          ※売り切れ時間・待ち時間はいずれも目安です。混雑度・季節・イベントにより大きく異なります。<br />
          当サイトは東京ディズニーリゾートの非公式サイトです。
        </p>
      </div>

      <Script
        id="dpa-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "DPA（ディズニー・プレミアアクセス）攻略ガイド 2026",
            "description": "東京ディズニーランド・シーのDPA完全攻略。どれから買うべきか、売り切れる時間帯、予算別おすすめを徹底解説。",
            "url": "https://disneynow.tokyo/dpa",
            "publisher": {
              "@type": "Organization",
              "name": "TDLなう",
              "url": "https://disneynow.tokyo",
            },
            "datePublished": "2026-03-01",
            "dateModified": "2026-03-29",
          }),
        }}
      />
    </main>
  );
}
