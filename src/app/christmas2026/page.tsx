import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニー・クリスマス2026 混雑予想カレンダー | TDLなう",
  description:
    "2026年ディズニー・クリスマスの東京ディズニーランド・ディズニーシー混雑予想。11月〜12月25日の日別混雑レベル・イルミネーション・攻略ポイントを徹底解説。",
  alternates: { canonical: "https://disneynow.tokyo/christmas2026" },
};

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

const CHRISTMAS_DAYS = [
  { date: "11/7(土)",  label: "開幕週末",   grade: "D", holiday: false },
  { date: "11/8(日)",  label: "開幕週末",   grade: "D", holiday: false },
  { date: "11/10(火)", label: "平日",       grade: "B", holiday: false },
  { date: "11/15(土)", label: "",           grade: "D", holiday: false },
  { date: "11/16(日)", label: "",           grade: "D", holiday: false },
  { date: "11/22(土)", label: "",           grade: "D", holiday: false },
  { date: "11/23(日)", label: "勤労感謝の日",grade: "E", holiday: true  },
  { date: "11/24(月)", label: "振替休日",   grade: "D", holiday: true  },
  { date: "11/29(土)", label: "",           grade: "E", holiday: false },
  { date: "11/30(日)", label: "",           grade: "E", holiday: false },
  { date: "12/5(土)",  label: "",           grade: "E", holiday: false },
  { date: "12/6(日)",  label: "",           grade: "E", holiday: false },
  { date: "12/12(土)", label: "",           grade: "E", holiday: false },
  { date: "12/13(日)", label: "",           grade: "E", holiday: false },
  { date: "12/19(土)", label: "クリスマス週",grade: "F", holiday: false },
  { date: "12/20(日)", label: "クリスマス週",grade: "F", holiday: false },
  { date: "12/22(月)", label: "",           grade: "E", holiday: false },
  { date: "12/23(火)", label: "クリスマスイブ前日",grade: "F", holiday: false },
  { date: "12/24(水)", label: "クリスマスイブ",grade: "S", holiday: false },
  { date: "12/25(木)", label: "クリスマス当日",grade: "S", holiday: false },
];

