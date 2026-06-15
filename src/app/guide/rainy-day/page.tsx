import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "雨の日のディズニー完全攻略 2026 | 実は狙い目？屋内アトラクション特集 | TDLなう",
  description:
    "雨の日の東京ディズニーランド・ディズニーシー攻略ガイド。屋内アトラクション一覧・雨具の選び方・雨だからこそのメリットを徹底解説。雨でも楽しめるプラン付き。",
  alternates: { canonical: "https://disneynow.tokyo/guide/rainy-day" },
};

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

const TDL_INDOOR = [
  { name: "美女と野獣「魔法のものがたり」", area: "ニューファンタジーランド", imageId: 1054, point: "全天候型の大型ライドショー。雨の日でも快適に楽しめる。" },
  { name: "ホーンテッドマンション", area: "リバティスクエア", imageId: 611, point: "完全屋内。幽霊屋敷の独特な世界観を雨音が演出してくれる。" },
  { name: "イッツ・ア・スモールワールド", area: "ファンタジーランド", imageId: 11, point: "全天候型の大型ボートライド。ゆっくり楽しめる人気アトラクション。" },
  { name: "ミッキーのフィルハーマジック", area: "ファンタジーランド", imageId: 641, point: "3Dシアター形式で雨天関係なし。子連れにも大人気。" },
  { name: "モンスターズ・インク「ライド＆ゴーシーク！」", area: "トゥモローランド", imageId: 321, point: "シューティングゲーム形式。何度やっても楽しい。" },
];

const TDS_INDOOR = [
  { name: "ソアリン：ファンタスティック・フライト", area: "ポート・ディスカバリー", imageId: 1005, point: "巨大スクリーンの空飛ぶ体験。完全屋内で天候無関係。" },
  { name: "センター・オブ・ジ・アース", area: "ミステリアスアイランド", imageId: 631, point: "地下を舞台にした絶叫系。屋内ライドで雨天でも快適。" },
  { name: "タートル・トーク", area: "マーメイドラグーン", imageId: 91, point: "海亀のクラッシュとリアルタイムでトークができる体験型シアター。" },
  { name: "アナとエルサのフローズンジャーニー", area: "ファンタジースプリングス", imageId: 1110, point: "2024年開業の最新エリア。屋内ボートライドで全天候型。" },
  { name: "マジックランプシアター", area: "アラビアンコースト", imageId: 331, point: "3Dシアター形式のショー。座って楽しめる。" },
];

