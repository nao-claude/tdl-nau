"use client";

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
