import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | TDLなう",
  description: "TDLなう（disneynow.tokyo）のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏰</span>
            <span className="text-base font-bold text-gray-900">TDLなう</span>
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">プライバシーポリシー</h1>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">基本方針</h2>
            <p>
              TDLなう（以下「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">広告について</h2>
            <p>
              当サイトは、Google LLC の提供する広告配信サービス「Google AdSense」を利用しています。
              Google AdSense は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。
              Cookie を無効にする方法や Google AdSense に関する詳細は、
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Google のポリシーと規約
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">アフィリエイトについて</h2>
            <p>
              当サイトは、以下のアフィリエイトプログラムに参加しています。
              アフィリエイトリンクを経由して購入・予約が行われた場合、当サイトに報酬が発生することがあります。
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>楽天アフィリエイト（楽天トラベル）</li>
              <li>A8.net（じゃらん）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">アクセス解析について</h2>
            <p>
              当サイトは、Google LLC の提供するアクセス解析ツール「Google Analytics」を利用しています。
              Google Analytics は Cookie を使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。
              収集される情報や無効化の方法については、
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Google プライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">免責事項</h2>
            <p>
              当サイトに掲載している待ち時間・混雑情報は、第三者サービス（Queue-Times.com）から取得したものであり、
              正確性・最新性を保証するものではありません。
              また、当サイトは株式会社オリエンタルランドおよびウォルト・ディズニー・カンパニーとは無関係の非公式サイトです。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">プライバシーポリシーの変更</h2>
            <p>
              当サイトは、必要に応じて本ポリシーを変更することがあります。
              変更後のポリシーは本ページに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせは、サイト運営者までご連絡ください。
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200">
            制定日：2026年3月
          </p>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8">
        <p>非公式サイトです。株式会社オリエンタルランドとは無関係です。</p>
      </footer>
    </main>
  );
}
