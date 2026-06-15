"use client";
import { useEffect, useRef } from "react";

interface Props {
  /** 例: "468x160" | "728x200" | "320x200" */
  size: string;
  className?: string;
}

/**
 * 楽天モーションウィジェット
 * ユーザーの閲覧履歴に基づいてパーソナライズされた楽天商品を表示する。
 */
export function RakutenWidget({ size, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";

    // グローバル変数を先に設定
    const varScript = document.createElement("script");
    varScript.type = "text/javascript";
    varScript.textContent = [
      'rakuten_design="slide";',
      'rakuten_affiliateId="11a128c7.c67ea3dd.11a128c8.2f346613";',
      'rakuten_items="ctsmatch";',
      'rakuten_genreId="0";',
      `rakuten_size="${size}";`,
      'rakuten_target="_blank";',
      'rakuten_theme="gray";',
      'rakuten_border="off";',
      'rakuten_auto_mode="on";',
      'rakuten_genre_title="off";',
      'rakuten_recommend="on";',
      `rakuten_ts="${Date.now()}";`,
    ].join("");
    el.appendChild(varScript);

    // ウィジェット本体スクリプトを後から読み込む
    const widgetScript = document.createElement("script");
    widgetScript.type = "text/javascript";
    widgetScript.src =
      "https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106";
    el.appendChild(widgetScript);

    return () => {
      el.innerHTML = "";
    };
  }, [size]);

  return <div ref={ref} className={className} />;
}

/**
 * スマホ/PC 両対応ラッパー
 * スマホ: 468x160、PC: 728x200
 */
export function RakutenWidgetResponsive({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* スマホ用 (md未満) */}
      <div className="md:hidden overflow-x-auto">
        <RakutenWidget size="468x160" />
      </div>
      {/* PC用 (md以上) */}
      <div className="hidden md:block overflow-x-auto">
        <RakutenWidget size="728x200" />
      </div>
    </div>
  );
}
