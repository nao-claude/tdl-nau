import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/", label: "🏰 待ち時間" },
  { href: "/?tab=calendar", label: "📅 混雑予想" },
  { href: "/attractions/tdl", label: "ランドガイド" },
  { href: "/attractions/tds", label: "シーガイド" },
  { href: "/dpa", label: "🎫 DPA攻略" },
  { href: "/summer2026", label: "☀️ 夏イベント" },
  { href: "/guide/hotel", label: "🏨 ホテル" },
  { href: "/faq", label: "❓ FAQ" },
];

interface Props {
  /** ヘッダー下部に追加する行（タブナビなど） */
  children?: React.ReactNode;
}

export function SiteHeader({ children }: Props) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      {/* ロゴ行 */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏰</span>
          <div>
            <p className="text-base font-bold text-gray-900 leading-tight">TDLなう</p>
            <p className="text-xs text-gray-500">東京ディズニーランド・シー リアルタイム待ち時間</p>
          </div>
        </Link>
        <LocaleSwitcher currentLocale="ja" />
      </div>
      {/* カテゴリーナビ */}
      <div className="border-t border-gray-100 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="max-w-4xl mx-auto px-4 py-2 flex gap-2 min-w-max">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      {/* 追加行（タブナビなど） */}
      {children}
    </header>
  );
}
