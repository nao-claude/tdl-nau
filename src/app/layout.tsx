import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TDLなう | 東京ディズニーランド・シー リアルタイム待ち時間・混雑予想",
  description: "東京ディズニーランド・ディズニーシーのリアルタイム待ち時間、エリア別混雑状況、混雑予想カレンダー、天気・チケット価格を一画面で確認できます。",
  keywords: "TDL 待ち時間, TDS 待ち時間, ディズニーランド 混雑, ディズニーシー 混雑, 東京ディズニーリゾート 待ち時間, 混雑予想",
  openGraph: {
    title: "TDLなう | 東京ディズニーランド・シー リアルタイム待ち時間",
    description: "東京ディズニーランド・ディズニーシーのリアルタイム待ち時間と混雑予想",
    locale: "ja_JP",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