export default function RainyDayPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/guide/first-time-tdl" className="hover:text-gray-600">攻略ガイド</Link>
          <span className="mx-1">/</span>
          <span>雨の日の攻略ガイド</span>
        </nav>

        {/* ヒーロー */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
          <Image src={`${CDN}/611_thum_name.jpg`} alt="ホーンテッドマンション" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <h1 className="text-2xl font-bold text-white leading-tight">雨の日のディズニー完全攻略 2026</h1>
            <p className="text-sm text-white/80 mt-1">実は雨の日は狙い目かもしれない</p>
          </div>
        </div>

        {/* リード文 */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <p className="text-sm text-gray-800 leading-relaxed font-bold mb-2">雨の日のディズニーは「損」ではありません。</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            「雨だからキャンセルしよう」と思っている方、もったいないです。雨の日は晴れた週末と比べて来園者数が減少し、
            人気アトラクションの待ち時間が<strong>半分以下になることも珍しくありません</strong>。
            屋内アトラクションが充実しているディズニーリゾートは、実は雨の日にこそ真価を発揮します。
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-sm">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">目次</p>
          <ul className="space-y-1.5 text-sm text-blue-600">
            <li><a href="#merit" className="hover:underline">1. 雨の日だからこそのメリット</a></li>
            <li><a href="#tdl-indoor" className="hover:underline">2. TDL屋内アトラクション特集</a></li>
            <li><a href="#tds-indoor" className="hover:underline">3. TDS屋内アトラクション特集</a></li>
            <li><a href="#gear" className="hover:underline">4. 雨具・服装の選び方</a></li>
            <li><a href="#cancel" className="hover:underline">5. 雨天中止になるコンテンツ</a></li>
            <li><a href="#plan" className="hover:underline">6. 雨の日おすすめプラン</a></li>
          </ul>
        </nav>

        <div className="space-y-10">

          {/* メリット */}
          <section id="merit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. 雨の日だからこそのメリット</h2>
            <div className="space-y-3">
              {[
                { icon: "⏱", title: "待ち時間が大幅に短縮", body: "雨天時は来園者が減少し、人気アトラクションでも普段の半分以下の待ち時間になることがあります。美女と野獣が60分待ちから30分以下になることも。晴れた日では体験しにくいアトラクションも余裕で乗れます。" },
                { icon: "🎟", title: "DPAが不要になる場合も", body: "混雑が少ない雨の日は、DPA（有料優先入場）を購入しなくても人気アトラクションに乗れることがあります。節約と効率化が両立できる貴重なチャンスです。" },
                { icon: "📸", title: "写真スポットが空いている", body: "シンデレラ城前など人気のフォトスポットも混雑が少なく、ゆっくり写真を撮れます。雨でしか見られない幻想的な風景も魅力のひとつ。" },
                { icon: "🍽", title: "レストランに並ばずに入れる", body: "晴れた日は12〜13時のランチタイムに30〜60分待ちになるレストランも、雨の日は比較的スムーズに入れます。" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TDL屋内 */}
          <section id="tdl-indoor">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. TDL 雨でも楽しめる屋内アトラクション</h2>
            <div className="space-y-3">
              {TDL_INDOOR.map((a) => (
                <div key={a.name} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 72, height: 72 }}>
                    <Image src={`${CDN}/${a.imageId}_thum_name.jpg`} alt={a.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{a.name}</p>
                    <p className="text-xs text-blue-600 mb-1">{a.area}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{a.point}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TDS屋内 */}
          <section id="tds-indoor">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. TDS 雨でも楽しめる屋内アトラクション</h2>
            <div className="space-y-3">
              {TDS_INDOOR.map((a) => (
                <div key={a.name} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 72, height: 72 }}>
                    <Image src={`${CDN}/${a.imageId}_thum_name.jpg`} alt={a.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{a.name}</p>
                    <p className="text-xs text-blue-600 mb-1">{a.area}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{a.point}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 雨具 */}
          <section id="gear">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 雨具・服装の選び方</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <p className="font-bold text-gray-800 mb-2">レインポンチョ推奨</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  傘よりもレインポンチョが断然おすすめです。両手が空くのでアトラクション乗車やグッズ購入がスムーズ。
                  ディズニーらしいポンチョをパーク内で購入できますが、事前に100均やスポーツ用品店で用意しておくと節約できます。
                  ミッキー・ミニーなどのキャラクターポンチョをパーク内で着用するのも雨の日の楽しみ方のひとつです。
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <p className="font-bold text-gray-800 mb-2">防水靴・替えの靴下</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  足元が濡れると1日中不快です。防水スプレーをかけたスニーカー、または防水仕様のシューズが最適。
                  替えの靴下を1〜2足持参しておくと、濡れた場合に着替えて快適に過ごせます。
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <p className="font-bold text-gray-800 mb-2">スマホ・財布の防水対策</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  スマホが濡れるとDPAの購入もできなくなります。防水ケースまたはジップロックに入れて保護を。
                  財布や現金も防水ポーチへ。ディズニーの公式グッズとして可愛いポーチも販売されています。
                </p>
              </div>
            </div>
          </section>

          {/* 雨天中止 */}
          <section id="cancel">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. 雨天中止になるコンテンツ</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                屋外で行われるパレード・ショーは、雨天・強風の際に中止・内容変更になることがあります。
                公式アプリで当日の運営状況を確認してから予定を組みましょう。
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>・屋外パレード（ドリーミング・アップ！ など）→ 雨天時中止の可能性</li>
                <li>・花火・夜の屋外イベント → 荒天時中止</li>
                <li>・屋外アトラクション（スプラッシュ・マウンテン等）→ 落雷時運休</li>
                <li>・屋外ショーステージのイベント → 変更・縮小の可能性</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">※運営状況は日によって異なります。必ず公式アプリで確認してください。</p>
            </div>
          </section>

          {/* プラン */}
          <section id="plan">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. 雨の日おすすめプラン（TDL）</h2>
            <div className="space-y-2">
              {[
                { time: "開園〜10:00", icon: "🎯", desc: "DPAを購入（雨の日でも売り切れることがある）。最優先アトラクション（美女と野獣）のスタンバイへ直行。待ち時間が短いので効率的に乗れる。" },
                { time: "10:00〜12:00", icon: "🎢", desc: "屋内アトラクションを中心に次々と乗り進める。晴れた日に60〜120分待ちになるアトラクションも30分以内で乗れることが多い。" },
                { time: "11:30〜12:30", icon: "🍽", desc: "早めのランチ。雨の日はレストランの行列が少なく、座れる可能性が高い。11時台に食事を済ませると午後も効率的に動ける。" },
                { time: "12:30〜16:00", icon: "✨", desc: "混雑が落ち着いた時間帯を使って、普段は長蛇の列のアトラクションへ再チャレンジ。グッズ購入もこの時間帯が狙い目。" },
                { time: "16:00〜閉園", icon: "🌙", desc: "屋外パレードが中止でも夜のショーが実施されることがある。公式アプリで確認してから計画を。閉園前はアトラクション待ちが短くなることが多い。" },
              ].map((row, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="text-xl">{row.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 mb-0.5">{row.time}</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ホテルアフィリエイト */}
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-gray-800 mb-1">宿泊付きなら雨でも余裕のプランニング</p>
            <p className="text-xs text-gray-500 mb-3">近くのホテルに1泊すれば、天気を見ながら日程を調整できます。</p>
            <div className="flex gap-2">
              <a href="https://px.a8.net/svt/ejp?a8mat=4AZLSM+5N0U2A+14CS+64RJ5&a8ejpredirect=https%3A%2F%2Fwww.jalan.net%2Fuw%2Fuwp2011%2Fuww2011init.do%3Fkeyword%3D%2595%2591%2595%256C%26distCd%3D06%26rootCd%3D7701%26adultNum%3D2%26roomNum%3D1" target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm font-bold py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                じゃらんで探す
              </a>
              <a href="https://hb.afl.rakuten.co.jp/hgc/522dc3a1.a8f621bb.522dc3a2.b6743386/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2Fhotel%2Fsearch%2F%3Ff_area%3D040602%26f_otona_su%3D2%26f_heya_su%3D1" target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm font-bold py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors">
                楽天トラベルで探す
              </a>
            </div>
          </section>

          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
              <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
              <span className="text-white">›</span>
            </Link>
            <Link href="/guide/packing-list" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">持ち物リスト完全版</p>
                <p className="text-xs text-gray-500">雨具・必須アイテム確認はこちら</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </div>
        </div>

        <AmazonBanner keyword="折り畳み傘 レインコート ディズニー" label="雨対策グッズをAmazonで探す" className="mt-4" />

        <p className="text-xs text-gray-400 text-center mt-8">当サイトは東京ディズニーリゾートの非公式サイトです。</p>
      </div>

      <Script id="rainy-day-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "雨の日のディズニー完全攻略 2026",
        "description": "雨の日の東京ディズニーランド・ディズニーシー攻略。屋内アトラクション特集・雨具・雨の日プラン。",
        "url": "https://disneynow.tokyo/guide/rainy-day",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-06-07",
        "dateModified": "2026-06-07",
      })}} />
    </main>
  );
}
