import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ゴールデンウィーク2026 ディズニー混雑予想【GW攻略カレンダー】| TDLなう",
  description:
    "GW2026のディズニー混雑予想カレンダー。東京ディズニーランド・シーの4月29日〜5月6日の日別混雑レベル・空いてる日・攻略ポイントを徹底解説。ゴールデンウィークを快適に楽しむための完全ガイド。",
  alternates: { canonical: "https://disneynow.tokyo/gw2026" },
};

const GW_DAYS = [
  { date: "4/25(土)", label: "GW前週",  grade: "C", holiday: false },
  { date: "4/26(日)", label: "GW前週",  grade: "C", holiday: false },
  { date: "4/27(月)", label: "",         grade: "A", holiday: false },
  { date: "4/28(火)", label: "",         grade: "A", holiday: false },
  { date: "4/29(水)", label: "昭和の日", grade: "E", holiday: true  },
  { date: "4/30(木)", label: "",         grade: "C", holiday: false },
  { date: "5/1(金)",  label: "",         grade: "C", holiday: false },
  { date: "5/2(土)",  label: "",         grade: "E", holiday: false },
  { date: "5/3(日)",  label: "憲法記念日", grade: "F", holiday: true },
  { date: "5/4(月)",  label: "みどりの日", grade: "E", holiday: true },
  { date: "5/5(火)",  label: "こどもの日", grade: "E", holiday: true },
  { date: "5/6(水)",  label: "振替休日※", grade: "E", holiday: true },
  { date: "5/7(木)",  label: "GW明け",  grade: "A", holiday: false },
  { date: "5/8(金)",  label: "GW明け",  grade: "A", holiday: false },
  { date: "5/9(土)",  label: "GW後週",  grade: "C", holiday: false },
  { date: "5/10(日)", label: "GW後週",  grade: "C", holiday: false },
];

const GRADE_INFO: Record<string, { label: string; bg: string; text: string; bar: string }> = {
  S: { label: "超混雑",       bg: "bg-purple-100", text: "text-purple-700", bar: "bg-purple-500" },
  F: { label: "かなり混雑",   bg: "bg-red-100",    text: "text-red-700",   bar: "bg-red-500"    },
  E: { label: "混雑",         bg: "bg-orange-100", text: "text-orange-700",bar: "bg-orange-400" },
  D: { label: "やや混雑",     bg: "bg-yellow-100", text: "text-yellow-700",bar: "bg-yellow-400" },
  C: { label: "まあまあ混雑", bg: "bg-lime-100",   text: "text-lime-700",  bar: "bg-lime-400"   },
  B: { label: "空いてます",   bg: "bg-green-100",  text: "text-green-700", bar: "bg-green-400"  },
  A: { label: "ガラガラ",     bg: "bg-emerald-100",text: "text-emerald-700",bar:"bg-emerald-400" },
};

const GRADE_BAR_WIDTH: Record<string, string> = {
  S: "w-full", F: "w-11/12", E: "w-4/5", D: "w-3/5", C: "w-2/5", B: "w-1/4", A: "w-1/8",
};

