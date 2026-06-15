import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { AdBanner } from "@/components/AdBanner";
import { RakutenWidgetResponsive, AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ディズニー近隣ホテル完全ガイド 2026【楽天・じゃらん最安値比較】| TDLなう",
  description:
    "東京ディズニーランド・ディズニーシー周辺のおすすめホテルを徹底比較。オフィシャルホテルから格安ホテルまで、シャトルバス・料金・アクセスを詳しく解説。楽天トラベル・じゃらんで最安値をチェック。",
  alternates: { canonical: "https://disneynow.tokyo/guide/hotel" },
};

const AF = "https://hb.afl.rakuten.co.jp/hgc/522dc3a1.a8f621bb.522dc3a2.b6743386/?pc=";
const rakutenHotel = (id: number) => `${AF}${encodeURIComponent(`https://hotel.travel.rakuten.co.jp/hinfo/${id}/`)}`;
const RAKUTEN_TDR  = `${AF}${encodeURIComponent("https://travel.rakuten.co.jp/tdr/")}`;
const JALAN_MAIHAMA = "https://www.jalan.net/sen/SEN210000/?prefCode=13&distCode=1306";

const OFFICIAL_HOTELS = [
  {
    name: "ヒルトン東京ベイ",
    rakutenId: 1405,
    price: "3万〜7万円/室",
    access: "リゾートラインで舞浜駅から約3分",
    point: "全室ディズニーリゾートビューが選択可能。大型施設でプール・スパあり。",
    recommend: "記念日・贅沢旅行",
    recommendColor: "text-pink-600",
    image: "https://img.travel.rakuten.co.jp/share/image_up/1405/LARGE/4163fd2ba454e531c22ea0e44852bcb1e6c7b8ff.47.9.26.3.jpg",
    imageAlt: "ヒルトン東京ベイ 外観",
    gradientFrom: "from-blue-700",
    gradientTo: "to-indigo-900",
  },
  {
    name: "シェラトン・グランデ・トーキョーベイ・ホテル",
    rakutenId: 27896,
    price: "3万〜6万円/室",
    access: "リゾートラインで舞浜駅から約3分",
    point: "大型プール完備。ディズニーキャラクタールームが人気で子連れに◎。",
    recommend: "子連れ・ファミリー",
    recommendColor: "text-lime-600",
    image: "https://img.travel.rakuten.co.jp/share/image_up/27896/LARGE/3e4040c057f0e71ebe64dc8893d37657b160c839.47.9.26.3.jpg",
    imageAlt: "シェラトン・グランデ・トーキョーベイ 外観",
    gradientFrom: "from-emerald-700",
    gradientTo: "to-teal-900",
  },
  {
    name: "グランドニッコー東京ベイ 舞浜",
    rakutenId: 179245,
    price: "2.5万〜5万円/室",
    access: "リゾートラインで舞浜駅から約6分",
    point: "高層ホテルから東京湾の景色が楽しめる。レストランが充実。",
    recommend: "カップル・大人旅",
    recommendColor: "text-purple-600",
    image: "https://img.travel.rakuten.co.jp/share/image_up/179245/LARGE/d773f0262bf7c2d3075df1002b1ed08d06ad30c8.47.9.26.3.jpg",
    imageAlt: "グランドニッコー東京ベイ 舞浜 外観",
    gradientFrom: "from-purple-700",
    gradientTo: "to-violet-900",
  },
  {
    name: "ホテルオークラ東京ベイ",
    rakutenId: 1304,
    price: "2.5万〜5万円/室",
    access: "リゾートラインで舞浜駅から約6分",
    point: "落ち着いた雰囲気の老舗ホテル。ディズニーグッズショップが館内に。",
    recommend: "大人・落ち着いた旅",
    recommendColor: "text-indigo-600",
    image: "https://trvimg.r10s.jp/share/image_up/1304/origin/c4e4aac054dde79d25eafd835c566d1d27f1bd24.47.1.26.2.jpg",
    imageAlt: "ホテルオークラ東京ベイ エントランス",
    gradientFrom: "from-amber-700",
    gradientTo: "to-orange-900",
  },
  {
    name: "舞浜ビューホテル by HULIC",
    rakutenId: 54127,
    price: "2万〜4万円/室",
    access: "リゾートラインで舞浜駅から約8分",
    point: "コスパ重視のオフィシャルホテル。パーク内のリゾートライン駅に近い。",
    recommend: "コスパ重視",
    recommendColor: "text-green-600",
    image: "https://img.travel.rakuten.co.jp/share/image_up/54127/LARGE/09cc36be739e7e6e53ea06565b6c00ce56a6c1f5.47.9.26.3.jpg",
    imageAlt: "舞浜ビューホテル by HULIC 外観",
    gradientFrom: "from-green-700",
    gradientTo: "to-emerald-900",
  },
];

