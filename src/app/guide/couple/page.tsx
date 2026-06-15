import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニーデート・カップル攻略ガイド 2026 | フォトスポット・おすすめプラン | TDLなう",
  description:
    "東京ディズニーランド・ディズニーシーのカップル・デート攻略ガイド。おすすめアトラクション・フォトスポット・ディナー予約・プロポーズ情報まで徹底解説。",
  alternates: { canonical: "https://disneynow.tokyo/guide/couple" },
};

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

export default function CouplePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/guide/first-time-tdl" className="hover:text-gray-600">攻略ガイド</Link>
          <span className="mx-1">/</span>
          <span>カップル・デート攻略ガイド</span>
        </nav>

        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
          <Image src={`${CDN}/1117_thum_name.jpg`} alt="ラプンツェルのランタンフェスティバル" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <h1 className="text-2xl font-bold text-white leading-tight">ディズニーデート・カップル攻略ガイド 2026</h1>
            <p className="text-sm text-white/80 mt-1">最高の思い出を作るための完全プラン</p>
          </div>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            東京ディズニーリゾートは、カップルにとって最高のデートスポットのひとつです。
            非日常の世界観、2人で乗れるライドアトラクション、夜の幻想的な演出——。
            でも「せっかく来たのに待ち時間ばかりで疲れた」という経験をしないために、
            カップル向けの攻略ポイントをまとめました。
          </p>
        </div>

        <nav className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-sm">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">目次</p>
          <ul className="space-y-1.5 text-sm text-blue-600">
            <li><a href="#attractions" className="hover:underline">1. カップルにおすすめのアトラクション</a></li>
            <li><a href="#photo" className="hover:underline">2. 2人の写真が映えるフォトスポット</a></li>
            <li><a href="#dinner" className="hover:underline">3. ディナー・レストランの予約術</a></li>
            <li><a href="#goods" className="hover:underline">4. カップル向けグッズ・ペアコーデ</a></li>
            <li><a href="#propose" className="hover:underline">5. プロポーズ・記念日の活用</a></li>
            <li><a href="#plan" className="hover:underline">6. カップルにおすすめの1日プラン</a></li>
          </ul>
        </nav>

        <div className="space-y-10">

          {/* アトラクション */}
          <section id="attractions">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. カップルにおすすめのアトラクション</h2>

            <h3 className="text-base font-bold text-gray-700 mb-3">東京ディズニーシー（特におすすめ）</h3>
            <div className="space-y-3 mb-5">
              {[
                { name: "ラプンツェルのランタンフェスティバル", imageId: 1117, area: "ファンタジースプリングス", desc: "映画「塔の上のラプンツェル」の世界を体感するボートライド。幻想的なランタンが飛び交うフィナーレシーンは思わず2人で見惚れてしまう美しさ。ロマンチック度No.1。" },
                { name: "アナとエルサのフローズンジャーニー", imageId: 1110, area: "ファンタジースプリングス", desc: "「アナと雪の女王」の世界を旅するボートライド。壮大なスケールの映像美と音楽が2人を包み込む。カップルに絶大な人気を誇る最新アトラクション。" },
                { name: "ヴェネツィアン・ゴンドラ", imageId: 581, area: "メディテレーニアンハーバー", desc: "本格的なゴンドラで港を周遊する優雅な体験。ゴンドリエーレが歌を歌いながら案内してくれる。「ディズニーシーらしさ」を一番感じられるアトラクション。" },
              ].map((a) => (
                <div key={a.name} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 80, height: 80 }}>
                    <Image src={`${CDN}/${a.imageId}_thum_name.jpg`} alt={a.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{a.name}</p>
                    <p className="text-xs text-pink-600 mb-1">{a.area}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-base font-bold text-gray-700 mb-3">東京ディズニーランド</h3>
            <div className="space-y-3">
              {[
                { name: "美女と野獣「魔法のものがたり」", imageId: 1054, area: "ニューファンタジーランド", desc: "ベルとビーストの世界を追体験する大型ライドショー。映画のシーンを再現した美しいセットと音楽で、2人の世界に引き込まれる体験ができる。" },
                { name: "ホーンテッドマンション", imageId: 611, area: "リバティスクエア", desc: "「怖いけどなぜか楽しい」雰囲気がカップルに人気。お互いの反応を見ながら楽しむ独特の体験。ダークでロマンチックな世界観がたまらない。" },
              ].map((a) => (
                <div key={a.name} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 80, height: 80 }}>
                    <Image src={`${CDN}/${a.imageId}_thum_name.jpg`} alt={a.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{a.name}</p>
                    <p className="text-xs text-blue-600 mb-1">{a.area}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* フォトスポット */}
          <section id="photo">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. 2人の写真が映えるフォトスポット</h2>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 140 }}>
              <Image src={`${CDN}/1124_thum_name.jpg`} alt="ピーター・パンのネバーランドアドベンチャー" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-bold">撮影スポットで最高の思い出を</p>
            </div>
            <div className="space-y-3">
              {[
                { spot: "シンデレラ城前（TDL）", timing: "開園直後 or 夜のプロジェクションマッピング時", tip: "正面から撮ると城が大きく映る定番スポット。開園直後は人が少なく撮りやすい。夜はライトアップで幻想的に。" },
                { spot: "ワールドバザール（TDL）", timing: "朝の開園直後", tip: "レトロなアメリカンな街並みが続く屋内エリア。雨でも濡れない。おしゃれな写真が撮れるスポットが多い。" },
                { spot: "メディテレーニアンハーバー（TDS）", timing: "夕方〜日没後", tip: "TDSの象徴ともいえる港エリア。噴水・ゴンドラ・建物が絵になる。夕日の時間帯が特に美しい。" },
                { spot: "ファンタジースプリングス（TDS）", timing: "午前中（比較的空いている時間）", tip: "2024年開業の最新エリア。ラプンツェル・アナ雪・ピーターパンの世界が広がり、どこを撮っても絵になる。" },
              ].map((spot, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="font-bold text-gray-900 text-sm mb-1">{spot.spot}</p>
                  <p className="text-xs text-pink-600 mb-1">おすすめ時間：{spot.timing}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{spot.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ディナー */}
          <section id="dinner">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. ディナー・レストランの予約術</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              TDSの「ミラコスタ」やTDLの「クリスタルパレス」など人気レストランは、
              <strong>最大180日前から予約</strong>できます。デートで特別なディナーを計画している場合は早めの予約が必須です。
            </p>
            <div className="space-y-3">
              {[
                { name: "ホテルミラコスタ（TDS隣接）", desc: "TDSを一望できる絶景レストラン。記念日・誕生日のディナーに最適。コース料理あり。予約は公式サイトから。" },
                { name: "ブルーバイユー・レストラン（TDL）", desc: "カリブの海賊の船着き場に隣接した幻想的なレストラン。薄暗い雰囲気がロマンチック。月明かりの下のような演出が人気。" },
                { name: "マゼランズ（TDS）", desc: "マゼランの時代をテーマにした本格コース料理レストラン。特別な日にぴったりの雰囲気。2人の記念日に特別なコースを。" },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="font-bold text-gray-900 text-sm mb-1">{r.name}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs font-bold text-amber-800 mb-1">予約のコツ</p>
              <ul className="text-xs text-amber-700 space-y-0.5">
                <li>・東京ディズニーリゾート公式アプリ・サイトから予約</li>
                <li>・人気レストランは180日前に一斉解放される→解放日を確認</li>
                <li>・記念日・誕生日の旨を伝えると特別な演出がある場合も</li>
              </ul>
            </div>
          </section>

          {/* グッズ */}
          <section id="goods">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. カップル向けグッズ・ペアコーデ</h2>
            <div className="space-y-3">
              {[
                { title: "ペアカチューシャ", body: "ミッキー&ミニーのペアカチューシャをつけてパーク内を歩くのはカップルの定番。ディズニーならではの体験として大切な思い出になります。種類が豊富なのでお気に入りの1セットを見つけて。" },
                { title: "ペアぬいぐるみ・フィギュア", body: "ミッキー&ミニーやデール&チップのペア商品は、家に帰っても2人の思い出として飾れるグッズ。限定デザインはシーズンごとに変わるので、その日だけの特別なものが手に入ることも。" },
                { title: "フォトマグネットサービス", body: "パーク内にあるフォトスポットで公式カメラマンに撮影してもらうサービスがあります（有料）。プロが撮る2人の写真は特別な思い出になります。" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="font-bold text-gray-900 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* プロポーズ */}
          <section id="propose">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. プロポーズ・記念日の活用</h2>
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 space-y-3">
              <div>
                <p className="font-bold text-pink-800 mb-1">バースデーシール・記念日シール</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  誕生日や記念日には、入園ゲートでキャストにお願いするとお祝いシールがもらえます（無料）。
                  シールをつけているとキャストからも「おめでとうございます」と声をかけてもらえることがあり、特別感が増します。
                </p>
              </div>
              <div>
                <p className="font-bold text-pink-800 mb-1">プロポーズのベストスポット</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  メディテレーニアンハーバーの夕景や、シンデレラ城前でのプロポーズは多くのカップルが選ぶ定番スポット。
                  夜のイルミネーションタイムに合わせると、より一層ロマンチックな演出になります。
                  事前に指輪や花束を用意しておきましょう。キャストに相談すると秘密裏にサポートしてもらえる場合もあります。
                </p>
              </div>
              <div>
                <p className="font-bold text-pink-800 mb-1">ファストパスで記念日をサポート</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  プロポーズを考えている場合は、2人が最も思い入れのあるアトラクションの後にするのがおすすめ。
                  感動や興奮が高まった状態でのサプライズは、より深く記憶に残ります。
                </p>
              </div>
            </div>
          </section>

          {/* プラン */}
          <section id="plan">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. カップルにおすすめの1日プラン（TDS）</h2>
            <div className="space-y-2">
              {[
                { time: "開園直後", icon: "🎯", desc: "DPA購入（ラプンツェル or アナとエルサを最優先）。ファンタジースプリングスエリアへ直行してオープニングの空気を感じる。" },
                { time: "9:00〜11:30", icon: "🎢", desc: "ファンタジースプリングスの3アトラクション（ラプンツェル・アナとエルサ・ピーターパン）を中心に回る。どれも2人で座れるシート設定。" },
                { time: "11:30〜13:00", icon: "🍽", desc: "早めのランチ。マゼランズ等の本格レストランを予約していればこの時間帯が理想。予約なしの場合はクイックサービスで早めに済ませる。" },
                { time: "13:00〜16:00", icon: "✨", desc: "ソアリン・センター・オブ・ジ・アース・インディジョーンズなど、2人で楽しめる絶叫系・体験型アトラクションへ。ヴェネツィアン・ゴンドラも乗りたい。" },
                { time: "16:00〜17:30", icon: "📸", desc: "夕日の時間帯のメディテレーニアンハーバーで写真撮影。夕景が最も美しい時間。ショッピングはこの時間帯が比較的空いている。" },
                { time: "18:00〜閉園", icon: "🌙", desc: "夜の演出・イルミネーションを楽しむ。ハーバーイベントがある日は必見。閉園ギリギリまで雰囲気を楽しんで。" },
              ].map((row, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="shrink-0">
                    <span className="text-xl">{row.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-pink-600 mb-0.5">{row.time}</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ホテルアフィリエイト */}
          <section className="bg-pink-50 border border-pink-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-gray-800 mb-1">2人でゆっくり宿泊プランも</p>
            <p className="text-xs text-gray-500 mb-3">デートに宿泊をプラスすると、移動の疲れが減ってもっと楽しめます。</p>
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
            <Link href="/guide/anniversary" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">誕生日・記念日特典ガイド</p>
                <p className="text-xs text-gray-500">バースデーシール・特別演出の詳細</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">当サイトは東京ディズニーリゾートの非公式サイトです。</p>
      </div>

      <Script id="couple-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "ディズニーデート・カップル攻略ガイド 2026",
        "description": "カップルにおすすめのアトラクション・フォトスポット・ディナー予約・プロポーズ情報まで徹底解説。",
        "url": "https://disneynow.tokyo/guide/couple",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-06-07",
        "dateModified": "2026-06-07",
      })}} />
    </main>
  );
}
