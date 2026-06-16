import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { TDL_ATTRACTIONS } from "@/lib/attraction-data";
import { getAttractionDetail, getDetailsByPark } from "@/lib/attraction-detail";
import { AttractionWaitBadge } from "@/components/AttractionWaitBadge";

const CDN = "https://media1.tokyodisneyresort.jp/images/adventure/attraction";
function galleryUrl(id: number) { return `${CDN}/${id}_thum_name.jpg`; }

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getDetailsByPark("tdl").map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = getAttractionDetail("tdl", slug);
  if (!detail) return {};
  const info = TDL_ATTRACTIONS.find((a) => a.id === detail.id);
  if (!info) return {};
  const ogImage = `https://media1.tokyodisneyresort.jp/images/adventure/attraction/${detail.galleryIds[0]}_thum_name.jpg`;
  return {
    title: `${info.nameJa} 待ち時間・攻略ガイド | TDLなう`,
    description: `${info.nameJa}の待ち時間・攻略情報。${info.descJa}`,
    alternates: { canonical: `https://disneynow.tokyo/attractions/tdl/${slug}` },
    openGraph: {
      title: `${info.nameJa} 待ち時間・攻略ガイド | TDLなう`,
      description: `${info.nameJa}の待ち時間・攻略情報。${info.descJa}`,
      url: `https://disneynow.tokyo/attractions/tdl/${slug}`,
      images: [{ url: ogImage, width: 300, height: 300, alt: info.nameJa }],
    },
    twitter: {
      card: "summary_large_image" as const,
      images: [ogImage],
    },
  };
}

const THRILL_LABEL: Record<number, string> = { 1: "★☆☆☆☆ 低い", 2: "★★☆☆☆ やや低い", 3: "★★★☆☆ 普通", 4: "★★★★☆ 高い", 5: "★★★★★ 非常に高い" };
const BEST_TIME_LABEL: Record<string, string> = { morning: "午前（開園直後）", afternoon: "午後", evening: "夕方〜夜", anytime: "時間帯問わず" };

export default async function TDLAttractionDetailPage({ params }: Props) {
  const { slug } = await params;
  const detail = getAttractionDetail("tdl", slug);
  if (!detail) notFound();

  const info = TDL_ATTRACTIONS.find((a) => a.id === detail.id);
  if (!info) notFound();

  const paragraphs = detail.detailJa.split("\n\n");

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏰</span>
            <span className="text-base font-bold text-gray-900">TDLなう</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600">トップ</Link>
          <span className="mx-1">/</span>
          <Link href="/attractions/tdl" className="hover:text-gray-600">ランドガイド</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-700">{info.nameJa}</span>
        </nav>

        <h1 className="text-xl font-bold text-gray-900 mb-1">{info.nameJa}</h1>
        <p className="text-sm text-gray-500 mb-4">{info.area}｜東京ディズニーランド</p>

        {/* 画像ギャラリー */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {detail.galleryIds.map((imgId) => (
            <div key={imgId} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={galleryUrl(imgId)}
                alt={info.nameJa}
                width={300}
                height={300}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* リアルタイム待ち時間 */}
        <div className="mb-4">
          <AttractionWaitBadge parkId="tdl" attractionId={info.id} />
        </div>

        {/* スペック */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-400">身長制限</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">
              {info.heightMin ? `${info.heightMin}cm以上` : "制限なし"}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-400">DPA対象</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">
              {info.isDPA ? "✅ 対象" : "対象外"}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-400">スリル度</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{THRILL_LABEL[info.thrillLevel]}</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <p className="text-xs text-gray-400">おすすめ時間帯</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{BEST_TIME_LABEL[info.bestTime]}</p>
          </div>
        </div>

        {/* 詳細コンテンツ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 text-sm text-gray-700 leading-relaxed">
          {paragraphs.map((p, i) => {
            if (p.startsWith("## ")) {
              return <h2 key={i} className="text-base font-bold text-gray-900 pt-2 border-t border-gray-100 first:border-0 first:pt-0">{p.replace("## ", "")}</h2>;
            }
            if (p.startsWith("- ")) {
              const items = p.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="space-y-1.5">
                  {items.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{p}</p>;
          })}
        </div>

        {/* 戻るリンク */}
        <div className="mt-6 flex gap-3">
          <Link href="/attractions/tdl" className="flex-1 text-center bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-700 transition-colors">
            ランドのアトラクション一覧
          </Link>
          <Link href="/" className="flex-1 text-center bg-white border border-gray-200 text-gray-700 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 transition-colors">
            リアルタイム待ち時間
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-4">
        <AmazonBanner keyword="ディズニーランド アトラクション グッズ" label="Amazonでディズニーランドグッズを探す" />
      </div>
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
      </footer>

      <Script id="jsonld-breadcrumb" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "トップ", "item": "https://disneynow.tokyo" },
          { "@type": "ListItem", "position": 2, "name": "ランドガイド", "item": "https://disneynow.tokyo/attractions/tdl" },
          { "@type": "ListItem", "position": 3, "name": info.nameJa, "item": `https://disneynow.tokyo/attractions/tdl/${detail.slug}` },
        ],
      })}} />
    </main>
  );
}