export default function GW2026Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>GW2026混雑予想</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          GW2026 ディズニー混雑予想カレンダー
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          2026年ゴールデンウィーク（4月25日〜5月10日）の混雑レベルと攻略ポイント
        </p>

        {/* 混雑カレンダー */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3">📅 日別 混雑予想</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {GW_DAYS.map((day) => {
                const g = GRADE_INFO[day.grade];
                return (
                  <div key={day.date} className={`flex items-center gap-3 px-4 py-3 ${day.holiday ? "bg-red-50/40" : ""}`}>
                    <div className="w-20 shrink-0">
                      <p className={`text-sm font-bold ${day.holiday ? "text-red-600" : "text-gray-800"}`}>
                        {day.date}
                      </p>
                      {day.label && (
                        <p className="text-xs text-gray-400">{day.label}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${g.bg} ${g.text}`}>
                          {day.grade}判定
                        </span>
                        <span className="text-xs text-gray-600">{g.label}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${g.bar} ${GRADE_BAR_WIDTH[day.grade]}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ※5/6は5/3（日曜日の祝日）の振替休日となるため、祝日レベルの混雑が予想されます。
          </p>
        </section>

        {/* おすすめ日・避けるべき日 */}
        <section className="mb-8 grid grid-cols-1 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-emerald-800 mb-2">✅ 比較的空いている日</h2>
            <ul className="space-y-1 text-sm text-emerald-700">
              <li><span className="font-bold">4/27(月)・4/28(火)</span> — GW前の平日。A判定でガラガラ。休みが取れるならここ一択</li>
              <li><span className="font-bold">4/30(木)・5/1(金)</span> — GW中盤の平日。C判定でまあまあ混雑だが祝日より大幅に空いている</li>
              <li><span className="font-bold">5/7(木)・5/8(金)</span> — GW明けの平日。A判定。ただし特定のアトラクションが混むこともある</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-red-800 mb-2">⚠️ 特に混雑する日</h2>
            <ul className="space-y-1 text-sm text-red-700">
              <li><span className="font-bold">5/3(日・憲法記念日)</span> — F判定。GW中で最も混雑。待ち時間100分超えが続出</li>
              <li><span className="font-bold">4/29(水・昭和の日)・5/2(土)・5/4〜5/6</span> — E判定。全日程で混雑。DPA必須</li>
            </ul>
          </div>
        </section>

        {/* GW攻略ポイント */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 GW攻略 5つのポイント</h2>
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: "開園1時間前には到着する",
                body: "GW期間中は入場ゲート前にすでに行列ができます。最低でも開園45分前、できれば1時間前到着を目標にしましょう。特に5/3は1時間30分前でも遅いくらいです。",
              },
              {
                num: 2,
                title: "入園後すぐDPAを購入する",
                body: "開園直後はDPAの在庫が最も豊富です。目的のアトラクションに向かう前に、まずアプリを開いて優先度の高いDPAを購入してください。ランドは「美女と野獣」、シーは「アナとエルサ」が最優先です。",
              },
              {
                num: 3,
                title: "午前中に人気アトラクションを攻略する",
                body: "GW中の人気アトラクションの待ち時間は午後にかけてどんどん伸びます。ビッグサンダー・マウンテン、スプラッシュ・マウンテン（ランド）、ソアリン、センター・オブ・ジ・アース（シー）は午前中のうちに乗っておきましょう。",
              },
              {
                num: 4,
                title: "昼食は11時台・14時台を狙う",
                body: "12〜13時はパーク内のレストランが最も混雑します。少し早め・遅めにずらすだけで30分以上の待ち時間を節約できます。テイクアウト系やクイックサービスを活用するのも効果的です。",
              },
              {
                num: 5,
                title: "夕方以降はショー・パレードを優先する",
                body: "GW期間は夕方以降もアトラクションの待ち時間が長いままです。その時間帯はショー・パレードの観覧に切り替えると満足度が上がります。閉園1〜2時間前はアトラクションが比較的空き始めます。",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GW DPA戦略 */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3">🎫 GW期間のDPA戦略</h2>
          <p className="text-sm text-gray-700 mb-3">
            GW中はDPAの売り切れが通常よりも<strong>30〜60分早く</strong>なります。特に最人気アトラクションは開園後15〜20分で完売することも。
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-red-600 mb-1">🏰 ランド最優先：美女と野獣（2,000円）</p>
              <p className="text-xs text-gray-600">GW中は開園後10〜20分で完売。入園したら最初の1分で購入すること。ベイマックス（1,500円）はその直後に。</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-blue-600 mb-1">⛵ シー最優先：アナとエルサ（2,000円）</p>
              <p className="text-xs text-gray-600">GW中は開園後5〜15分で完売の可能性あり。ラプンツェル（2,000円）も連続して購入。ファンタジースプリングス3本は全てDPA対象で大人気。</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-gray-700 mb-1">💰 GW想定予算：1人5,000〜8,000円</p>
              <p className="text-xs text-gray-600">通常期より1〜2枚多く使う想定で計画を。予算が許せばランド3枚・シー3枚（ファンタジースプリングス全制覇）が最高効率。</p>
            </div>
          </div>
          <Link
            href="/dpa"
            className="mt-3 flex items-center justify-between bg-amber-400 rounded-xl p-3 hover:bg-amber-500 transition-colors"
          >
            <p className="text-sm font-bold text-white">DPA完全攻略ガイドを見る</p>
            <span className="text-white">›</span>
          </Link>
        </section>

        {/* 混雑判定の基準 */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3">📊 混雑判定の目安</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {Object.entries(GRADE_INFO).map(([grade, g]) => (
              <div key={grade} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 last:border-0">
                <span className={`w-8 text-center text-xs font-bold px-1.5 py-0.5 rounded-full ${g.bg} ${g.text}`}>
                  {grade}
                </span>
                <span className="text-sm text-gray-700 font-medium w-24">{g.label}</span>
                <span className="text-xs text-gray-400">
                  {grade === "S" && "平均待ち150分以上"}
                  {grade === "F" && "平均待ち110〜149分"}
                  {grade === "E" && "平均待ち80〜109分"}
                  {grade === "D" && "平均待ち55〜79分"}
                  {grade === "C" && "平均待ち35〜54分"}
                  {grade === "B" && "平均待ち20〜34分"}
                  {grade === "A" && "平均待ち20分未満"}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">※上位5アトラクションの平均待ち時間をもとに算出</p>
        </section>

        {/* リンク */}
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors"
          >
            <p className="text-sm font-bold text-white">🏰 リアルタイム待ち時間を確認する</p>
            <span className="text-white">›</span>
          </Link>
          <Link
            href="/dpa"
            className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <div>
              <p className="text-sm font-bold text-gray-900">🎫 DPA攻略ガイド</p>
              <p className="text-xs text-gray-500">どれから買う？売り切れ時間・予算別戦略</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link
            href="/faq"
            className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <div>
              <p className="text-sm font-bold text-gray-900">❓ よくある質問（FAQ）</p>
              <p className="text-xs text-gray-500">待ち時間・DPA・チケットなど</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        </div>

        <AmazonBanner keyword="ディズニー GW 旅行 グッズ" label="GW旅行グッズをAmazonで探す" className="mt-4" />
        <p className="text-xs text-gray-400 text-center mt-6">
          ※混雑予想は過去のデータと曜日・祝日パターンをもとにした予測です。<br />
          実際の混雑はイベント・天候等により異なります。<br />
          当サイトは東京ディズニーリゾートの非公式サイトです。
        </p>
      </div>

      <Script
        id="gw2026-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "GW2026 ディズニー混雑予想カレンダー｜ゴールデンウィーク攻略ガイド",
            "description":
              "2026年ゴールデンウィークの東京ディズニーランド・ディズニーシー混雑予想。4月29日〜5月6日の日別混雑レベル・おすすめ日・攻略ポイントを徹底解説。",
            "url": "https://disneynow.tokyo/gw2026",
            "publisher": {
              "@type": "Organization",
              "name": "TDLなう",
              "url": "https://disneynow.tokyo",
            },
            "datePublished": "2026-03-29",
            "dateModified": "2026-06-15",
          }),
        }}
      />
    </main>
  );
}
