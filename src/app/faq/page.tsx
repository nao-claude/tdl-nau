import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export const metadata: Metadata = {
  title: "よくある質問 | TDLなう — ディズニーリゾート待ち時間・混雑情報",
  description:
    "東京ディズニーランド・ディズニーシーに関するよくある質問をまとめました。待ち時間の見方・DPAの使い方・身長制限・混雑しやすい時期など、初めて行く方から常連の方まで役立つ情報です。",
  alternates: { canonical: "https://disneynow.tokyo/faq" },
};

const FAQ_ITEMS = [
  {
    category: "待ち時間について",
    icon: "⏱️",
    questions: [
      {
        q: "待ち時間はリアルタイムで更新されますか？",
        a: "はい。当サイトの待ち時間データはQueue-Times.comのAPIを使用しており、数分おきに自動更新されます。画面を再読み込みすることで最新の情報が表示されます。",
      },
      {
        q: "待ち時間が「—」や「休止中」と表示されるのはなぜですか？",
        a: "アトラクションが一時的に運休・メンテナンス中の場合、または待ち時間データが取得できない場合に表示されます。公式アプリ「東京ディズニーリゾートアプリ」でも確認することをおすすめします。",
      },
      {
        q: "待ち時間が少ない時間帯はいつですか？",
        a: "一般的に開園直後（9〜10時）と閉園1〜2時間前（19〜20時頃）は比較的空きやすい傾向があります。また、平日・雨天・夏休みや年末年始を避けた時期は全体的に混雑が落ち着きます。",
      },
      {
        q: "パレードやショーの時間帯は空きますか？",
        a: "はい。ディズニー・ハーモニー・カラー・オブ・ライト（ランド）やビッグバンドビート（シー）などの人気ショー・パレード開催中は、アトラクションの待ち時間が短くなる傾向があります。これを「パレード抜け」と呼び、上手く活用すると人気アトラクションに乗りやすくなります。",
      },
    ],
  },
  {
    category: "DPA（ディズニー・プレミアアクセス）について",
    icon: "⚡",
    questions: [
      {
        q: "DPAとは何ですか？",
        a: "DPA（ディズニー・プレミアアクセス）は有料の時間指定サービスです。対象アトラクションを1人1,500〜2,500円程度（アトラクションにより異なる）で購入すると、指定の時間帯に優先的に乗車できます。",
      },
      {
        q: "DPAはいつ購入できますか？",
        a: "東京ディズニーリゾートアプリから入園後に購入できます。人気アトラクション（美女と野獣・ソアリン・トイ・マニアなど）は開園直後に売り切れることが多いため、入園したらすぐに購入を検討しましょう。",
      },
      {
        q: "DPA対象アトラクションはどれですか？",
        a: "ランドでは「美女と野獣〈魔法のものがたり〉」「スター・ウォーズ：ハイパースペース・マウンテン」などが対象です。シーでは「ソアリン：ファンタスティック・フライト」「トイ・ストーリー・マニア！」などが対象です。当サイトのアトラクションガイドでDPAマークが付いているものが対象です。",
      },
      {
        q: "DPAを購入しなくても人気アトラクションに乗れますか？",
        a: "乗れますが、繁忙期や休日は2〜3時間待ちになることもあります。DPAを使わない場合は、開園直後に1番人気アトラクションに直行するか、スタンバイパスを活用する方法が有効です。",
      },
    ],
  },
  {
    category: "身長制限について",
    icon: "📏",
    questions: [
      {
        q: "身長制限があるアトラクションはどれですか？",
        a: "ランドでは「スプラッシュ・マウンテン（90cm以上）」「ビッグサンダー・マウンテン（102cm以上）」「スペース・マウンテン（102cm以上）」などがあります。シーでは「インディ・ジョーンズ・アドベンチャー（117cm以上）」「レイジングスピリッツ（117cm以上）」「センター・オブ・ジ・アース（117cm以上）」などがあります。当サイトのアトラクションガイドで確認できます。",
      },
      {
        q: "子連れで楽しめるアトラクションはありますか？",
        a: "はい。身長制限のないアトラクションはたくさんあります。ランドでは「プーさんのハニーハント」「イッツ・ア・スモールワールド」「ホーンテッドマンション」など。シーでは「マーメイドラグーンシアター」「アリエルのプレイグラウンド」「フォートレス・エクスプロレーション」などが小さなお子様でも楽しめます。",
      },
      {
        q: "身長制限ギリギリの場合、当日に測定がありますか？",
        a: "はい。アトラクション入口で身長計測が行われます。靴のかかとやヘアピンで高さを稼ごうとしても、キャストに確認されることがあります。安全のため、正確な身長で確認することをおすすめします。",
      },
    ],
  },
  {
    category: "混雑・訪問タイミングについて",
    icon: "📅",
    questions: [
      {
        q: "1年で最も混雑する時期はいつですか？",
        a: "夏休み（7月中旬〜8月末）、年末年始（12月29日〜1月3日）、春休み・GW（3月下旬〜4月末）が特に混雑します。また、ハロウィン（9〜10月）やクリスマス（11〜12月）のイベント期間中も混雑する傾向があります。",
      },
      {
        q: "比較的空いている時期・曜日はいつですか？",
        a: "平日（特に火・水・木曜日）で学校の長期休暇でない時期（5月の連休明け、6月、9月の平日など）が比較的空いています。ただし、天候や特別イベントによって大きく変わります。",
      },
      {
        q: "雨の日はどのくらい空きますか？",
        a: "小雨程度では来場者はそれほど減りませんが、本降りの雨の日は入場者数が20〜30%程度少なくなることもあります。屋外アトラクションは運休になる場合がありますが、屋内アトラクションを中心に回るには狙い目です。",
      },
      {
        q: "開園時間はいつですか？",
        a: "通常は9:00開園、21:00閉園ですが、シーズンや特別イベントによって異なります。年末年始やハロウィン・クリスマス期間は延長営業になることがあります。正確な営業時間は公式サイトで事前に確認することをおすすめします。",
      },
    ],
  },
  {
    category: "チケット・入場について",
    icon: "🎟️",
    questions: [
      {
        q: "チケットは当日窓口で買えますか？",
        a: "現在、東京ディズニーリゾートのチケットは原則として事前購入制です。公式サイトまたは東京ディズニーリゾートアプリから購入してください。当日券の販売は残余がある場合のみで、繁忙期はほぼ購入できないことが多いです。",
      },
      {
        q: "チケットの種類を教えてください。",
        a: "「1デーパスポート」（1日入り放題）が基本です。その他に「アーリーイブニングパスポート」（15:00以降入場）や「ウィークナイトパスポート」（平日夕方から）など、時間限定のお得なチケットもあります。料金は年齢・日付により異なります。",
      },
      {
        q: "ランドとシーは別のチケットが必要ですか？",
        a: "はい。東京ディズニーランドと東京ディズニーシーは別のパークで、それぞれ別のチケットが必要です。1日で両方のパークを楽しむことはできません（パーク間の行き来は不可）。",
      },
    ],
  },
  {
    category: "このサイトについて",
    icon: "ℹ️",
    questions: [
      {
        q: "このサイトは公式サイトですか？",
        a: "いいえ。このサイト「TDLなう」は非公式のファンサイトです。株式会社オリエンタルランドとは一切関係ありません。待ち時間・混雑情報などは参考情報としてご利用ください。",
      },
      {
        q: "待ち時間データの正確性は保証されますか？",
        a: "当サイトはQueue-Times.comのAPIを使用しており、実際の待ち時間と若干の差異が生じる場合があります。正確な情報は公式アプリ「東京ディズニーリゾートアプリ」でご確認ください。",
      },
      {
        q: "英語版はありますか？",
        a: "はい。画面右上の「EN」ボタンから英語版に切り替えられます。または /en にアクセスしてください。",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl">🏰</Link>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">TDLなう</h1>
              <p className="text-xs text-gray-500">東京ディズニーランド・シー リアルタイム待ち時間</p>
            </div>
          </div>
          <LocaleSwitcher currentLocale="ja" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">トップ</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-medium">よくある質問</span>
        </nav>

        {/* タイトル */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">よくある質問</h2>
          <p className="text-sm text-gray-500">
            東京ディズニーランド・ディズニーシーに関するよくあるご質問をまとめました。
          </p>
        </div>

        <AdBanner adSlot="1111111111" />

        {/* 目次 */}
        <nav className="bg-white rounded-2xl border border-gray-200 p-4 mt-6 mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">目次</p>
          <ul className="space-y-2">
            {FAQ_ITEMS.map((section) => (
              <li key={section.category}>
                <a
                  href={`#${section.category}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <span>{section.icon}</span>
                  <span>{section.category}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* FAQ本文 */}
        <div className="space-y-8">
          {FAQ_ITEMS.map((section) => (
            <section key={section.category} id={section.category}>
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                <span>{section.icon}</span>
                <span>{section.category}</span>
              </h3>
              <div className="space-y-3">
                {section.questions.map((item) => (
                  <details
                    key={item.q}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden group"
                  >
                    <summary className="flex items-start gap-3 px-4 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                      <span className="text-blue-500 font-bold text-sm mt-0.5 shrink-0">Q</span>
                      <span className="text-sm font-medium text-gray-900 flex-1">{item.q}</span>
                      <span className="text-gray-400 text-xs mt-0.5 shrink-0 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-4 pb-4 pt-0">
                      <div className="flex items-start gap-3">
                        <span className="text-green-600 font-bold text-sm mt-0.5 shrink-0">A</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <AdBanner adSlot="2222222222" />
        </div>

        {/* 関連ページ */}
        <div className="mt-8">
          <p className="text-sm font-bold text-gray-700 mb-3">関連ページ</p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/attractions/tdl"
              className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
            >
              <span className="text-2xl">🏰</span>
              <div>
                <p className="text-sm font-bold text-gray-900">ランドガイド</p>
                <p className="text-xs text-gray-500">DPA・身長制限一覧</p>
              </div>
            </Link>
            <Link
              href="/attractions/tds"
              className="flex items-center gap-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:border-gray-400 transition-colors"
            >
              <span className="text-2xl">⛵</span>
              <div>
                <p className="text-sm font-bold text-gray-900">シーガイド</p>
                <p className="text-xs text-gray-500">DPA・身長制限一覧</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1">
          <Link href="/privacy" className="underline">プライバシーポリシー</Link>
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
