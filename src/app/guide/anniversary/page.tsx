import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ディズニー記念日・誕生日特典まとめ 2026 | バースデーシールの使い方 | TDLなう",
  description:
    "東京ディズニーランド・シーの誕生日・記念日特典を徹底解説。バースデーシール・バースデーグリーティング・誕生日限定グッズ・おすすめコース・プロポーズ攻略まで完全ガイド。",
  alternates: { canonical: "https://disneynow.tokyo/guide/anniversary" },
};

export default function AnniversaryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>記念日・誕生日特典ガイド</span>
        </nav>

        {/* ヒーロー画像 */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 190 }}>
          <Image
            src="https://media1.tokyodisneyresort.jp/images/adventure/attraction/1054_thum_name.jpg"
            alt="東京ディズニーランド 美女と野獣エリア"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-xl font-bold text-white leading-tight">ディズニー記念日・誕生日特典まとめ 2026</h1>
            <p className="text-xs text-white/80 mt-1">バースデーシール・誕生日グリーティング・プロポーズ攻略まで完全ガイド</p>
          </div>
        </div>

        {/* バースデーシール */}
        <section className="bg-pink-50 border border-pink-200 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">バースデーシールとは</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            東京ディズニーリゾートでは、誕生日当日にパークを訪れると<strong>「バースデーシール」を無料でもらえます</strong>。パーク内の入口付近やゲストサービス、一部のショップでもらうことができます。
          </p>
          <div className="space-y-2">
            {[
              { title: "どこでもらえる？", body: "入園ゲートのキャストに「今日が誕生日です」と伝えるか、ゲストサービス（ワールドバザール内）で申し出るともらえます。" },
              { title: "特典はシールだけ？", body: "シールをつけていると、パーク内のキャストが「お誕生日おめでとうございます！」と声をかけてくれます。グリーティングでもキャラクターが特別に祝ってくれることがあります。" },
              { title: "当日でないともらえない？", body: "基本的に誕生日当日のみです。チケットに記載された名前と照合はされませんが、当日訪問がルールです。" },
            ].map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-3">
                <p className="text-sm font-bold text-pink-700 mb-1">{row.title}</p>
                <p className="text-xs text-gray-700">{row.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 誕生日に楽しむコツ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">誕生日をもっと特別にする方法</h2>
          <div className="space-y-3">
            {[
              {
                icon: "🎂",
                title: "バースデーケーキの注文",
                body: "パーク内の一部レストランでは、事前予約でバースデーケーキを注文できます。誕生日のサプライズ演出としてレストランのキャストが歌いながら運んでくれる場合もあります。希望する場合は事前にレストランへ電話または公式サイトから確認しましょう。",
              },
              {
                icon: "📸",
                title: "ディズニーフォトパスの活用",
                body: "パーク内に多数いるカメラマン（フォトグラファー）が撮影してくれる「ディズニーフォトパス」を活用して、誕生日の記念写真を残しましょう。バースデーシールをつけた状態でのショットは一生の思い出になります。",
              },
              {
                icon: "🧸",
                title: "誕生日限定グッズをチェック",
                body: "毎年デザインが変わる誕生日限定グッズ（Tシャツ・ぬいぐるみ・バッジなど）が販売されています。人気商品は早い時間に売り切れることも多いため、入園直後のショッピングタイムに立ち寄るのがおすすめです。",
              },
              {
                icon: "✨",
                title: "グリーティングで特別なお祝い",
                body: "グリーティングでバースデーシールをつけていると、キャラクターが特別にお祝いしてくれることがあります。ミッキーやミニーとのグリーティングは特に人気が高く、誕生日当日は感動の体験になることも。公式アプリでグリーティング場所・時間を確認しておきましょう。",
              },
            ].map((row, i) => (
              <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-2xl shrink-0">{row.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{row.title}</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{row.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* カップル・プロポーズ */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">カップル・記念日・プロポーズの攻略</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            東京ディズニーリゾートは毎年多くのカップルがプロポーズを行う場所としても知られています。成功のためのポイントをまとめました。
          </p>

          {/* プロポーズスポット画像 */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { id: "1054", name: "ニューファンタジーランド\n美女と野獣エリア" },
              { id: "521", name: "ファンタジーランド\nピーター・パン周辺" },
            ].map((spot) => (
              <div key={spot.id} className="relative rounded-xl overflow-hidden" style={{ height: 100 }}>
                <Image
                  src={`https://media1.tokyodisneyresort.jp/images/adventure/attraction/${spot.id}_thum_name.jpg`}
                  alt={spot.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white text-[10px] font-bold leading-tight whitespace-pre-line">{spot.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-sm font-bold text-red-700 mb-2">プロポーズにおすすめのスポット</h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex gap-2"><span className="text-red-400 shrink-0">♥</span><span><strong>シンデレラ城前広場</strong>：夜のイルミネーション時が特に幻想的。パレード後の余韻の中でのプロポーズが人気。</span></li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">♥</span><span><strong>ウエスタンランドの木陰</strong>：開放的で自然な雰囲気。昼間は木漏れ日がロマンチックな空間を演出。</span></li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">♥</span><span><strong>ニューファンタジーランド</strong>：美女と野獣のお城周辺は非日常的な空間でプロポーズの雰囲気が抜群。</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="text-sm font-bold text-red-700 mb-2">成功のためのコツ</h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">・</span><span>タイミングはパレード・ショーの終演後、ふたりでゆっくり歩いている時が自然</span></li>
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">・</span><span>ディズニーフォトグラファーに事前に相談すると、サプライズプロポーズを撮影してもらえることがある（要確認）</span></li>
                <li className="flex gap-2"><span className="text-gray-400 shrink-0">・</span><span>指輪はショップの袋に入れてパーク内に持ち込むのが自然。プロポーズ後にシンデレラ城をバックに記念撮影を</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 記念日おすすめコース */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">記念日・誕生日おすすめコース（ランド）</h2>
          <p className="text-sm text-gray-600 mb-3">1日を通じた記念日プランの一例です。</p>
          <div className="space-y-2">
            {[
              { time: "入園直後", desc: "バースデーシールをもらいながら入園。DPAを購入してから最優先アトラクションへ。" },
              { time: "午前中", desc: "人気アトラクション攻略。美女と野獣・プーさんなど誕生日の相手が乗りたいものを優先。" },
              { time: "11時頃", desc: "お気に入りのレストランで早めのランチ。事前予約していればバースデーケーキのサプライズ演出も。" },
              { time: "午後", desc: "グリーティングスポットへ。バースデーシールをつけてミッキーやプリンセスと記念写真。" },
              { time: "夕方", desc: "限定グッズのお土産を購入。夕暮れ時のシンデレラ城の写真も忘れずに。" },
              { time: "夜", desc: "夜のパレード・イルミネーションを鑑賞。閉園前に最後のアトラクションを楽しんで締めくくり。" },
            ].map((row, i) => (
              <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-xs font-bold text-gray-500 shrink-0 w-16 mt-0.5">{row.time}</span>
                <p className="text-xs text-gray-700">{row.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* よくある質問 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">よくある質問</h2>
          <div className="space-y-3">
            {[
              { q: "バースデーシールは無料でもらえますか？", a: "はい、無料です。入園ゲートのキャストに誕生日であることを伝えるか、ゲストサービスで申し出ると無料でプレゼントしてもらえます。" },
              { q: "誕生日に入場料は無料になりますか？", a: "残念ながら入場料の割引や無料サービスはありません。チケットは通常通り購入が必要です。バースデーシールと、キャストやキャラクターの特別なお祝いが主な特典です。" },
              { q: "誕生日でも混雑は変わりますか？", a: "誕生日であってもパークの混雑状況は変わりません。混雑カレンダーで訪問日の混雑を事前に確認し、できるだけ空いている日を選ぶのがおすすめです。" },
              { q: "記念日（誕生日以外）でも特典はありますか？", a: "結婚記念日・入籍日などの場合、特定の特典はありませんが、キャストに伝えると祝福してもらえることがあります。記念日専用のアニバーサリーシールを作っているショップもあります（公式グッズとして）。" },
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
            <p className="text-sm font-bold text-white">当日のリアルタイム待ち時間を確認</p>
            <span className="text-white">›</span>
          </Link>
          <Link href="/guide/first-time-tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">初めてのディズニーランド完全攻略</p>
              <p className="text-xs text-gray-500">チケット・DPA・回り方ガイド</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。<br />
          特典・サービス内容は変更になる場合があります。最新情報は公式サイトでご確認ください。
        </p>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1"><Link href="/privacy" className="underline">プライバシーポリシー</Link></p>
      </footer>

      <Script id="anniversary-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "ディズニー記念日・誕生日特典まとめ 2026｜バースデーシールの使い方",
        "description": "東京ディズニーランド・シーの誕生日・記念日特典を徹底解説。バースデーシール・グリーティング・誕生日限定グッズ・プロポーズ攻略まで完全ガイド。",
        "url": "https://disneynow.tokyo/guide/anniversary",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-05-01",
        "dateModified": "2026-05-01",
      })}} />
    </main>
  );
}
