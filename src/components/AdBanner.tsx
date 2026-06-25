"use client";

import { useEffect } from "react";

interface Props {
  adSlot: string;
  containerClassName?: string;
}

const ADSENSE_CLIENT_ID = "ca-pub-8944633356519670";
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "false";
const AD_HEIGHT = 90;

export function AdBanner({ adSlot, containerClassName = "" }: Props) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !ADSENSE_ENABLED) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!ADSENSE_CLIENT_ID || !ADSENSE_ENABLED) return null;

  return (
    <div
      className={containerClassName}
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
