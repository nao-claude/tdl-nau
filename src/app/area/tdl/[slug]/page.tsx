import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getAreaGuide, getAllAreaSlugs, TDL_AREA_GUIDES } from "@/lib/area-guide-data";
import { AdBanner } from "@/components/AdBanner";
import { SiteHeader } from "@/components/SiteHeader";

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";

export async function generateStaticParams() {
  return getAllAreaSlugs("tdl").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaGuide("tdl", slug);
  if (!area) return {};
  return {
    title: `${area.name}完全攻略ガイド 2026 | アトラクション・フォトスポット・グルメ | TDLなう`,
    description: `東京ディズニーランド「${area.name}」の完全ガイド。${area.theme}をテーマにしたエリアのアトラクション情報・待ち時間傾向・フォトスポット・おすすめグルメ・回り方のコツを徹底解説。`,
    alternates: { canonical: `https://disneynow.tokyo/area/tdl/${slug}` },
  };
}

const TOADMAP: { slug: string; name: string }[] = TDL_AREA_GUIDES.map((g) => ({ slug: g.slug, name: g.name }));

const THRILL_LABEL: Record<string, { label: string; color: string }> = {
  low: { label: "マイルド", color: "bg-green-100 text-green-700" },
  mid: { label: "ミドル", color: "bg-yellow-100 text-yellow-700" },
  high: { label: "スリル高", color: "bg-red-100 text-red-700" },
};

export default async function TdlAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaGuide("tdl", slug);
  if (!area) notFound();

  const paragraphs = area.description.split("\n");

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <Link href="/attractions/tdl" className="hover:text-gray-600">TDLガイド</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-medium">{area.name}</span>
        </nav>

        {/* ヒーロー */}
        <div className={`relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br ${area.heroGradient}`} style={{ height: 220 }}>
          {area.heroImageId && (
            <Image
              src={`${CDN}/${area.heroImageId}_thum_name.jpg`}
              alt={area.name}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="text-xs text-white/70 mb-1">東京ディズニーランド</p>
            <h1 className="text-2xl font-bold text-white leading-tight">{area.name}</h1>
            <p className="text-sm text-white/80 mt-1">{area.theme}</p>
          </div>
        </div>

        {/* エリア概要 */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">エリア概要</h2>
          <div className="space-y-3">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 bg-blue-50 rounded-xl p-3">
            <span className="text-lg">⏰</span>
            <div>
              <p className="text-xs font-bold text-blue-800">おすすめ訪問時間帯</p>
              <p className="text-xs text-blue-700 mt-0.5">{area.bestTime} — {area.bestTimeDetail}</p>
            </div>
          </div>
        </section>

        <AdBanner adSlot="1897618790" />

        {/* アトラクション */}
        <section className="mt-5 mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">アトラクション</h2>
          <div className="space-y-3">
            {area.attractions.map((att) => (
              <div key={att.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {att.imageId && (
                  <div className="relative w-full" style={{ height: 140 }}>
                    <Image
                      src={`${CDN}/${att.imageId}_thum_name.jpg`}
                      alt={att.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <p className="text-white text-sm font-bold">{att.name}</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  {!att.imageId && <p className="text-sm font-bold text-gray-900 mb-2">{att.name}</p>}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${THRILL_LABEL[att.thrillLevel].color}`}>
                      {THRILL_LABEL[att.thrillLevel].label}
                    </span>
                    {att.dpa && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700">DPA対象</span>}
                    {att.heightCm && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">身長{att.heightCm}cm以上</span>}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-2">{att.description}</p>
                  <div className="flex gap-2 bg-gray-50 rounded-xl p-2.5">
                    <span className="text-gray-400 shrink-0">⏱</span>
                    <p className="text-xs text-gray-600">{att.waitTip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* フォトスポット */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">📸 フォトスポット</h2>
          <div className="space-y-3">
            {area.photoSpots.map((spot, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
                {spot.imageId && (
                  <div className="relative w-full" style={{ height: 120 }}>
                    <Image
                      src={`${CDN}/${spot.imageId}_thum_name.jpg`}
                      alt={spot.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">#{i + 1}</span>
                    <p className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow">{spot.name}</p>
                  </div>
                )}
                {spot.imageId ? (
                  <div className="p-3 bg-gray-50">
                    <p className="text-xs text-gray-600 leading-relaxed">{spot.tip}</p>
                  </div>
                ) : (
                  <div className="flex gap-3 items-start p-3 bg-gray-50">
                    <span className="text-pink-500 font-bold text-sm shrink-0 mt-0.5">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-0.5">{spot.name}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{spot.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* グルメ */}
        <section className="mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">🍽️ エリア内グルメ</h2>
          <div className="space-y-2">
            {area.food.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-bold text-gray-900">{f.name}</p>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full shrink-0">{f.type}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">💰 {f.price}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 攻略Tips */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">💡 攻略Tips</h2>
          <ul className="space-y-2">
            {area.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                <span className="text-xs text-gray-700 leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <h2 className="text-base font-bold text-gray-900 mb-3">よくある質問</h2>
          <div className="space-y-2">
            {area.faq.map((item, i) => (
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

        {/* 他エリアへのリンク */}
        <section className="mb-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">他のエリアを見る</h2>
          <div className="grid grid-cols-2 gap-2">
            {TOADMAP.filter((a) => a.slug !== slug).map((a) => (
              <Link
                key={a.slug}
                href={`/area/tdl/${a.slug}`}
                className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:border-gray-400 transition-colors"
              >
                <span className="text-lg">🏰</span>
                <p className="text-xs font-bold text-gray-900">{a.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <AdBanner adSlot="2084274874" containerClassName="mb-4" />

        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center justify-between bg-blue-500 rounded-2xl p-4 shadow-sm hover:bg-blue-600 transition-colors">
            <p className="text-sm font-bold text-white">リアルタイム待ち時間を確認する</p>
            <span className="text-white">›</span>
          </Link>
          <Link href="/attractions/tdl" className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-gray-400 transition-colors">
            <div>
              <p className="text-sm font-bold text-gray-900">TDLアトラクションガイド一覧</p>
              <p className="text-xs text-gray-500">身長制限・DPA・スリル度を確認</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          当サイトは東京ディズニーリゾートの非公式サイトです。<br />
          最新・正確な情報は公式サイトでご確認ください。
        </p>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-4">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
        <p className="mt-1"><Link href="/privacy" className="underline">プライバシーポリシー</Link></p>
      </footer>

      <Script id={`area-tdl-${slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${area.name}完全攻略ガイド 2026｜東京ディズニーランド`,
          "description": `東京ディズニーランド「${area.name}」の攻略ガイド。アトラクション情報・フォトスポット・グルメ・回り方のコツを徹底解説。`,
          "url": `https://disneynow.tokyo/area/tdl/${slug}`,
          "publisher": { "@type": "Organization", "name": "TDLなう", "url": "https://disneynow.tokyo" },
          "datePublished": "2026-05-02",
          "dateModified": "2026-05-02",
        })
      }} />
    </main>
  );
}
