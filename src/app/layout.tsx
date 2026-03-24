import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "TDLなう | 東京ディズニーランド・シー リアルタイム待ち時間・混雑予想",
  description: "東京ディズニーランド・ディズニーシーのリアルタイム待ち時間、エリア別混雑状況、混雑予想カレンダー、天気・チケット価格を一画面で確認できます。",
  keywords: "TDL 待ち時間, TDS 待ち時間, ディズニーランド 混雑, ディズニーシー 混雑, 東京ディズニーリゾート 待ち時間, 混雑予想",
  openGraph: {
    title: "TDLなう | 東京ディズニーランド・シー リアルタイム待ち時間",
    description: "東京ディズニーランド・ディズニーシーのリアルタイム待ち時間と混雑予想",
    url: "https://disneynow.tokyo",
    siteName: "TDLなう",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TDLなう | 東京ディズニーランド・シー リアルタイム待ち時間",
    description: "東京ディズニーランド・ディズニーシーのリアルタイム待ち時間と混雑予想",
  },
  alternates: {
    canonical: "https://disneynow.tokyo",
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
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1MCFQBSRF2" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1MCFQBSRF2');
        `}</Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8944633356519670"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
