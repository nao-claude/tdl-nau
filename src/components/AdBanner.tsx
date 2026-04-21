"use client";

import { useEffect } from "react";

interface Props {
  adSlot: string;
  className?: string;
}

// ── Google AdSense 広告バナー ──────────────────────────────
// 1. https://www.google.com/adsense/ でアカウント取得・審査通過後に下記を設定:
//    ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX"（ご自身のID）
// 2. 各adSlotはAdSenseコンソールの「広告ユニット」で発行
// 3. layout.tsx の <head> に AdSense スクリプトを追加（コメント参照）
// ──────────────────────────────────────────────────────────
const ADSENSE_CLIENT_ID = "ca-pub-8944633356519670";

export function AdBanner({ adSlot, className = "" }: Props) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  // AdSense ID未設定時は非表示
  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
