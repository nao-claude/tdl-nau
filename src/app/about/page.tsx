import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "このサイトについて | TDLなう",
  description: "TDLなうは、東京ディズニーランド・東京ディズニーシーのリアルタイム待ち時間・混雑予測・アトラクション情報を無料で提供する非公式情報サイトです。",
  alternates: { canonical: "https://disneynow.tokyo/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>このサイトについて</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">このサイトについて</h1>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">サイトの目的</h2>
            <p>
              TDLなうは、東京ディズニーランド・東京ディズニーシーを訪れる方が、より快適に・より楽しく過ごせるよう、
              リアルタイムの待ち時間情報・混雑予測・アトラクション攻略情報を無料で提供する非公式情報サイトです。
            </p>
            <p className="mt-3">
              「今日は空いている？」「どのアトラクションから回れば効率的？」といった疑問にお答えし、
              限られた時間を最大限に楽しんでいただくことを目標にしています。
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">主な機能</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">●</span>
                <div>
                  <span className="font-semibold text-gray-800">リアルタイム待ち時間</span>
                  <p className="text-gray-600 mt-0.5">全アトラクションの現在の待ち時間を5分ごとに更新。お気に入り登録機能付き。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">●</span>
                <div>
                  <span className="font-semibold text-gray-800">混雑予測カレンダー</span>
                  <p className="text-gray-600 mt-0.5">曜日・祝日・学校休暇・季節イベントをもとに、1ヶ月先までの混雑度をA〜Sで予測。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">●</span>
                <div>
                  <span className="font-semibold text-gray-800">本日のおすすめコース</span>
                  <p className="text-gray-600 mt-0.5">リアルタイムの混雑状況をもとに、その日の時間帯に合わせた効率的な周遊プランを自動提案。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">●</span>
                <div>
                  <span className="font-semibold text-gray-800">アトラクション攻略ガイド</span>
                  <p className="text-gray-600 mt-0.5">各アトラクションの身長制限・DPA（ディズニー・プレミアアクセス）対象・スリル度・所要時間などを一覧で確認。</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold mt-0.5">●</span>
                <div>
                  <span className="font-semibold text-gray-800">英語対応</span>
                  <p className="text-gray-600 mt-0.5">訪日外国人の方にも使いやすいよう、英語版ページを提供しています。</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">開設のきっかけ</h2>
            <p className="text-gray-700 leading-relaxed">
              私の地元は関西です。子どもが小学校に上がる前に「一度だけでいいからディズニーに連れて行ってあげたい」と妻と話し合い、
              新幹線と宿泊費を合わせて家族4人で20万円近くをかけて、初めて東京ディズニーランドへ向かいました。
              子どもたちは前の晩から眠れないほど楽しみにしていて、私もそれを見てじんわり嬉しかったのを覚えています。
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              ところが、いざ入園してみると何もわからない。どのアトラクションから向かえばいいのか、
              DPA（有料の優先入場券）はいつ買えばいいのか、どのタイミングで食事を取れば並ばずに済むのか——
              土地勘も経験もない私たちは、ただ人の流れに乗って歩くだけでした。
              気づけば午前中の2時間を「ビッグサンダー・マウンテン」の列だけで使い切ってしまい、
              子どもが「あのお城の中に入りたかった」と言い出したのは閉園1時間前のことでした。
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              帰りの新幹線の中で、下の子が膝の上で眠り、上の子が窓の外を見ながらぽつりと言いました。
              「また来られる？」——そのひと言がずっと胸に刺さっています。
              「また来られる」とは言えなかった。遠くて、高くて、そう何度も来られる場所じゃない。
              だからこそ、あの1日をもっとうまく使えていたら、と何度も悔やみました。
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              ディズニーリゾートには世界中から多くのお客さんが訪れています。
              アメリカから、ヨーロッパから、アジア各国から——言葉も文化も違う中、
              「一生に一度の旅行」としてここを選んでくれる人たちがいる。
              私と同じように、長い時間とお金をかけて、大切な人と一緒に来ている人たちが。
              そういう人たちに、私が経験したような「もっとうまくできたのに」という後悔を
              させたくないと強く思うようになりました。
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              必要な情報を、必要なときに、誰でも一目でわかる形で——。
              それだけを考えて作ったのが「TDLなう」です。
              地方から来た家族も、海外から来た旅行者も、
              その1日が後悔のない最高の思い出になりますように。
            </p>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">運営情報</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                <tr className="py-2">
                  <td className="py-2 pr-4 font-semibold text-gray-600 w-28">サイト名</td>
                  <td className="py-2">TDLなう</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gray-600">運営者</td>
                  <td className="py-2">n.hase</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gray-600">URL</td>
                  <td className="py-2">https://disneynow.tokyo</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gray-600">開設</td>
                  <td className="py-2">2026年3月</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gray-600">更新頻度</td>
                  <td className="py-2">待ち時間：5分ごと／その他：随時</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gray-600">お問い合わせ</td>
                  <td className="py-2">
                    <Link href="/contact" className="text-blue-500 hover:underline">お問い合わせページ</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">データについて</h2>
            <p className="text-gray-700 leading-relaxed">
              待ち時間データは、世界中のテーマパーク情報を収集している
              <a href="https://queue-times.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-1">Queue-Times.com</a>
              のAPIを利用しています。数分程度のタイムラグが生じる場合があります。
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              混雑予想は、曜日・祝日・学校の長期休暇・季節イベントなどの要因をもとに独自に算出したものです。
              天候や突発的なイベントにより実際の混雑状況と異なる場合があります。
              最新・正確な営業情報は必ず
              <a href="https://www.tokyodisneyresort.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-1">東京ディズニーリゾート公式サイト</a>
              でご確認ください。
            </p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-900 mb-3">免責事項・著作権について</h2>
            <p className="text-gray-700">
              当サイトは、株式会社オリエンタルランドおよびウォルト・ディズニー・カンパニーとは一切関係のない<strong>非公式の情報サイト</strong>です。
              掲載している待ち時間・営業情報などは外部データを参照しており、公式情報と異なる場合があります。
              最新・正確な情報は必ず<a href="https://www.tokyodisneyresort.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">東京ディズニーリゾート公式サイト</a>でご確認ください。
            </p>
            <p className="mt-3 text-gray-700">
              ミッキーマウスをはじめとするディズニーキャラクターに関する著作権・商標権は、
              ウォルト・ディズニー・カンパニーに帰属します。
            </p>
          </section>

          <div className="flex gap-3 pt-2">
            <Link href="/faq" className="flex-1 text-center bg-blue-500 text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-600 transition-colors">
              よくある質問（FAQ）
            </Link>
            <Link href="/contact" className="flex-1 text-center bg-white border border-gray-200 text-gray-700 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 transition-colors">
              お問い合わせ
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
