import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { RakutenStickyAds } from "@/components/RakutenWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#1a3a6b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://disneynow.tokyo"),
  title: "ディズニーランド・シー 待ち時間 リアルタイム【今日の混雑予報】| TDLなう",
  description: "ディズニーランド・ディズニーシーのリアルタイム待ち時間を今すぐ確認。5分ごと自動更新・混雑予想カレンダー・DPA攻略ガイドも無料で掲載。",
  keywords: "TDL 待ち時間, TDS 待ち時間, ディズニーランド 混雑, ディズニーシー 混雑, 東京ディズニーリゾート 待ち時間, 混雑予想",
  openGraph: {
    title: "ディズニーランド・シー 待ち時間 リアルタイム【今日の混雑予報】| TDLなう",
    description: "ディズニーランド・ディズニーシーのリアルタイム待ち時間を今すぐ確認。5分ごと自動更新・混雑予想カレンダー・DPA攻略も無料で掲載。",
    url: "https://disneynow.tokyo",
    siteName: "TDLなう",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TDLなう - 東京ディズニーリゾート リアルタイム待ち時間" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@disneynow_tokyo",
    creator: "@disneynow_tokyo",
    title: "ディズニーランド・シー 待ち時間 リアルタイム【今日の混雑予報】| TDLなう",
    description: "ディズニーランド・ディズニーシーのリアルタイム待ち時間を今すぐ確認。5分ごと自動更新・混雑予想カレンダー・DPA攻略も無料で掲載。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://disneynow.tokyo",
    languages: {
      ja: "https://disneynow.tokyo",
      en: "https://disneynow.tokyo/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RakutenStickyAds />
        {children}
        <Script id="jsonld-site" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://disneynow.tokyo/#website",
              "url": "https://disneynow.tokyo",
              "name": "TDLなう",
              "description": "東京ディズニーランド・ディズニーシーのリアルタイム待ち時間・混雑予想",
              "inLanguage": "ja",
            },
            {
              "@type": "Organization",
              "@id": "https://disneynow.tokyo/#organization",
              "name": "TDLなう",
              "url": "https://disneynow.tokyo",
              "sameAs": ["https://x.com/disneynow_tokyo"],
            },
          ],
        })}} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1MCFQBSRF2" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1MCFQBSRF2');
        `}</Script>
        {process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "false" && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8944633356519670"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
