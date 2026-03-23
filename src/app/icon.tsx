import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "linear-gradient(180deg, #0a1628 0%, #1a3a6b 50%, #2d6bc4 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 星 */}
        <div style={{ position: "absolute", top: 3, left: 14, fontSize: 6, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: 5, left: 6, fontSize: 4, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: 4, right: 6, fontSize: 4, color: "#ffe066", lineHeight: 1 }}>★</div>

        {/* 城のシルエット */}
        <div style={{ display: "flex", alignItems: "flex-end", position: "absolute", bottom: 4 }}>
          {/* 左小塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 1 }}>
            <div style={{ width: 1, height: 4, background: "#ffe066" }} />
            <div style={{ width: 5, height: 6, background: "#f0c040", borderRadius: "1px 1px 0 0" }} />
          </div>
          {/* 中央大塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 1 }}>
            <div style={{ width: 1, height: 6, background: "#ffe066" }} />
            <div style={{ width: 8, height: 10, background: "#f5d060", borderRadius: "1px 1px 0 0" }} />
          </div>
          {/* 右小塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 1, height: 4, background: "#ffe066" }} />
            <div style={{ width: 5, height: 6, background: "#f0c040", borderRadius: "1px 1px 0 0" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
