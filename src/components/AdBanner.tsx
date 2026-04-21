"use client";

import { useEffect } from "react";

interface Props {
  adSlot: string;
  className?: string;
}

const ADSENSE_CLIENT_ID = "ca-pub-8944633356519670";
const AD_HEIGHT = 90;

export function AdBanner({ adSlot, className = "" }: Props) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!ADSENSE_CLIENT_ID) return null;

  return (
    /* 固定高さ＋overflow:hidden で AdSense JSによる高さ変更を物理的にクリップ */
    <div
      className={`w-full ${className}`}
      style={{ height: AD_HEIGHT, overflow: "hidden", position: "relative" }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