export default function Christmas2026Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>クリスマス2026混雑予想</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          ディズニー・クリスマス2026 混雑予想カレンダー
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          2026年11月〜12月25日の東京ディズニーランド・ディズニーシー混雑レベルとクリスマス攻略ポイント
        </p>

        {/* イベント概要 */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
          <h2 className="text-sm font-bold text-red-800 mb-2">🎄 ディズニー・クリスマス2026 概要</h2>
          <ul className="text-xs text-red-700 space-y-1">
            <li>・開催期間：2026年11月上旬〜12月25日（予定）</li>
            <li>・対象パーク：東京ディズニーランド・東京ディズニーシー</li>
            <li>・パーク内イルミネーション・クリスマスツリー点灯</li>
            <li>・限定グリーティング・スペシャルパレード・クリスマスフードあり</li>
          </ul>
        </section>

        {/* 混雑カレンダー */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3">📅 日別 混雑予想（主要日程）</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {CHRISTMAS_DAYS.map((day) => {
                const g = GRADE_INFO[day.grade];
                return (
                  <div key={day.date} className={`flex items-center gap-3 px-4 py-3 ${day.holiday ? "bg-red-50/40" : ""}`}>
                    <div className="w-24 shrink-0">
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
            ※記載のない平日はB〜C判定。11月平日は比較的空いています。
          </p>
        </section>

        {/* おすすめ・避けるべき日 */}
        <section className="mb-8 grid grid-cols-1 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-emerald-800 mb-2">✅ 比較的空いている日</h2>
            <ul className="space-y-1 text-sm text-emerald-700">
              <li><span className="font-bold">11月の平日（月〜金）</span> — B判定。クリスマスシーズンの中で最も空いている。イルミネーションも楽しめてコスパ最高</li>
              <li><span className="font-bold">11月上旬〜中旬</span> — 開幕直後で混雑がまだ本格化していない。クリスマス装飾も揃い始めるおすすめ期間</li>
              <li><span className="font-bold">12月の平日（〜12/19まで）</span> — E判定。混雑はするが週末・イブより格段に快適</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-red-800 mb-2">⚠️ 特に混雑する日</h2>
            <ul className="space-y-1 text-sm text-red-700">
              <li><span className="font-bold">12/24(水)・クリスマスイブ</span> — S判定。年間最混雑クラス。カップル・ファミリーで超満員。入場制限がかかることも</li>
              <li><span className="font-bold">12/25(木)・クリスマス当日</span> — S判定。イブと並ぶ最混雑日</li>
              <li><span className="font-bold">12月の週末（12/19以降）</span> — F判定。年末に向けて急激に混雑が増す</li>
            </ul>
          </div>
        </section>

        {/* クリスマス攻略 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 クリスマスディズニー攻略 5つのポイント</h2>
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: "イルミネーションは夕暮れ前に場所を確保",
                body: "クリスマスのパークはイルミネーションが圧巻です。最も美しく見えるスポットは日没前から混雑し始めます。17時頃（日没の30〜60分前）には良い撮影スポットに移動しておきましょう。",
              },
              {
                num: 2,
                title: "防寒対策は万全に（特に12月）",
                body: "12月のパークは夜間に5℃以下になることも。ダウンジャケット・手袋・カイロは必須です。子連れの場合は特に防寒を徹底してください。ショーの待ち時間中に体が冷えるので、ブランケットがあると便利です。",
              },
              {
                num: 3,
                title: "クリスマス限定フードは午前中に",
                body: "クリスマス限定のスイーツ・ポップコーン・ランチボックスは人気商品が午前中で売り切れます。特に限定デザインのポップコーンケースは開園直後から行列ができます。食べたいものはリストアップして優先順位をつけておきましょう。",
              },
              {
                num: 4,
                title: "12/24・25はアトラクション重視を諦める",
                body: "クリスマスイブ・当日は入場者が非常に多く、人気アトラクションの待ち時間が150分超えになることも。この日程で行くなら「雰囲気・ショー・フード・イルミネーション」を楽しむことをメインにして、アトラクションは期待を下げておくのが賢明です。",
              },
              {
                num: 5,
                title: "11月中旬の平日が狙い目",
                body: "クリスマス装飾が完成していて、かつ混雑が最も少ないのが11月中旬の平日です。B判定（空いてます）レベルでパークを楽しめる貴重な期間。休みが取れるなら強くおすすめします。",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
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

        {/* 12/24・25特別対策 */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3">🎅 12/24・25 クリスマスに行く人へ</h2>
          <p className="text-sm text-gray-700 mb-3">
            クリスマスイブ・当日はディズニーのシーズン中でも<strong>最混雑クラス</strong>です。特別な日だからこそ事前準備が重要です。
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-red-600 mb-1">必ずやること</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>・チケットは事前購入必須（当日券は販売されないことがある）</li>
                <li>・開園1時間前には入場ゲートへ到着</li>
                <li>・入園直後にDPAを最優先で購入</li>
                <li>・レストランは事前予約可能な店を選ぶ</li>
              </ul>
            </div>
          </div>
          <Link
            href="/dpa"
            className="mt-3 flex items-center justify-between bg-red-400 rounded-xl p-3 hover:bg-red-500 transition-colors"
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

        <AmazonBanner keyword="ディズニー クリスマス グッズ" label="クリスマスグッズをAmazonで探す" className="mt-4" />
        <p className="text-xs text-gray-400 text-center mt-6">
          ※混雑予想は過去のデータと曜日・祝日パターンをもとにした予測です。<br />
          実際の混雑はイベント・天候等により異なります。<br />
          当サイトは東京ディズニーリゾートの非公式サイトです。
        </p>
      </div>

      <Script
        id="christmas2026-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ディズニー・クリスマス2026 混雑予想カレンダー｜12/24・12/25攻略ガイド",
            "description":
              "2026年ディズニー・クリスマスの混雑予想。11月〜12月25日の日別混雑レベル・イルミネーション・攻略ポイントを徹底解説。",
            "url": "https://disneynow.tokyo/christmas2026",
            "publisher": {
              "@type": "Organization",
              "name": "TDLなう",
              "url": "https://disneynow.tokyo",
            },
            "datePublished": "2026-04-22",
            "dateModified": "2026-06-15",
          }),
        }}
      />
    </main>
  );
}
