import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const s = 180;
  const r = Math.round(s * 0.18);

  return new ImageResponse(
    (
      <div
        style={{
          width: s,
          height: s,
          borderRadius: r,
          background: "linear-gradient(180deg, #0a1628 0%, #1a3a6b 50%, #2d6bc4 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: s * 0.07, left: "50%", transform: "translateX(-50%)", fontSize: s * 0.15, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: s * 0.13, left: s * 0.12, fontSize: s * 0.09, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: s * 0.1, right: s * 0.12, fontSize: s * 0.09, color: "#ffe066", lineHeight: 1 }}>★</div>

        <div style={{ display: "flex", alignItems: "flex-end", position: "absolute", bottom: s * 0.07 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: s * 0.025 }}>
            <div style={{ width: s * 0.03, height: s * 0.1, background: "#ffe066" }} />
            <div style={{ width: s * 0.13, height: s * 0.22, background: "#f0c040", borderRadius: "2px 2px 0 0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: s * 0.025 }}>
            <div style={{ width: s * 0.04, height: s * 0.17, background: "#ffe066" }} />
            <div style={{ width: s * 0.22, height: s * 0.32, background: "#f5d060", borderRadius: "2px 2px 0 0" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: s * 0.03, height: s * 0.1, background: "#ffe066" }} />
            <div style={{ width: s * 0.13, height: s * 0.22, background: "#f0c040", borderRadius: "2px 2px 0 0" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
