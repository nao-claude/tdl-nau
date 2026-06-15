import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { AmazonBanner } from "@/components/RakutenWidget";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = {
  title: "初めてのディズニーランド完全攻略ガイド 2026 | TDLなう",
  description:
    "東京ディズニーランドに初めて行く方向けの完全攻略ガイド。チケット購入・持ち物・当日の流れ・効率的な回り方・DPA戦略まで、初心者が知りたい情報を網羅して解説します。",
  alternates: { canonical: "https://disneynow.tokyo/guide/first-time-tdl" },
};

export default function FirstTimeTDLPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>初めてのディズニーランド完全攻略ガイド</span>
        </nav>

        {/* ヒーロー画像 */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
          <Image
            src="https://media1.tokyodisneyresort.jp/images/adventure/attraction/1054_thum_name.jpg"
            alt="東京ディズニーランド 美女と野獣"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h1 className="text-xl font-bold text-white leading-tight">
              初めてのディズニーランド完全攻略ガイド 2026
            </h1>
            <p className="text-xs text-white/80 mt-1">
              チケット・持ち物・当日の動き方・DPA戦略まで初心者向けに徹底解説
            </p>
          </div>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">目次</p>
          <ul className="space-y-1.5 text-sm text-blue-600">
            <li><a href="#ticket" className="hover:underline">1. チケットの買い方・種類</a></li>
            <li><a href="#prepare" className="hover:underline">2. 事前準備・持ち物チェックリスト</a></li>
            <li><a href="#morning" className="hover:underline">3. 当日の朝〜入園直後の動き方</a></li>
            <li><a href="#dpa" className="hover:underline">4. DPA（プレミアアクセス）の使い方</a></li>
            <li><a href="#route" className="hover:underline">5. 効率的な回り方・おすすめルート</a></li>
            <li><a href="#food" className="hover:underline">6. 食事・グルメのタイミング</a></li>
            <li><a href="#night" className="hover:underline">7. 夕方〜閉園前の過ごし方</a></li>
            <li><a href="#tips" className="hover:underline">8. 知っておきたい便利情報</a></li>
          </ul>
        </nav>

        <div className="space-y-8">

          {/* チケット */}
          <section id="ticket" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. チケットの買い方・種類</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              東京ディズニーランドのチケットは、現在<strong>原則として事前購入制</strong>です。当日窓口での購入は残余がある場合のみで、繁忙期はほぼ購入できません。必ず事前に東京ディズニーリゾート公式サイトまたは公式アプリで購入してください。
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="font-bold text-sm text-blue-800 mb-1">1デーパスポート（最もスタンダード）</p>
                <p className="text-xs text-blue-700">1日中パーク内を楽しめる基本チケット。料金は日程・年齢によって異なり、繁忙期は高め・閑散期は安めに設定されています。</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="font-bold text-sm text-green-800 mb-1">アーリーイブニングパスポート（15時入場）</p>
                <p className="text-xs text-green-700">15時以降に入場できるお得なチケット。夕方〜夜だけ楽しみたい方や、近隣在住の方向け。料金は1デーより安い。</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="font-bold text-sm text-purple-800 mb-1">ウィークナイトパスポート（平日夕方入場）</p>
                <p className="text-xs text-purple-700">平日の特定時間以降に入場できるチケット。料金が最も安く、働く社会人の「仕事帰りにディズニー」にぴったり。</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ※料金・種類は変更になる場合があります。最新情報は公式サイトでご確認ください。
            </p>
          </section>

          {/* 事前準備 */}
          <section id="prepare" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. 事前準備・持ち物チェックリスト</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              ディズニーランドを最大限楽しむには、事前準備が9割です。特に初めての方は、以下の準備を前日までに済ませておきましょう。
            </p>
            <div className="space-y-2">
              {[
                { item: "東京ディズニーリゾート公式アプリをインストール", detail: "DPA購入・待ち時間確認・ショースケジュール確認に必須。入園前から設定しておく。" },
                { item: "チケットをアプリに連携しておく", detail: "当日の入場はアプリのQRコードを使う。事前に連携を完了させておくと当日スムーズ。" },
                { item: "クレジットカード・決済手段の確認", detail: "DPAは公式アプリからキャッシュレスで購入。スマホ決済が使えるか事前確認。" },
                { item: "歩きやすい靴を準備", detail: "パーク内は1日で1〜2万歩歩くことも。ヒールやサンダルは足の疲労の原因に。" },
                { item: "天気予報を確認", detail: "雨具・日焼け対策・防寒対策など、当日の天気に合わせた準備を。" },
                { item: "ショースケジュールを確認", detail: "パレード・ショーの時間は当日変更されることも。アプリで事前確認しておく。" },
              ].map((row, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{row.item}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{row.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 当日の朝 */}
          <section id="morning" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. 当日の朝〜入園直後の動き方</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              入園直後の30分が1日の充実度を大きく左右します。初めての方でもスムーズに動けるよう、時系列で解説します。
            </p>
            <div className="space-y-3">
              {[
                { time: "開園1時間前", label: "到着目標", color: "bg-red-500", desc: "繁忙期は開園前から行列ができる。ゲート前で並びながらアプリを起動・確認しておく。" },
                { time: "入園直後0〜1分", label: "最重要", color: "bg-red-500", desc: "アプリを開いてDPAの購入画面へ。目当てのアトラクションのDPAが在庫ゼロになる前に購入する。" },
                { time: "入園後すぐ", label: "目的地へ", color: "bg-orange-500", desc: "DPA購入後、最優先アトラクション（美女と野獣 or ピーター・パン）のスタンバイ列へ直行。" },
                { time: "〜10:30", label: "午前の勝負", color: "bg-yellow-500", desc: "人気アトラクションは開園後1〜2時間で待ち時間が跳ね上がる。午前中に2〜3本こなすのが理想。" },
              ].map((row, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 flex flex-col items-center">
                    <span className={`w-6 h-6 rounded-full ${row.color} text-white text-xs font-bold flex items-center justify-center`}>{i + 1}</span>
                    {i < 3 && <div className="w-0.5 h-6 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-gray-500">{row.time}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-medium">{row.label}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DPA */}
          <section id="dpa" className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. DPA（ディズニー・プレミアアクセス）の使い方</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              DPA（ディズニー・プレミアアクセス）は、有料で人気アトラクションの優先入場権を購入できるサービスです。1アトラクション1,500〜2,500円程度で、繁忙期の混雑を大幅に短縮できます。
            </p>
            <div className="space-y-2 text-sm">
              <div className="bg-white rounded-xl p-3 flex gap-3">
                <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 72, height: 72 }}>
                  <Image
                    src="https://media1.tokyodisneyresort.jp/images/adventure/attraction/1054_thum_name.jpg"
                    alt="美女と野獣"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-bold text-red-600 mb-1">ランド最優先：美女と野獣（2,000円）</p>
                  <p className="text-xs text-gray-600">入園後10〜30分で売り切れることも。最初の1分で購入を。</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 flex gap-3">
                <div className="relative rounded-lg overflow-hidden shrink-0" style={{ width: 72, height: 72 }}>
                  <Image
                    src="https://media1.tokyodisneyresort.jp/images/adventure/attraction/1047_thum_name.jpg"
                    alt="ベイマックスのハッピーライド"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-bold text-orange-600 mb-1">次に優先：ベイマックスのハッピーライド（1,500円）</p>
                  <p className="text-xs text-gray-600">美女と野獣のDPA購入直後に確認。開園後1〜2時間で売り切れることが多い。</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="font-bold text-gray-700 mb-1">初心者向け予算の目安：1人3,000〜5,000円</p>
                <p className="text-xs text-gray-600">2〜3枚購入が満足度とコストのベストバランス。</p>
              </div>
            </div>
            <Link href="/dpa" className="mt-3 flex items-center justify-between bg-amber-400 hover:bg-amber-500 rounded-xl p-3 transition-colors">
              <p className="text-sm font-bold text-white">DPA完全攻略ガイドを見る</p>
              <span className="text-white">›</span>
            </Link>
          </section>

          {/* 効率的な回り方 */}
          <section id="route" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. 効率的な回り方・おすすめルート</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              東京ディズニーランドはワールドバザール→各エリアへの扇状の構造になっています。効率よく回るには「時計回り」または「反時計回り」を意識すると移動ロスが少なくなります。
            </p>

            {/* おすすめアトラクション画像 */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">開園ダッシュ おすすめ3本</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { id: "1054", name: "美女と野獣", label: "①最優先" },
                { id: "661", name: "プーさん", label: "②次に" },
                { id: "521", name: "ピーター・パン", label: "③その後" },
              ].map((a) => (
                <div key={a.id} className="relative rounded-xl overflow-hidden" style={{ height: 90 }}>
                  <Image
                    src={`https://media1.tokyodisneyresort.jp/images/adventure/attraction/${a.id}_thum_name.jpg`}
                    alt={a.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="text-white text-[10px] font-bold leading-tight">{a.name}</p>
                    <span className="text-yellow-300 text-[9px] font-bold">{a.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="font-bold text-sm text-blue-800 mb-2">初心者おすすめ：反時計回りルート</p>
                <p className="text-xs text-blue-700 leading-relaxed">
                  入園 → 美女と野獣（ニューファンタジーランド）→ プーさん → ピーター・パン（ファンタジーランド）→ ビッグサンダー → スプラッシュ（ウエスタンランド）→ スペースマウンテン（トゥモローランド）
                </p>
              </div>
              <div className="space-y-1.5 text-sm text-gray-700">
                <p className="font-semibold text-gray-800">回り方のコツ</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>・午前中は人気アトラクションに集中。待ち時間が短い今しか乗れない</li>
                  <li>・ショー・パレード中はアトラクションが空く（「パレード抜け」の活用）</li>
                  <li>・食事は11時台か14時台を狙うと並ばずに食べられる</li>
                  <li>・夕方以降はエンターテイメントを優先し、閉園前にもう一度アトラクション</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 食事 */}
          <section id="food" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. 食事・グルメのタイミング</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              パーク内のレストランは12〜13時台に最も混雑します。食事のタイミングをずらすだけで、30分以上の時間を節約できます。
            </p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {[
                { time: "11時台（推奨）", note: "昼食の混雑前に食べる。座席の余裕あり。その後また動けるメリットも。" },
                { time: "12〜13時（避ける）", note: "最も混雑する時間帯。レストランは30〜60分待ちになることも。アトラクションに集中するほうが効率的。" },
                { time: "14時台（穴場）", note: "昼のピーク後で比較的空いている。人気レストランもすぐ入れることが多い。" },
              ].map((row, i) => (
                <div key={i} className={`p-3 rounded-xl ${i === 1 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}>
                  <p className={`font-bold text-xs mb-1 ${i === 1 ? "text-red-700" : "text-green-700"}`}>{row.time}</p>
                  <p className="text-xs text-gray-700">{row.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">テイクアウト系のスナック（チュロス・ポップコーンなど）を歩きながら食べる方法も時間節約に効果的です。</p>
          </section>

          {/* 夕方〜閉園前 */}
          <section id="night" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. 夕方〜閉園前の過ごし方</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              閉園間際は意外と狙い目です。パーク全体の混雑が落ち着き始め、人気アトラクションでも待ち時間が短くなることがあります。
            </p>
            <div className="space-y-2 text-sm">
              <div className="bg-indigo-50 rounded-xl p-3">
                <p className="font-bold text-indigo-800 mb-1">夜のパレード・イルミネーション</p>
                <p className="text-xs text-indigo-700">夜のパレードやシンデレラ城のプロジェクションマッピングはディズニーならではの体験。夕方はショー・パレードに集中するのがおすすめ。</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="font-bold text-purple-800 mb-1">閉園1時間前の「ラストチャンス」</p>
                <p className="text-xs text-purple-700">閉園が近くなると列が短くなるアトラクションも。午前中乗れなかったものに挑戦するチャンス。</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-3">
                <p className="font-bold text-pink-800 mb-1">お土産は早めに購入</p>
                <p className="text-xs text-pink-700">閉園直前のショップは大混雑。お土産購入は17〜18時台のすいた時間に済ませておくと◎。</p>
              </div>
            </div>
          </section>

          {/* 便利情報 */}
          <section id="tips" className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. 知っておきたい便利情報</h2>
            <div className="space-y-3 text-sm">
              {[
                { title: "スマートフォンの充電", body: "1日中使うため、モバイルバッテリーは必須。パーク内にも有料充電スポットあり。" },
                { title: "ロッカーの活用", body: "大きな荷物はロッカーへ。ワールドバザール入口付近・各エリアにあり。スタンバイ中も身軽に動ける。" },
                { title: "ベビーカーの貸し出し", body: "ワールドバザール入口付近でレンタル可能（有料）。持ち込みも可能。" },
                { title: "迷子・緊急時の対応", body: "迷子になった場合はシンデレラ城前の「キャスト」に声をかける。パーク内のキャストは全員サポート可能。" },
                { title: "雨天時の過ごし方", body: "雨でも屋内アトラクションは通常通り運営。屋外パレードは中止になる場合があるためアプリで確認。" },
              ].map((row, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-blue-500 font-bold mt-0.5 shrink-0">💡</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{row.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{row.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* リンク */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
              <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
              <span className="text-white">›</span>
            </Link>
            <Link href="/dpa" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">DPA完全攻略ガイド</p>
                <p className="text-xs text-gray-500">どれから買う？売り切れ時間・予算別戦略</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
            <Link href="/attractions/tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
              <div>
                <p className="text-sm font-bold text-gray-900">アトラクションガイド（ランド）</p>
                <p className="text-xs text-gray-500">身長制限・スリル度・所要時間を確認</p>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </div>
        </div>

        <AmazonBanner keyword="ディズニーランド 攻略 グッズ" label="ディズニーランド攻略グッズをAmazonで探す" className="mt-4" />
        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。<br />
          最新・正確な情報は公式サイトでご確認ください。
        </p>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1"><Link href="/privacy" className="underline">プライバシーポリシー</Link></p>
      </footer>

      <Script id="first-time-tdl-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "初めてのディズニーランド完全攻略ガイド 2026",
        "description": "東京ディズニーランドに初めて行く方向けの完全攻略ガイド。チケット購入・持ち物・当日の流れ・効率的な回り方・DPA戦略まで網羅。",
        "url": "https://disneynow.tokyo/guide/first-time-tdl",
        "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
        "datePublished": "2026-05-01",
        "dateModified": "2026-05-01",
      })}} />
    </main>
  );
}
