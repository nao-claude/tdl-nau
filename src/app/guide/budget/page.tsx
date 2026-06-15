import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニー費用・予算完全ガイド 2026 | 節約テクニックと1日の費用内訳 | TDLなう",
  description:
    "東京ディズニーランド・ディズニーシーの1日にかかる費用の内訳と節約テクニックを徹底解説。チケット・DPA・食費・グッズ代のリアルな予算シミュレーション付き。",
  alternates: { canonical: "https://disneynow.tokyo/guide/budget" },
};

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

export default function BudgetPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/guide/first-time-tdl" className="hover:text-gray-600">攻略ガイド</Link>
          <span className="mx-1">/</span>
          <span>費用・予算完全ガイド</span>
        </nav>

        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
          <Image src={`${CDN}/1005_thum_name.jpg`} alt="ソアリン：ファンタスティック・フライト" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <h1 className="text-2xl font-bold text-white leading-tight">ディズニー費用・予算完全ガイド 2026</h1>
            <p className="text-sm text-white/80 mt-1">1日の費用内訳と賢い節約テクニック</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6 text-sm text-gray-700 leading-relaxed">
          <p>
            「ディズニーに行くといくらかかるの？」は多くの方が気になる疑問です。
            チケット代だけでなく、DPA・食事・グッズ・交通費・宿泊費まで含めると
            <strong>1人あたり2〜5万円</strong>になることも珍しくありません。
            ここでは費用の全体像と、賢く節約するためのテクニックを詳しく解説します。
          </p>
        </div>

        <nav className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-sm">
          <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">目次</p>
          <ul className="space-y-1.5 text-sm text-blue-600">
            <li><a href="#ticket" className="hover:underline">1. チケット代（日程で変わる）</a></li>
            <li><a href="#dpa" className="hover:underline">2. DPA費用の考え方</a></li>
            <li><a href="#food" className="hover:underline">3. 食費・グルメ予算</a></li>
            <li><a href="#goods" className="hover:underline">4. グッズ・お土産代</a></li>
            <li><a href="#simulation" className="hover:underline">5. 予算シミュレーション</a></li>
            <li><a href="#saving" className="hover:underline">6. 節約テクニック7選</a></li>
          </ul>
        </nav>

        <div className="space-y-10">

          {/* チケット */}
          <section id="ticket">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. チケット代（日程で変わる）</h2>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 140 }}>
              <Image src={`${CDN}/461_thum_name.jpg`} alt="ビッグサンダー・マウンテン" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-bold">チケット代は日程によって最大3,000円差！</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              東京ディズニーリゾートの1デーパスポートは<strong>変動価格制</strong>を採用しています。
              閑散期の平日は7,900円〜、繁忙期のお盆・年末年始は10,900円になります。
              同じ体験をするなら、閑散期に行くだけで1人3,000円の節約になります。
            </p>
            <div className="space-y-2">
              {[
                { tier: "最安値（閑散期平日）", price: "7,900円", when: "1〜2月の平日・雨の日など", color: "bg-sky-50 border-sky-200 text-sky-800" },
                { tier: "標準（通常期）", price: "8,400〜9,400円", when: "春・秋の平日〜通常週末", color: "bg-green-50 border-green-200 text-green-800" },
                { tier: "やや高め（繁忙期）", price: "9,900円", when: "GW・ハロウィーン・クリスマス期", color: "bg-orange-50 border-orange-200 text-orange-800" },
                { tier: "最高値（超繁忙期）", price: "10,900円", when: "お盆・年末年始・一部連休", color: "bg-red-50 border-red-200 text-red-800" },
              ].map((row, i) => (
                <div key={i} className={`rounded-xl border p-3 ${row.color}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm">{row.tier}</p>
                    <p className="font-bold text-lg">{row.price}</p>
                  </div>
                  <p className="text-xs mt-1 opacity-80">{row.when}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">※大人（18歳以上）の1デーパスポート料金。価格は変更になる場合があります。</p>
          </section>

          {/* DPA */}
          <section id="dpa">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. DPA費用の考え方</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              DPA（ディズニー・プレミアアクセス）は1アトラクションにつき1,500〜2,000円。
              「高い」と感じるかもしれませんが、90〜180分の待ち時間をスキップできる価値を考えると、
              混雑日には費用対効果が非常に高いサービスです。
            </p>
            <div className="space-y-3">
              {[
                { budget: "DPAなし", cost: "0円", merit: "節約したい方向け。閑散期（A〜B判定）なら待ち時間が短いのでDPA不要の場面も多い。", risk: "混雑日は人気アトラクションに乗れない可能性大。" },
                { budget: "1枚（最優先のみ）", cost: "2,000円/人", merit: "美女と野獣（ランド）またはアナとエルサ（シー）の1本だけに集中投資。", risk: "その他アトラクションは並ぶ必要がある。" },
                { budget: "2〜3枚", cost: "3,500〜6,000円/人", merit: "「満足度と費用のベストバランス」。ほとんどの人がこの範囲に収まる。", risk: "予算は増えるが体験の質が大幅に向上する。" },
              ].map((row, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900 text-sm">{row.budget}</p>
                    <p className="font-bold text-blue-600">{row.cost}</p>
                  </div>
                  <p className="text-xs text-green-700 mb-1">メリット: {row.merit}</p>
                  <p className="text-xs text-orange-700">注意: {row.risk}</p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Link href="/dpa" className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-3 hover:bg-amber-100 transition-colors">
                <p className="text-sm font-bold text-amber-800">DPA完全攻略ガイドを見る</p>
                <span className="text-amber-600">›</span>
              </Link>
            </div>
          </section>

          {/* 食費 */}
          <section id="food">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. 食費・グルメ予算</h2>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 140 }}>
              <Image src={`${CDN}/71_thum_name.jpg`} alt="タワー・オブ・テラー" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-sm font-bold">グルメも体験のひとつ！賢く予算配分を</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              パーク内のグルメは、外の飲食店より高めですが「体験」として楽しむ要素が大きいです。
              ポップコーン・チュロスなどのスナックから、ガーリッシュハートのランチコースまで幅広いラインナップがあります。
            </p>
            <div className="space-y-2">
              {[
                { type: "スナック・軽食（ポップコーン・チュロス等）", min: "600〜", max: "1,500円" },
                { type: "クイックサービス（セルフレストラン）", min: "1,200〜", max: "2,000円" },
                { type: "フルサービスレストラン（テーブル席）", min: "2,500〜", max: "5,000円+" },
                { type: "ドリンク1杯", min: "400〜", max: "700円" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-3 shadow-sm text-sm">
                  <p className="text-gray-700">{row.type}</p>
                  <p className="font-bold text-gray-900 shrink-0 ml-2">¥{row.min}{row.max}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-xs font-bold text-green-800 mb-1">節約ポイント</p>
              <ul className="text-xs text-green-700 space-y-0.5">
                <li>・食事は11時台または14時台を狙うと行列が少ない</li>
                <li>・スナックをうまく活用すると食費を抑えられる</li>
                <li>・水はパーク内の飲水スポットで無料補給可能</li>
              </ul>
            </div>
          </section>

          {/* グッズ */}
          <section id="goods">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. グッズ・お土産代</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              グッズは「買う・買わない」の判断が難しい項目です。限定品やコラボグッズは後悔しやすいので、
              事前に購入したいものをリストアップしておくと予算オーバーを防げます。
            </p>
            <div className="space-y-2 text-sm">
              {[
                { item: "ぬいぐるみ（Mサイズ）", price: "3,000〜5,000円" },
                { item: "Tシャツ・パーカー", price: "3,000〜7,000円" },
                { item: "お菓子系お土産（1箱）", price: "800〜2,000円" },
                { item: "ポップコーンバケット", price: "2,500〜3,500円" },
                { item: "キーホルダー・ピンバッジ", price: "500〜2,000円" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <p className="text-gray-700">{row.item}</p>
                  <p className="font-bold text-gray-900">{row.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* シミュレーション */}
          <section id="simulation">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. 1日の予算シミュレーション</h2>
            <div className="space-y-4">
              {[
                {
                  title: "節約プラン（2人で約4万円）",
                  color: "border-green-300 bg-green-50",
                  items: [
                    { label: "チケット（閑散日）", value: "7,900円×2" },
                    { label: "DPA", value: "なし" },
                    { label: "食費", value: "2,000円×2" },
                    { label: "グッズ", value: "2,000円×2" },
                    { label: "合計", value: "約3万9,800円", bold: true },
                  ],
                },
                {
                  title: "標準プラン（2人で約6万円）",
                  color: "border-blue-300 bg-blue-50",
                  items: [
                    { label: "チケット（通常期）", value: "9,400円×2" },
                    { label: "DPA（2枚）", value: "3,500円×2" },
                    { label: "食費", value: "3,000円×2" },
                    { label: "グッズ", value: "3,000円×2" },
                    { label: "合計", value: "約5万8,800円", bold: true },
                  ],
                },
                {
                  title: "フルエンジョイプラン（2人で約9万円）",
                  color: "border-purple-300 bg-purple-50",
                  items: [
                    { label: "チケット（繁忙期）", value: "10,900円×2" },
                    { label: "DPA（3枚）", value: "5,500円×2" },
                    { label: "食費（レストラン含む）", value: "5,000円×2" },
                    { label: "グッズ", value: "5,000円×2" },
                    { label: "合計", value: "約8万2,800円", bold: true },
                  ],
                },
              ].map((plan, i) => (
                <div key={i} className={`rounded-2xl border p-4 ${plan.color}`}>
                  <p className="font-bold text-gray-800 mb-3">{plan.title}</p>
                  <div className="space-y-1.5">
                    {plan.items.map((item, j) => (
                      <div key={j} className={`flex justify-between text-sm ${item.bold ? "font-bold text-gray-900 border-t border-gray-300 pt-1.5 mt-1.5" : "text-gray-700"}`}>
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">※交通費・宿泊費は含みません。実際の費用は内容により変わります。</p>
          </section>

          {/* 節約テク */}
          <section id="saving">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. 節約テクニック7選</h2>
            <div className="space-y-3">
              {[
                { num: "01", title: "閑散日を狙う", body: "チケット代が最大3,000円/人安くなり、DPAも不要になる可能性が高い。混雑予想カレンダーでA〜B判定の日を選ぼう。" },
                { num: "02", title: "アーリーイブニングパスポートを活用", body: "15時以降入場のチケットは1デーより割安。仕事帰りや近隣在住の方には特におすすめ。夕方〜夜のアトラクションは比較的空いている。" },
                { num: "03", title: "DPAは厳選して1〜2枚に絞る", body: "全てのDPAを購入しようとすると1万円超えになる。「絶対に乗りたい1本」に絞れば2,000円で済む。" },
                { num: "04", title: "食事時間をずらす", body: "11時台と14時台は比較的空いており、並ばずに食事できる。12〜13時台は混雑ピークなのでアトラクションに使う方が効率的。" },
                { num: "05", title: "水はボトルを持参", body: "パーク内のドリンクは高め。水筒1本持参するだけで飲料費を節約できる（蓋がしっかり閉まるものを）。" },
                { num: "06", title: "グッズは帰り際にまとめて購入", body: "開園直後はショップが混雑。帰り際（17〜18時台）はショップが比較的空いており、ゆっくり選べる。衝動買いも防げる。" },
                { num: "07", title: "お土産は限定品だけに絞る", body: "ディズニーのお菓子系グッズは近隣の商業施設でも購入できるものがある。パーク限定品を優先し、汎用品は帰り道で調達する方法も。" },
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

          {/* ホテルアフィリエイト */}
          <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-gray-800 mb-1">宿泊付きなら移動費・時間も節約できる</p>
            <p className="text-xs text-gray-500 mb-3">遠方からの場合、近くのホテルに泊まるとトータルコストが下がることも。</p>
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
            <Link href="/dpa" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">DPA完全攻略ガイド</p>
                <p className="text-xs text-gray-500">どれから買う？費用対効果の高い選び方</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </div>

        </div>
        <AmazonBanner keyword="ディズニー 節約 グッズ" label="ディズニー節約グッズをAmazonで探す" className="mt-4" />

        <p className="text-xs text-gray-400 text-center mt-8">当サイトは東京ディズニーリゾートの非公式サイトです。料金は変更になる場合があります。</p>
      </div>

      <Script id="budget-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "ディズニー費用・予算完全ガイド 2026",
        "description": "東京ディズニーランド・ディズニーシーの1日にかかる費用の内訳と節約テクニックを徹底解説。",
        "url": "https://disneynow.tokyo/guide/budget",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-06-07",
        "dateModified": "2026-06-07",
      })}} />
    </main>
  );
}
