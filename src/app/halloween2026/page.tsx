import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニー・ハロウィーン2026 混雑予想カレンダー | TDLなう",
  description:
    "2026年ディズニー・ハロウィーンの東京ディズニーランド・ディズニーシー混雑予想。9月〜10月31日の日別混雑レベル・仮装ルール・攻略ポイントを徹底解説。",
  alternates: { canonical: "https://disneynow.tokyo/halloween2026" },
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

const HALLOWEEN_DAYS = [
  { date: "9/5(土)",  label: "開幕週末",   grade: "E", holiday: false },
  { date: "9/6(日)",  label: "開幕週末",   grade: "E", holiday: false },
  { date: "9/8(火)",  label: "平日",       grade: "C", holiday: false },
  { date: "9/12(土)", label: "",           grade: "E", holiday: false },
  { date: "9/13(日)", label: "",           grade: "E", holiday: false },
  { date: "9/19(土)", label: "3連休",      grade: "F", holiday: false },
  { date: "9/20(日)", label: "3連休",      grade: "F", holiday: false },
  { date: "9/21(月)", label: "敬老の日",   grade: "E", holiday: true  },
  { date: "9/22(火)", label: "平日",       grade: "C", holiday: false },
  { date: "9/26(土)", label: "",           grade: "E", holiday: false },
  { date: "9/27(日)", label: "",           grade: "F", holiday: false },
  { date: "10/3(土)", label: "",           grade: "E", holiday: false },
  { date: "10/4(日)", label: "",           grade: "E", holiday: false },
  { date: "10/10(土)","label": "体育の日前",grade: "F", holiday: false },
  { date: "10/11(日)","label": "体育の日前",grade: "F", holiday: false },
  { date: "10/12(月)","label": "体育の日", grade: "E", holiday: true  },
  { date: "10/17(土)","label": "",         grade: "E", holiday: false },
  { date: "10/18(日)","label": "",         grade: "E", holiday: false },
  { date: "10/24(土)","label": "ハロウィン前",grade: "F", holiday: false },
  { date: "10/25(日)","label": "ハロウィン前",grade: "F", holiday: false },
  { date: "10/31(土)","label": "ハロウィン当日",grade: "S", holiday: false },
];