const NEARBY_HOTELS = [
  {
    name: "舞浜・新浦安 ビジネスホテル各種",
    price: "7,000〜1.5万円/室",
    access: "新浦安駅・浦安駅周辺（シャトルバス/電車でアクセス）",
    point: "コストを抑えたいなら新浦安・葛西エリアが穴場。武蔵野線や地下鉄東西線で20〜30分。",
    recommend: "とにかく安く",
  },
  {
    name: "東京都内（錦糸町・秋葉原周辺）",
    price: "5,000〜1.2万円/室",
    access: "JR武蔵野線や京葉線で30〜40分",
    point: "電車移動に抵抗がない方は都内から日帰りも十分可能。観光込みでの旅行に便利。",
    recommend: "都内観光も兼ねる場合",
  },
];

const TIPS = [
  {
    title: "オフィシャルホテル宿泊の最大のメリット：早朝入園",
    body: "オフィシャルホテル宿泊者は「ハッピーエントリー」と呼ばれる早朝入園特典があります（開園15分前）。一見短い時間ですが、最人気アトラクション1本分の差がつくことも。混雑シーズンに行くなら価値は高いです。",
  },
  {
    title: "シャトルバスの重要性",
    body: "オフィシャルホテルはリゾートラインまたは専用シャトルバスでパークまでアクセスできます。大荷物があっても安心。特に子連れの場合、タクシーや電車の乗り換えは体力を消耗するため、シャトルバス付きホテルの価値は非常に高いです。",
  },
  {
    title: "楽天トラベルとじゃらんの使い分け",
    body: "同じホテルでも楽天とじゃらんで料金が異なることがあります。楽天はポイント還元率が高く（SPU対応）、じゃらんは「じゃらんポイント」や地域クーポンが充実。両方でチェックして安いほうを選ぶのがおすすめです。",
  },
  {
    title: "予約は2〜3ヶ月前が鉄則",
    body: "特にお盆（8月13〜16日）・年末年始・GWは近隣ホテルが2〜3ヶ月前に満室になります。「まず行く日を決めてすぐ予約、後でキャンセル料が発生する前に計画調整」が賢い順序です。",
  },
  {
    title: "禁断のコスパ技：新浦安泊",
    body: "JR新浦安駅周辺には比較的安価なホテルが多く、舞浜駅まで武蔵野線で5分です。オフィシャルホテルの半額以下で泊まれる上、移動時間もわずか。節約を優先するなら最強の選択肢です。",
  },
];

