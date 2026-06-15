import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">ホーム</Link>
          <span className="mx-1">/</span>
          <span>お問い合わせ</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
        <p className="text-sm text-gray-500 mb-4">
          情報の誤り・不具合の報告・ご意見・ご要望などはこちらからお送りください。
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 mb-6">
          <p className="font-semibold mb-1">ご注意</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>当サイトは東京ディズニーリゾートの非公式サイトです。</li>
            <li>チケット購入・予約・公式情報についてはお答えできません。</li>
            <li>個別のご返信は行っておりません。</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSe0CkjjhO8KSBWPkqhjFdNtE5t9D56jMOPZ6HJkasKStMCI-g/viewform?embedded=true"
            width="100%"
            height="720"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="お問い合わせフォーム"
          >
            読み込んでいます…
          </iframe>
        </div>

        <div className="mt-6 text-center">
          <Link href="/faq" className="text-sm text-blue-500 hover:underline">
            よくある質問（FAQ）もご確認ください
          </Link>
        </div>
      </div>
    </main>
  );
}
