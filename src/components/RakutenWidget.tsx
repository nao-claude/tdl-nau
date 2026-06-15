"use client";

const AMAZON_TAG = "disneynowtoky-22";

/** Amazonアフィリエイト検索リンクを生成 */
const amazonUrl = (keyword: string) =>
  `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&s=review-rank&tag=${AMAZON_TAG}`;

interface AmazonBannerProps {
  /** 検索キーワード */
  keyword?: string;
  /** ボタンに表示するラベル */
  label?: string;
  className?: string;
}

/**
 * Amazonアフィリエイトバナーボタン
 * PA API利用可能になったら自動ランキングに差し替え予定
 */
export function AmazonBanner({
  keyword = "ディズニー グッズ",
  label = "ディズニーグッズ・旅行用品",
  className,
}: AmazonBannerProps) {
  return (
    <a
      href={amazonUrl(keyword)}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className ?? ""}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#232F3E] to-[#37475A] shadow-lg hover:shadow-xl transition-shadow">
        {/* 上部オレンジライン */}
        <div className="h-1 bg-[#FF9900]" />
        <div className="flex items-center gap-4 px-4 py-3">
          {/* Amazonロゴ部分 */}
          <div className="shrink-0">
            <p className="text-[#FF9900] font-black text-2xl leading-none tracking-tight">amazon</p>
            <p className="text-[#FF9900] text-xs font-bold leading-none mt-0.5">.co.jp</p>
          </div>
          {/* テキスト */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight">{label}</p>
            <p className="text-gray-300 text-xs mt-0.5">人気ランキング・口コミを確認する</p>
          </div>
          {/* 矢印 */}
          <div className="shrink-0 w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center group-hover:bg-[#e68a00] transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {/* PR表示 */}
        <p className="absolute top-2 right-2 text-[10px] text-gray-400">PR</p>
      </div>
    </a>
  );
}

interface Props {
  /** "468x160" | "728x200" | "160x600" | "320x200" */
  size: string;
  className?: string;
}

/**
 * 楽天モーションウィジェット（iframe方式）
 * public/rk-widget.html を iframe で読み込むことで
 * document.currentScript が正しく動作し、ウィジェットが表示される。
 */
export function RakutenWidget({ size, className }: Props) {
  const [w, h] = size.split("x").map(Number);
  return (
    <iframe
      src={`/rk-widget.html?size=${size}&t=${Date.now()}`}
      width={w}
      height={h}
      frameBorder="0"
      scrolling="no"
      title="楽天広告"
      className={className}
      style={{ display: "block" }}
    />
  );
}

/**
 * スマホ/PC 両対応ラッパー
 * スマホ: 468x160 / PC: 728x200
 */
export function RakutenWidgetResponsive({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="md:hidden overflow-x-auto">
        <RakutenWidget size="468x160" />
      </div>
      <div className="hidden md:block overflow-x-auto">
        <RakutenWidget size="728x200" />
      </div>
    </div>
  );
}

/**
 * PCサイドバー追従型広告
 * max-w-4xl(896px) のコンテンツ両外側に fixed で表示
 * xl(1280px)以上の画面幅でのみ表示
 */
export function RakutenStickyAds() {
  return (
    <>
      {/* 左サイド */}
      <div
        className="hidden xl:block fixed z-20"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          left: "max(8px, calc(50% - 448px - 168px))",
          width: 160,
        }}
      >
        <RakutenWidget size="160x600" />
      </div>
      {/* 右サイド */}
      <div
        className="hidden xl:block fixed z-20"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          right: "max(8px, calc(50% - 448px - 168px))",
          width: 160,
        }}
      >
        <RakutenWidget size="160x600" />
      </div>
    </>
  );
}