export default function HotelGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/guide" className="hover:text-gray-600">攻略ガイド</Link>
          <span className="mx-1">/</span>
          <span>近隣ホテル完全ガイド</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          ディズニー近隣ホテル完全ガイド 2026
        </h1>
        <p className="text-sm text-gray-500 mb-2">
          オフィシャルホテルから格安ホテルまで。シャトルバス・料金・アクセスを徹底比較
        </p>
        <p className="text-xs text-gray-400 mb-6">最終更新：2026年6月15日</p>

        <AdBanner adSlot="1897618790" />

        {/* オフィシャル vs 近隣 の違い */}
        <section className="mt-6 mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">オフィシャルホテルと近隣ホテルの違い</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-yellow-700 mb-2">オフィシャルホテル</p>
              <ul className="text-gray-600 space-y-1">
                <li>✅ 専用シャトルバス</li>
                <li>✅ 早朝入園特典あり</li>
                <li>✅ パークまで5〜15分</li>
                <li>✅ チェックアウト後も荷物預かり</li>
                <li>❌ 料金は高め（2〜7万円/室）</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="font-bold text-gray-700 mb-2">近隣・格安ホテル</p>
              <ul className="text-gray-600 space-y-1">
                <li>✅ 料金が安い（5千〜1.5万円）</li>
                <li>✅ 電車で20〜30分圏内</li>
                <li>❌ シャトルバスなし</li>
                <li>❌ 早朝入園特典なし</li>
                <li>❌ 移動の手間がかかる</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            <strong>結論：</strong>繁忙期・子連れ・記念旅行はオフィシャル、節約・大人のみ・リピーターは近隣が合理的です。
          </p>
        </section>

        {/* オフィシャルホテル一覧 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">オフィシャルホテル 全6軒 比較</h2>
          <div className="space-y-4">
            {OFFICIAL_HOTELS.map((hotel) => (
              <div key={hotel.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* ホテル写真 */}
                <div className={`relative w-full bg-gradient-to-r ${hotel.gradientFrom} ${hotel.gradientTo}`} style={{ height: 180 }}>
                  <Image
                    src={hotel.image}
                    alt={hotel.imageAlt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                      {hotel.recommend}
                    </span>
                    <p className="text-base font-bold text-white mt-1 leading-tight">{hotel.name}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <p className="text-xs font-bold text-white">{hotel.price}</p>
                  </div>
                </div>
                {/* 詳細情報 */}
                <div className="p-4 space-y-1.5 text-xs text-gray-600">
                  <p><span className="font-semibold text-gray-700">アクセス：</span>{hotel.access}</p>
                  <p><span className="font-semibold text-gray-700">特徴：</span>{hotel.point}</p>
                  <p>
                    <span className="font-semibold text-gray-700">おすすめ：</span>
                    <span className={`font-bold ${hotel.recommendColor}`}>{hotel.recommend}</span>
                  </p>
                  <a
                    href={rakutenHotel(hotel.rakutenId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                  >
                    楽天トラベルで空室・料金を確認 →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 楽天・じゃらんボタン */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={RAKUTEN_TDR}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-3 px-4 rounded-2xl transition-colors"
            >
              <span>楽天トラベルで</span>
              <span>空室確認 →</span>
            </a>
            <a
              href={JALAN_MAIHAMA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 px-4 rounded-2xl transition-colors"
            >
              <span>じゃらんで</span>
              <span>空室確認 →</span>
            </a>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">同じ日付でも楽天とじゃらんで料金が違うことがあります。両方確認推奨。</p>
        </section>

        <AdBanner adSlot="2084274874" containerClassName="mb-4" />

        {/* 楽天モーションウィジェット + Amazon */}
        <div className="mb-8 space-y-3">
          <p className="text-xs text-gray-400">PR・広告</p>
          <RakutenWidgetResponsive />
          <AmazonBanner keyword="旅行 バッグ スーツケース ディズニー" label="旅行バッグ・スーツケースをAmazonで探す" />
        </div>

        {/* 近隣・格安ホテル */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">近隣・格安ホテル（コスパ重視）</h2>
          <div className="space-y-3 mb-4">
            {NEARBY_HOTELS.map((hotel) => (
              <div key={hotel.name} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <p className="text-sm font-bold text-gray-900 mb-1">{hotel.name}</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p><span className="font-semibold text-gray-700">料金目安：</span>{hotel.price}</p>
                  <p><span className="font-semibold text-gray-700">アクセス：</span>{hotel.access}</p>
                  <p><span className="font-semibold text-gray-700">ポイント：</span>{hotel.point}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={RAKUTEN_TDR}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-3 px-4 rounded-2xl transition-colors"
          >
            楽天トラベルで格安ホテルを探す →
          </a>
        </section>

        {/* 選び方のコツ */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">ホテル選び 5つのコツ</h2>
          <div className="space-y-3">
            {TIPS.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 mb-1">{tip.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{tip.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 料金相場まとめ */}
        <section className="mb-8 bg-gray-100 rounded-2xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">料金相場まとめ（1室あたり・2名利用時の目安）</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: "オフィシャル（高め）", price: "3万〜7万円", note: "ヒルトン・シェラトン・グランドニッコー等", color: "text-yellow-700" },
              { label: "オフィシャル（中間）", price: "2万〜4万円", note: "オークラ・クラブリゾート・サンルート等", color: "text-orange-700" },
              { label: "近隣ビジネスホテル", price: "7千〜1.5万円", note: "新浦安・浦安・葛西周辺", color: "text-green-700" },
              { label: "都内ビジネスホテル", price: "5千〜1.2万円", note: "錦糸町・秋葉原・西葛西など", color: "text-blue-700" },
            ].map((row) => (
              <div key={row.label} className="flex items-start justify-between bg-white rounded-xl p-3">
                <div>
                  <p className={`text-xs font-bold ${row.color}`}>{row.label}</p>
                  <p className="text-xs text-gray-500">{row.note}</p>
                </div>
                <p className="text-sm font-bold text-gray-800 shrink-0">{row.price}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">※時期・予約タイミングによって大きく変動します。</p>
        </section>

        {/* 最終CTAボタン */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <a
            href={RAKUTEN_TDR}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-4 px-3 rounded-2xl transition-colors text-center"
          >
            <span className="text-lg mb-0.5">楽天トラベル</span>
            <span className="text-xs font-normal opacity-90">舞浜エリアを検索</span>
          </a>
          <a
            href={JALAN_MAIHAMA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-4 px-3 rounded-2xl transition-colors text-center"
          >
            <span className="text-lg mb-0.5">じゃらん</span>
            <span className="text-xs font-normal opacity-90">舞浜エリアを検索</span>
          </a>
        </div>

        {/* 関連記事 */}
        <div className="flex flex-col gap-2 mb-8">
          <Link href="/guide/budget" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">費用・節約完全ガイド 2026</p>
              <p className="text-xs text-gray-500">ホテル以外のコスト削減テクニック</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link href="/guide/first-time-tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">初めてのディズニーランド完全攻略</p>
              <p className="text-xs text-gray-500">当日の動き方・DPA戦略</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
          <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
            <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
            <span className="text-white">›</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          当サイトは東京ディズニーリゾートの非公式サイトです。<br />
          料金・情報は変動します。最新情報は各ホテル公式サイトでご確認ください。
        </p>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1">
          <Link href="/privacy" className="underline">プライバシーポリシー</Link>
        </p>
      </footer>

      <Script
        id="hotel-guide-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ディズニー近隣ホテル完全ガイド 2026【楽天・じゃらん最安値比較】",
            "description":
              "東京ディズニーランド・ディズニーシー周辺のおすすめホテルを徹底比較。オフィシャルホテルから格安ホテルまで、シャトルバス・料金・アクセスを詳しく解説。",
            "url": "https://disneynow.tokyo/guide/hotel",
            "publisher": {
              "@type": "Organization",
              "name": "TDLなう",
              "url": "https://disneynow.tokyo",
            },
            "datePublished": "2026-06-15",
            "dateModified": "2026-06-15",
          }),
        }}
      />
    </main>
  );
}
