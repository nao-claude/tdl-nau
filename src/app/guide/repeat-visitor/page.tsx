import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニーリピーター・2回目以降の攻略ガイド 2026 | 穴場・マニアック情報 | TDLなう",
  description:
    "東京ディズニーランド・ディズニーシーのリピーター向け攻略ガイド。初心者では気づかない穴場スポット・隠れた見どころ・効率的な回り方を徹底解説。",
  alternates: { canonical: "https://disneynow.tokyo/guide/repeat-visitor" },
};

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

export default function RepeatVisitorPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/guide/first-time-tdl" className="hover:text-gray-600">攻略ガイド</Link>
          <span className="mx-1">/</span>
          <span>リピーター向け攻略ガイド</span>
        </nav>

        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
          <Image src={`${CDN}/631_thum_name.jpg`} alt="センター・オブ・ジ・アース" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <h1 className="text-2xl font-bold text-white leading-tight">リピーター・2回目以降の攻略ガイド 2026</h1>
            <p className="text-sm text-white/80 mt-1">知っている人だけが得する穴場・テクニック集</p>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            ディズニーに何度も来ているリピーターには、初心者にはわからない「知る人ぞ知る楽しみ方」があります。
            定番アトラクションをひと通り楽しんだ方が次のステップとして知っておきたい、
            穴場スポット・効率的な動き方・隠れた見どころを徹底的にまとめました。
          </p>
        </div>

        <nav className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-sm">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">目次</p>
          <ul className="space-y-1.5 text-sm text-blue-600">
            <li><a href="#timing" className="hover:underline">1. リピーターが知る「空いている時間帯・曜日」</a></li>
            <li><a href="#hidden" className="hover:underline">2. 見落としがちな隠れた名スポット</a></li>
            <li><a href="#strategy" className="hover:underline">3. リピーターの効率的な回り方</a></li>
            <li><a href="#seasonal" className="hover:underline">4. 季節・イベントごとの新しい楽しみ方</a></li>
            <li><a href="#detail" className="hover:underline">5. アトラクションの細かい見どころ</a></li>
            <li><a href="#next" className="hover:underline">6. 次のステップ：年パス・プレミアムな体験</a></li>
          </ul>
        </nav>

        <div className="space-y-10">

          {/* 空いている時間帯 */}
          <section id="timing">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. リピーターが知る「空いている時間帯・曜日」</h2>
            <div className="space-y-3">
              {[
                {
                  title: "平日の午後14〜16時が最も空いている",
                  body: "午前中の混雑が落ち着き、まだ帰宅者が増えていないこの時間帯は、待ち時間がぐっと下がる「ゴールデンタイム」です。昼食を早めに済ませて、14時から人気アトラクションを攻めるのがリピーターの定石。",
                },
                {
                  title: "パレード・ショー中はアトラクションが空く",
                  body: "「パレード抜け」と呼ばれるテクニック。多くの来園者がパレード観覧に集中している時間帯は、アトラクションの待ち時間が半減することがあります。パレードに興味が薄いリピーターはこの時間を最大活用しましょう。",
                },
                {
                  title: "閉園1〜2時間前の「ラストチャンスタイム」",
                  body: "閉園が近くなると帰宅者が増え、残っている来園者が分散します。普段60〜90分待ちのアトラクションが20〜30分で乗れることも。夜のパーク独特の雰囲気も楽しめる「リピーターだけが知る時間帯」です。",
                },
                {
                  title: "1月〜2月の平日が年間最閑散期",
                  body: "学校の冬休みが終わり、春休みまでの時期が年間で最も空いています。人気アトラクションでも待ち時間10〜30分が当たり前。DPA不要で人気アトラクションを何度も乗れる唯一の時期です。",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <p className="font-bold text-gray-900 text-sm mb-2">{item.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 隠れスポット */}
          <section id="hidden">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. 見落としがちな隠れた名スポット</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="relative rounded-xl overflow-hidden" style={{ height: 110 }}>
                <Image src={`${CDN}/1047_thum_name.jpg`} alt="ベイマックスのハッピーライド" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 text-white text-xs font-bold">知らなかった!</p>
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ height: 110 }}>
                <Image src={`${CDN}/11_thum_name.jpg`} alt="イッツ・ア・スモールワールド" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-2 text-white text-xs font-bold">細部に注目</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { park: "TDL", spot: "ウエスタンランドの川沿い散歩道", desc: "マーク・トウェイン号が通る川沿いを歩くと、ビッグサンダー・マウンテンの全景や、西部劇の雰囲気満点の風景が楽しめます。混雑を避けながら散歩するだけでも絵になります。" },
                { park: "TDL", spot: "トムソーヤ島", desc: "いかだで渡る小さな島。自由に探索でき、洞窟・吊り橋・砦などがあります。行列を離れてほっと一息つけるリピーター御用達のスポット。穴場中の穴場です。" },
                { park: "TDS", spot: "フォートレス・エクスプロレーション", desc: "アトラクションではなく「探索型の体験エリア」。様々な謎解き・仕掛けが隠されており、時間を忘れて楽しめます。空いているのに充実した時間を過ごせる穴場。" },
                { park: "TDS", spot: "ミステリアスアイランドの地底世界展示", desc: "センター・オブ・ジ・アースの周辺には、ジュール・ヴェルヌの世界観を再現した展示が点在。アトラクションに乗るだけでなく、エリア全体の世界観を味わうと何倍も楽しめます。" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.park === "TDL" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}>{item.park}</span>
                    <p className="font-bold text-gray-900 text-sm">{item.spot}</p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 効率的な回り方 */}
          <section id="strategy">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. リピーターの効率的な回り方</h2>
            <div className="space-y-3">
              {[
                { num: "01", title: "「乗りたいリスト」を3本に絞る", body: "全てのアトラクションを制覇しようとせず、その日の「絶対乗りたいTOP3」を決めて優先する。残りは待ち時間次第で判断。これだけで1日の充実度が格段に上がります。" },
                { num: "02", title: "リアルタイム待ち時間を活用する", body: "TDLなうのようなリアルタイム待ち時間サービスを活用して、待ち時間が短いアトラクションを狙い撃ちする。30分ごとに確認して「今が狙い目」のアトラクションへ素早く動く。" },
                { num: "03", title: "「休憩エリア」を予め把握しておく", body: "混雑時に疲れたときに座れるスポットを知っておく。ステージエリアの客席、レストランのテラス席、公園エリアのベンチなど。立っているだけで体力を消耗するので戦略的な休憩が重要。" },
                { num: "04", title: "同じアトラクションを2回乗る", body: "リピーターならではの「推しアトラクション2回乗り戦略」。開園直後と閉園間際の両方に乗ることで、混雑時と閑散時の違いを楽しめます。センター・オブ・ジ・アースは特に夜景が絶景。" },
              ].map((tip) => (
                <div key={tip.num} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <span className="text-2xl font-black text-gray-200 shrink-0 leading-none">{tip.num}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{tip.title}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 季節・イベント */}
          <section id="seasonal">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 季節・イベントごとの新しい楽しみ方</h2>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 140 }}>
              <Image src={`${CDN}/1110_thum_name.jpg`} alt="アナとエルサのフローズンジャーニー" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-bold">季節ごとに変わる限定コンテンツ</p>
            </div>
            <div className="space-y-3">
              {[
                { season: "春（3〜5月）", event: "ディズニー・イースター", point: "エッグをモチーフにした限定グッズ・フード・装飾。キャラクターのイースターコスチュームが可愛い。パークが花と色彩に溢れる最も華やかな季節。" },
                { season: "夏（6〜9月）", event: "ディズニー・サマー", point: "夏限定の水を使ったグリーティング・パレードが登場。夜のイベントも充実し、暑さを忘れて楽しめる演出が多い。スプラッシュ・マウンテンも夏が一番の体験。" },
                { season: "秋（9〜10月）", event: "ディズニー・ハロウィーン", point: "仮装した来園者で埋め尽くされる特別な雰囲気。コスチュームでの入園が許可される日があり、パーク全体がコスプレイヤーの祭典に。ヴィランズが主役の限定グッズも魅力。" },
                { season: "冬（11〜12月）", event: "ディズニー・クリスマス", point: "シンデレラ城のクリスマス装飾は圧巻。夜のイルミネーションが最も美しい季節。限定グッズはクリスマス期間にしか買えないものが多く、リピーターは毎年楽しみにしている。" },
              ].map((row, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-500">{row.season}</span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">{row.event}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{row.point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 細かい見どころ */}
          <section id="detail">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. アトラクションの細かい見どころ</h2>
            <div className="space-y-3">
              {[
                { name: "美女と野獣（TDL）", tip: "ライドショー中、様々な部屋を通過する際のセットの細かさに注目。何度乗っても新しい発見があります。特にビーストの図書館のシーンは圧巻。" },
                { name: "ホーンテッドマンション（TDL）", tip: "999体の幽霊が至る所に隠されています。天井・壁・鏡など、注意深く見ると毎回違う発見が。「ヒッチハイク・ゴースト」が最後に自分のライドに乗ってくるのも見どころ。" },
                { name: "イッツ・ア・スモールワールド（TDL）", tip: "世界各国のキャラクターが登場する中に、ディズニーキャラクターが各国の衣装を着て隠れています。探しながら乗ると全然違う楽しみ方ができます。" },
                { name: "センター・オブ・ジ・アース（TDS）", tip: "最後のドロップ前に地底の怪物が現れますが、その直前に窓から外の絶景（夜なら夜景）が見えます。一瞬だけ現れるこの景色に気づいているリピーターは少ない。" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-indigo-100 p-4 shadow-sm">
                  <p className="font-bold text-indigo-800 text-sm mb-1">{item.name}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 次のステップ */}
          <section id="next">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. 次のステップ：プレミアムな体験</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <p className="font-bold text-gray-900 text-sm mb-2">グリーティング体験</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  アトラクション攻略に慣れてきたら、キャラクターグリーティングを楽しむフェーズへ。
                  ミッキーやミニーと直接握手・写真撮影できる体験は、アトラクションとはまた別の特別な思い出になります。
                  人気キャラクターは行列ができるので、グリーティングの場所を事前に確認しておきましょう。
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <p className="font-bold text-gray-900 text-sm mb-2">バックステージツアー（不定期開催）</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  普段は入れないパークの裏側を見学できる特別プログラム。
                  開催は不定期で、公式サイトから申し込みが必要です。
                  ディズニーマニアを自称するなら、一度は参加したい体験です。
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <p className="font-bold text-gray-900 text-sm mb-2">スペシャルイベント参加</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  年に数回開催される特別チケットが必要な夜間イベントは、通常来園とは別次元の体験ができます。
                  来園者数が限定されるため普段とは比べものにならない快適さで楽しめ、限定グッズも入手できます。
                </p>
              </div>
            </div>
          </section>

          {/* ホテルアフィリエイト */}
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-gray-800 mb-1">近くに泊まれば朝イチから動ける</p>
            <p className="text-xs text-gray-500 mb-3">リピーターこそ開園ダッシュが勝負。近隣ホテルへの宿泊で最大限に楽しもう。</p>
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
            <Link href="/guide/first-time-tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">初めてのディズニーランド完全攻略</p>
                <p className="text-xs text-gray-500">基本の攻略はこちら</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </div>
        </div>

        <AmazonBanner keyword="ディズニー グッズ 限定" label="ディズニー限定グッズをAmazonで探す" className="mt-4" />

        <p className="text-xs text-gray-400 text-center mt-8">当サイトは東京ディズニーリゾートの非公式サイトです。</p>
      </div>

      <Script id="repeat-visitor-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "ディズニーリピーター・2回目以降の攻略ガイド 2026",
        "description": "初心者では気づかない穴場スポット・隠れた見どころ・効率的な回り方を徹底解説。",
        "url": "https://disneynow.tokyo/guide/repeat-visitor",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-06-07",
        "dateModified": "2026-06-07",
      })}} />
    </main>
  );
}
