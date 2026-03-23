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
          borderRadius: "6px",
          background: "linear-gradient(180deg, #0a1628 0%, #1a3a6b 50%, #2d6bc4 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 星 */}
        <div style={{ position: "absolute", top: 2, left: 13, fontSize: 8, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: 4, left: 4, fontSize: 5, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: 3, right: 4, fontSize: 5, color: "#ffe066", lineHeight: 1 }}>★</div>

        {/* 城のシルエット */}
        <div style={{ display: "flex", alignItems: "flex-end", position: "absolute", bottom: 2 }}>
          {/* 左小塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 1 }}>
            <div style={{ width: 2, height: 5, background: "#ffe066" }} />
            <div style={{ width: 7, height: 8, background: "#f0c040", borderRadius: "1px 1px 0 0" }} />
          </div>
          {/* 中央大塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 1 }}>
            <div style={{ width: 2, height: 8, background: "#ffe066" }} />
            <div style={{ width: 10, height: 13, background: "#f5d060", borderRadius: "1px 1px 0 0" }} />
          </div>
          {/* 右小塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 2, height: 5, background: "#ffe066" }} />
            <div style={{ width: 7, height: 8, background: "#f0c040", borderRadius: "1px 1px 0 0" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
