import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニー持ち物リスト完全版 2026 | 忘れ物ゼロで楽しむ準備ガイド | TDLなう",
  description:
    "東京ディズニーランド・ディズニーシーの持ち物リスト完全版。必須アイテムから季節別・子連れ追加グッズまで、忘れると困るものを徹底解説。前日チェックリスト付き。",
  alternates: { canonical: "https://disneynow.tokyo/guide/packing-list" },
};

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

export default function PackingListPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/guide/first-time-tdl" className="hover:text-gray-600">攻略ガイド</Link>
          <span className="mx-1">/</span>
          <span>持ち物リスト完全版</span>
        </nav>

        {/* ヒーロー画像 */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
          <Image
            src={`${CDN}/1054_thum_name.jpg`}
            alt="東京ディズニーランド 美女と野獣"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <h1 className="text-2xl font-bold text-white leading-tight">
              ディズニー持ち物リスト完全版 2026
            </h1>
            <p className="text-sm text-white/80 mt-1">忘れ物ゼロで最高の1日を</p>
          </div>
        </div>

        {/* リード文 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6 text-sm text-gray-700 leading-relaxed">
          <p>
            ディズニーランド・ディズニーシーを120%楽しむには、<strong>事前準備が9割</strong>と言っても過言ではありません。
            入園当日に「あれ持ってくれば良かった」と後悔しないために、必須アイテムから便利グッズ、季節別の追加アイテムまで徹底的にまとめました。
            前日夜にこのページを開いてチェックするだけで、翌日の満足度が大きく変わります。
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8">
          <p className="text-xs font-bold text-blue-700 mb-3 uppercase tracking-wide">目次</p>
          <ul className="space-y-1.5 text-sm text-blue-600">
            <li><a href="#must" className="hover:underline">1. 絶対に必要な必須アイテム</a></li>
            <li><a href="#comfort" className="hover:underline">2. あると快適・便利なグッズ</a></li>
            <li><a href="#season" className="hover:underline">3. 季節別の持ち物（夏・冬・雨）</a></li>
            <li><a href="#kids" className="hover:underline">4. 子連れ・赤ちゃんがいる場合の追加アイテム</a></li>
            <li><a href="#ng" className="hover:underline">5. 持ち込みNG・注意が必要なアイテム</a></li>
            <li><a href="#checklist" className="hover:underline">6. 前日夜のチェックリスト</a></li>
          </ul>
        </nav>

        <div className="space-y-10">

          {/* 必須アイテム */}
          <section id="must">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-500 text-white text-sm font-bold flex items-center justify-center">1</span>
              絶対に必要な必須アイテム
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="relative rounded-xl overflow-hidden" style={{ height: 120 }}>
                <Image src={`${CDN}/1047_thum_name.jpg`} alt="ベイマックスのハッピーライド" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 text-white text-xs font-bold">スマホ必須！アプリで全て完結</p>
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ height: 120 }}>
                <Image src={`${CDN}/661_thum_name.jpg`} alt="プーさんのハニーハント" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 text-white text-xs font-bold">チケットはアプリで管理</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: "📱",
                  title: "スマートフォン（フル充電）",
                  body: "東京ディズニーリゾート公式アプリはDPA購入・待ち時間確認・ショースケジュール確認に必須。入園チケットもアプリのQRコードで管理します。バッテリーが切れると1日が詰みます。",
                },
                {
                  icon: "💳",
                  title: "チケット（アプリ連携済みのもの）",
                  body: "事前購入したチケットをアプリに連携しておきましょう。当日の入場はQRコードをかざすだけ。紙チケットの場合はスマホとは別に保管を。",
                },
                {
                  icon: "💰",
                  title: "現金＋クレジットカード",
                  body: "DPA（1,500〜2,000円/枚）やグルメ、グッズ購入で予想以上にお金を使います。1人あたり最低10,000〜15,000円は用意しましょう。キャッシュレス対応店舗も増えていますが、一部の屋台・キオスクでは現金が必要です。",
                },
                {
                  icon: "🆔",
                  title: "身分証明書",
                  body: "年齢確認やアルコール購入時に必要なケースがあります。年齢制限のあるアトラクションでの確認に使われることも。",
                },
                {
                  icon: "🔋",
                  title: "モバイルバッテリー",
                  body: "パーク内では1日中スマホを使います。地図確認・写真撮影・DPA操作でバッテリーが急速に減ります。10,000mAh以上のものを推奨。パーク内にも有料充電スポットがありますが、並ぶ時間が惜しいです。",
                },
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

          {/* 快適グッズ */}
          <section id="comfort">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">2</span>
              あると快適・便利なグッズ
            </h2>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 160 }}>
              <Image src={`${CDN}/521_thum_name.jpg`} alt="ピーター・パン空の旅" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-bold">快適な装備で1日中楽しもう</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { item: "歩きやすいスニーカー", detail: "パーク内は1日で1〜2万歩歩きます。ヒールやサンダルは絶対NG。クッション性の高いスニーカーを。足が痛くなると後半のモチベーションが激減します。" },
                { item: "小さめのリュックサック", detail: "両手が空くリュックが最適。グッズを買い足しても入るよう、最初は少し余裕のあるサイズで。斜めがけバッグはアトラクションで邪魔になることがあります。" },
                { item: "エコバッグ（折りたたみ）", detail: "グッズを大量購入した場合に便利。ディズニーの袋に入れてもらえますが、複数の店舗をまわるとかさばります。軽くてコンパクトなエコバッグがあれば安心。" },
                { item: "小型のイヤフォン", detail: "アトラクションの待ち時間に音楽・動画を楽しんだり、公式アプリの案内を聞いたりするのに便利。ワイヤレスだとストレスが少ない。" },
                { item: "ハンカチ・ウェットティッシュ", detail: "食事後・アトラクション後に手を拭く場面が多いです。ウェットティッシュは子連れでなくても重宝します。" },
                { item: "サングラス（晴れの日）", detail: "野外での待ち時間に日差しが強く、目が疲れやすくなります。特に夏は必携。" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.item}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 季節別 */}
          <section id="season">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">3</span>
              季節別の持ち物
            </h2>
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="font-bold text-orange-800 mb-2">夏（7〜9月）</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>・<strong>日焼け止め</strong>（SPF50以上推奨。こまめに塗り直しを）</li>
                  <li>・<strong>帽子</strong>（つばが広いもの。フードやキャップでも可）</li>
                  <li>・<strong>冷感タオル・ミストスプレー</strong>（炎天下の待ち時間に必携）</li>
                  <li>・<strong>着替え</strong>（スプラッシュ・マウンテン等の水系で濡れた際に）</li>
                  <li>・<strong>経口補水液・塩分タブレット</strong>（熱中症対策）</li>
                  <li>・<strong>虫よけスプレー</strong>（特に夕方以降のアウトドアエリアで）</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-bold text-blue-800 mb-2">冬（11〜3月）</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>・<strong>手袋・マフラー・ニット帽</strong>（夜は特に冷え込みます）</li>
                  <li>・<strong>カイロ</strong>（屋外待ち時間に手が悴む。貼るタイプを複数枚）</li>
                  <li>・<strong>保温効果のある下着・レギンス</strong>（インナーで調節が効率的）</li>
                  <li>・<strong>薄手のダウンジャケット</strong>（脱ぎ着しやすいものを）</li>
                  <li>・<strong>厚手の靴下</strong>（足元からの冷えは思った以上にきつい）</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="font-bold text-gray-800 mb-2">雨の日</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>・<strong>レインポンチョ</strong>（傘より両手が空いて便利。100均でも可）</li>
                  <li>・<strong>折りたたみ傘</strong>（ポンチョと併用するとより安心）</li>
                  <li>・<strong>防水スプレー</strong>（靴・バッグにかけておくと快適）</li>
                  <li>・<strong>ビニール袋・ジップロック</strong>（スマホ・財布の浸水防止）</li>
                  <li>・<strong>替えの靴下</strong>（靴が濡れると不快感が続くため必須）</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 子連れ */}
          <section id="kids">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center">4</span>
              子連れ・赤ちゃんがいる場合の追加アイテム
            </h2>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 140 }}>
              <Image src={`${CDN}/1110_thum_name.jpg`} alt="アナとエルサのフローズンジャーニー" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-bold">子連れでも万全の準備で安心</p>
            </div>
            <div className="space-y-2">
              {[
                { item: "着替え（子ども用）2〜3セット", detail: "食べこぼし・水濡れ・トイレの失敗に備えて多めに持参。特に乳幼児は必須。" },
                { item: "おやつ・ジュース", detail: "パーク内の食事は割高で行列も長い。子どもが空腹になった際の緊急用として持参すると助かります。密封できるものを。" },
                { item: "抱っこひも・ベビーカー", detail: "長時間歩くと幼児は必ず疲れます。ベビーカーはパーク内でもレンタル可能（有料）。持ち込みOK。" },
                { item: "おむつ・おしりふき", detail: "パーク内のベビーセンターでも購入できますが割高。多めに持参を。ベビーセンターはシンデレラ城の向かいにあります。" },
                { item: "常備薬・体温計", detail: "発熱・腹痛時に対応できるよう、子どもに合った薬を。解熱剤・酔い止めなどを準備しておくと安心。" },
                { item: "子どもの好きなキャラクターグッズ", detail: "お気に入りのキャラクターを入園前から持参しておくと、子どもがより興奮して楽しめます。" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <span className="text-pink-500 font-bold mt-0.5 shrink-0">✓</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.item}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NGアイテム */}
          <section id="ng">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center">5</span>
              持ち込みNG・注意が必要なアイテム
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3 text-sm">
              <div>
                <p className="font-bold text-red-800 mb-1">持ち込み禁止のもの</p>
                <ul className="text-gray-700 space-y-1">
                  <li>・自撮り棒（セルフィースティック）：全アトラクションで使用禁止</li>
                  <li>・三脚・一眼レフ用の大型機材：通路でのセッティング禁止</li>
                  <li>・花火・爆発物・刃物類：当然不可</li>
                  <li>・ドローン：パーク内・周辺での飛行不可</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-red-800 mb-1">注意が必要なもの</p>
                <ul className="text-gray-700 space-y-1">
                  <li>・外部からの食べ物の持ち込みは原則NG（アレルギー対応等の例外あり）</li>
                  <li>・大型のキャリーバッグはロッカーへの預け必須</li>
                  <li>・ペットの持ち込みは不可（ペットホテルあり）</li>
                  <li>・喫煙は指定喫煙エリアのみ</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 前日チェックリスト */}
          <section id="checklist">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">6</span>
              前日夜のチェックリスト
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-3">以下を確認してから就寝しましょう</p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {[
                  "スマホの充電：100%にしておく",
                  "モバイルバッテリーの充電：満タンか確認",
                  "公式アプリ：インストール・チケット連携済み",
                  "クレジットカード・現金：財布に入っているか",
                  "天気予報：翌日の天気に合わせた服・グッズを追加",
                  "交通手段・到着時間：ルートを確認",
                  "ショー・パレードのスケジュール：アプリで確認",
                  "着ていく服・靴：歩きやすいものに準備",
                  "子連れの場合：おむつ・着替え・おやつ",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-green-100">
                    <span className="w-4 h-4 rounded border-2 border-green-400 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ホテルアフィリエイト */}
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-gray-800 mb-1">宿泊も一緒に手配しておこう</p>
            <p className="text-xs text-gray-500 mb-3">パーク近くに泊まれば翌朝も安心。早めの予約がおすすめです。</p>
            <div className="flex gap-2">
              <a href="https://px.a8.net/svt/ejp?a8mat=4AZLSM+5N0U2A+14CS+64RJ5&a8ejpredirect=https%3A%2F%2Fwww.jalan.net%2Fuw%2Fuwp2011%2Fuww2011init.do%3Fkeyword%3D%2595%2591%2595%256C%26distCd%3D06%26rootCd%3D7701%26adultNum%3D2%26roomNum%3D1" target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm font-bold py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors">
                じゃらんで探す
              </a>
              <a href="https://hb.afl.rakuten.co.jp/hgc/522dc3a1.a8f621bb.522dc3a2.b6743386/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2Fhotel%2Fsearch%2F%3Ff_area%3D040602%26f_otona_su%3D2%26f_heya_su%3D1" target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm font-bold py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors">
                楽天トラベルで探す
              </a>
            </div>
          </section>

          {/* 関連ページ */}
          <div className="flex flex-col gap-2">
            <Link href="/guide/first-time-tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">初めてのディズニーランド完全攻略ガイド</p>
                <p className="text-xs text-gray-500">当日の動き方・DPA戦略まで</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
            <Link href="/dpa" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">DPA攻略ガイド</p>
                <p className="text-xs text-gray-500">どれから買う？売り切れ時間・優先順位</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
            <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
              <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
              <span className="text-white">›</span>
            </Link>
          </div>

        </div>

        <AmazonBanner
          keyword="テーマパーク 持ち物 便利グッズ"
          label="ディズニー持ち物・便利グッズをAmazonで探す"
          className="mt-6"
        />

        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。最新情報は公式サイトでご確認ください。
        </p>
      </div>

      <Script id="packing-list-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "ディズニー持ち物リスト完全版 2026",
        "description": "東京ディズニーランド・ディズニーシーの持ち物リスト完全版。必須アイテムから季節別・子連れ追加グッズまで徹底解説。",
        "url": "https://disneynow.tokyo/guide/packing-list",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-06-01",
        "dateModified": "2026-06-07",
      })}} />
    </main>
  );
}
