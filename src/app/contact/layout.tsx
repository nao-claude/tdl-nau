import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | TDLなう",
  description: "TDLなうへのお問い合わせはこちら。情報の誤り・不具合の報告・ご意見・ご要望などをお送りください。",
  alternates: { canonical: "https://disneynow.tokyo/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
