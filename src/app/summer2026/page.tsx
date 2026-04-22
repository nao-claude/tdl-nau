import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "夏休み2026 ディズニー混雑予想カレンダー | TDLなう",
  description:
    "2026年夏休みの東京ディズニーランド・ディズニーシー混雑予想。7月〜8月の日別混雑レベル・お盆ピーク・攻略ポイントを徹底解説。夏のディズニーを快適に楽しむための完全ガイド。",
  alternates: { canonical: "https://disneynow.tokyo/summer2026" },
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

const SUMMER_DAYS = [
  { date: "7/18(土)", label: "",         grade: "E", holiday: false },
  { date: "7/19(日)", label: "",         grade: "E", holiday: false },
  { date: "7/20(月)", label: "海の日",   grade: "F", holiday: true  },
  { date: "7/21(火)", label: "夏休み開始",grade: "D", holiday: false },
  { date: "7/22(水)", label: "",         grade: "D", holiday: false },
  { date: "7/25(土)", label: "",         grade: "F", holiday: false },
  { date: "7/26(日)", label: "",         grade: "F", holiday: false },
  { date: "7/27(月)", label: "",         grade: "D", holiday: false },
  { date: "8/1(土)",  label: "",         grade: "F", holiday: false },
  { date: "8/2(日)",  label: "",         grade: "F", holiday: false },
  { date: "8/9(日)",  label: "山の日",   grade: "F", holiday: true  },
  { date: "8/10(月)", label: "振替休日", grade: "E", holiday: true  },
  { date: "8/13(木)", label: "お盆",     grade: "S", holiday: false },
  { date: "8/14(金)", label: "お盆",     grade: "S", holiday: false },
  { date: "8/15(土)", label: "お盆",     grade: "S", holiday: false },
  { date: "8/16(日)", label: "お盆",     grade: "S", holiday: false },
  { date: "8/17(月)", label: "お盆明け", grade: "C", holiday: false },
  { date: "8/18(火)", label: "",         grade: "C", holiday: false },
  { date: "8/22(土)", label: "",         grade: "E", holiday: false },
  { date: "8/23(日)", label: "",         grade: "E", holiday: false },
  { date: "8/31(月)", label: "夏休み最終",grade: "D", holiday: false },
];

export default function Summer2026Page() {
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
          <span>夏休み2026混雑予想</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          夏休み2026 ディズニー混雑予想カレンダー
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          2026年7月〜8月の東京ディズニーランド・ディズニーシー混雑レベルと夏の攻略ポイント
        </p>

        {/* 混雑カレンダー */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3">📅 日別 混雑予想（主要日程）</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {SUMMER_DAYS.map((day) => {
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
            ※代表日程を掲載。記載のない平日はC〜D判定が目安です。
          </p>
        </section>

        {/* おすすめ・避けるべき日 */}
        <section className="mb-8 grid grid-cols-1 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-emerald-800 mb-2">✅ 比較的空いている日</h2>
            <ul className="space-y-1 text-sm text-emerald-700">
              <li><span className="font-bold">7/21(火)〜7/24(金)</span> — 夏休み序盤の平日。D判定でやや混雑だが週末・お盆より格段に空いている</li>
              <li><span className="font-bold">8/17(月)〜8/21(金)</span> — お盆明け平日。C判定。夏の中で最もコスパよく回れる穴場期間</li>
              <li><span className="font-bold">8/24(月)〜8/28(金)</span> — 夏休み終盤平日。学校が始まる地域も増え空き始める</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <h2 className="text-base font-bold text-red-800 mb-2">⚠️ 特に混雑する日</h2>
            <ul className="space-y-1 text-sm text-red-700">
              <li><span className="font-bold">8/13(木)〜8/16(日)・お盆</span> — S判定。年間最混雑クラス。開園前から長蛇の列。DPA必須でも乗れないアトラクションが出ることも</li>
              <li><span className="font-bold">7月・8月の土日</span> — F判定。待ち時間100分超えが当たり前。早朝入場が鉄則</li>
              <li><span className="font-bold">7/20(月・海の日)・8/9(日・山の日)</span> — F判定。3連休のピーク日</li>
            </ul>
          </div>
        </section>

        {/* 夏攻略ポイント */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">☀️ 夏ディズニー攻略 5つのポイント</h2>
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: "熱中症対策を万全に",
                body: "夏のパークは気温35℃超えも珍しくありません。冷却スプレー・首掛け扇風機・ネッククーラーは必携。水分補給は15〜20分おきに行い、屋内アトラクションで定期的に涼む計画を立てましょう。帽子・日傘も必須です。",
              },
              {
                num: 2,
                title: "開園前到着は夏こそ必須",
                body: "夏休みシーズンは開園1時間前でも入場ゲートに行列ができます。お盆期間は1時間30分前到着を推奨。早朝の涼しい時間帯に人気アトラクションを攻略し、暑い午後はショー鑑賞・ショッピング・食事に充てるのが最善策です。",
              },
              {
                num: 3,
                title: "スプラッシュ系は午後に回す",
                body: "ランドのスプラッシュ・マウンテン（ビーバーブラザーズ）など水系アトラクションは午後がベスト。午前中は濡れると後が辛いので、暑くなってきた13〜15時頃に乗ると快適でかつ待ち時間も比較的読みやすいです。",
              },
              {
                num: 4,
                title: "DPAは開園直後の購入が絶対条件",
                body: "夏休みのDPAは通常期より20〜40分早く売り切れます。お盆期間は開園後10分で最人気アトラクションが完売することも。入園したらアトラクションより先にアプリを開いてDPAを購入してください。",
              },
              {
                num: 5,
                title: "夏限定メニューとショーを活用する",
                body: "夏はパーク限定のかき氷・アイスクリームなど特別メニューが多数登場します。また夏季限定のナイトタイムショーは必見。閉園2時間前から夜のコンテンツに切り替えると、満足度が大幅に上がります。",
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-400 text-white text-sm font-bold flex items-center justify-center shrink-0">
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

        {/* お盆特別注意 */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3">🔥 お盆（8/13〜8/16）は別格の混雑</h2>
          <p className="text-sm text-gray-700 mb-3">
            お盆期間はTDLの年間入場者数の中でも<strong>トップクラスの混雑</strong>です。通常の夏休み週末とも全く別物の混雑度になります。
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-red-600 mb-1">⚠️ お盆に行く人へのアドバイス</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>・DPAを最大限活用しないと人気アトラクションには乗れない覚悟を</li>
                <li>・開園1時間30分前到着を推奨</li>
                <li>・昼食は11時か14時以降にずらす（12〜13時は入れないレストランも）</li>
                <li>・気温・体力の消耗が激しいため、子連れは特に無理のない計画を</li>
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

        <p className="text-xs text-gray-400 text-center mt-6">
          ※混雑予想は過去のデータと曜日・祝日パターンをもとにした予測です。<br />
          実際の混雑はイベント・天候等により異なります。<br />
          当サイトは東京ディズニーリゾートの非公式サイトです。
        </p>
      </div>

      <Script
        id="summer2026-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "夏休み2026 ディズニー混雑予想カレンダー｜お盆・7月8月攻略ガイド",
            "description":
              "2026年夏休みの東京ディズニーランド・ディズニーシー混雑予想。7月〜8月の日別混雑レベル・お盆ピーク・攻略ポイントを徹底解説。",
            "url": "https://disneynow.tokyo/summer2026",
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