export default function Halloween2026Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏰</span>
            <span className="text-base font-bold text-gray-900">TDLなう</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>ハロウィン2026混雑予想</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          ディズニー・ハロウィーン2026 混雑予想カレンダー
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          2026年9月〜10月31日の東京ディズニーランド・ディズニーシー混雑レベルとハロウィン攻略ポイント
        </p>

        {/* イベント概要 */}
        <section className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
          <h2 className="text-sm font-bold text-orange-800 mb-2">🎃 ディズニー・ハロウィーン2026 概要</h2>
          <ul className="text-xs text-orange-700 space-y-1">
            <li>・開催期間：2026年9月上旬〜10月31日（予定）</li>
            <li>・対象パーク：東京ディズニーランド・東京ディズニーシー</li>
            <li>・ゲスト仮装：15歳以上も仮装参加可能（ハロウィーン期間限定）</li>
            <li>・限定グリーティング・パレード・スペシャルメニューあり</li>
          </ul>
        </section>

        {/* 混雑カレンダー */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3">📅 日別 混雑予想（主要日程）</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {HALLOWEEN_DAYS.map((day) => {
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
            ※記載のない平日はC判定が目安。週末・祝日は基本E〜F判定です。
          </p>
        </section>

        {/* おすすめ・避けるべき日 */}
        <section className="mb-8 grid grid-cols-1 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-emerald-800 mb-2">✅ 比較的空いている日</h2>
            <ul className="space-y-1 text-sm text-emerald-700">
              <li><span className="font-bold">平日（月〜金）</span> — C判定でまあまあ混雑。ハロウィーン期間中の平日は比較的狙い目</li>
              <li><span className="font-bold">9月上旬〜中旬の平日</span> — 開幕直後・夏休み明けで落ち着いている。ハロウィン気分を楽しみながら比較的快適に回れる</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-red-800 mb-2">⚠️ 特に混雑する日</h2>
            <ul className="space-y-1 text-sm text-red-700">
              <li><span className="font-bold">10/31(土)・ハロウィン当日</span> — S判定。年間最混雑クラス。仮装した来場者で超満員。早朝入場必須</li>
              <li><span className="font-bold">10月の土日</span> — F判定。10月に入るとハロウィン一色で混雑がピークへ</li>
              <li><span className="font-bold">9/19〜9/21・3連休</span> — F〜E判定。シルバーウィークはどの日も混雑</li>
            </ul>
          </div>
        </section>

        {/* 仮装ルール */}
        <section className="bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3">🎭 ハロウィーン 仮装ルール（2026年版）</h2>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-purple-600 mb-1">✅ 仮装OK</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>・ディズニーキャラクターのコスチューム</li>
                <li>・顔が隠れない程度のメイク・フェイスペイント</li>
                <li>・カチューシャ・しっぽなどの小物アクセサリー</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-red-600 mb-1">❌ 仮装NG</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>・顔全体を覆うマスク・覆面</li>
                <li>・過度に露出の多い衣装</li>
                <li>・他のゲストに不快感を与える衣装・メイク</li>
                <li>・刃物に見えるような小道具（おもちゃ含む）</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">※ルールは年によって変更される場合があります。公式サイトで必ず最新情報を確認してください。</p>
        </section>

        {/* 攻略ポイント */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎯 ハロウィーン攻略 5つのポイント</h2>
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: "仮装は事前に準備・当日は更衣室を活用",
                body: "仮装して行く場合は、電車移動を考慮した着脱しやすいコーデを。パーク内にコインロッカーや更衣室はありますが混雑時は待ち時間が発生します。着替えが必要な場合は入園直後か閉園前の空いた時間帯を狙いましょう。",
              },
              {
                num: 2,
                title: "ハロウィーン限定グリーティングは整理券制",
                body: "人気キャラクターのスペシャルグリーティングは整理券が必要なことが多く、開園直後に配布が完了してしまいます。グリーティングを優先する場合は開園前から並ぶ必要があります。",
              },
              {
                num: 3,
                title: "限定フードは午前中に確保",
                body: "ハロウィーン限定のスペシャルメニューは人気商品が午前中に売り切れることがあります。特にスイーツ系・限定ポップコーンは早めに確保しておきましょう。",
              },
              {
                num: 4,
                title: "ナイトタイムショーは場所取りが重要",
                body: "ハロウィーン期間のナイトタイムエンターテイメントは例年大人気。良い場所で見るには開始1〜1.5時間前からの場所取りが必要です。場所取りをしている間に他の家族がアトラクションを回る役割分担も有効です。",
              },
              {
                num: 5,
                title: "10/31当日は覚悟が必要",
                body: "ハロウィン当日（10/31）は年間最混雑クラス。仮装した来場者で埋め尽くされ、アトラクションの待ち時間は通常の1.5〜2倍になります。この日に行くなら「雰囲気を楽しむ」目的に絞り、アトラクション数は欲張らない計画を。",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
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

        <p className="text-xs text-gray-400 text-center mt-6">
          ※混雑予想は過去のデータと曜日・祝日パターンをもとにした予測です。<br />
          実際の混雑はイベント・天候等により異なります。<br />
          当サイトは東京ディズニーリゾートの非公式サイトです。
        </p>
      </div>

      <Script
        id="halloween2026-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ディズニー・ハロウィーン2026 混雑予想カレンダー｜9月〜10月31日攻略ガイド",
            "description":
              "2026年ディズニー・ハロウィーンの混雑予想。9月〜10月31日の日別混雑レベル・仮装ルール・攻略ポイントを徹底解説。",
            "url": "https://disneynow.tokyo/halloween2026",
            "publisher": {
              "@type": "Organization",
              "name": "TDLなう",
              "url": "https://disneynow.tokyo",
            },
            "datePublished": "2026-04-22",
            "dateModified": "2026-04-22",
          }),
        }}
      />
    </main>
  );
}
