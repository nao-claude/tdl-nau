import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeStr } = await params;
  const size = sizeStr === "512" ? 512 : 192;
  const r = Math.round(size * 0.18);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: r,
          background: "linear-gradient(180deg, #0a1628 0%, #1a3a6b 50%, #2d6bc4 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景の光 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.8,
            height: size * 0.5,
            background: "radial-gradient(ellipse, rgba(255,224,102,0.15) 0%, transparent 70%)",
          }}
        />

        {/* 星 */}
        <div style={{ position: "absolute", top: size * 0.07, left: "50%", transform: "translateX(-50%)", fontSize: size * 0.15, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: size * 0.13, left: size * 0.12, fontSize: size * 0.09, color: "#ffe066", lineHeight: 1 }}>★</div>
        <div style={{ position: "absolute", top: size * 0.1, right: size * 0.12, fontSize: size * 0.09, color: "#ffe066", lineHeight: 1 }}>★</div>

        {/* 城のシルエット */}
        <div style={{ display: "flex", alignItems: "flex-end", position: "absolute", bottom: size * 0.07 }}>
          {/* 左小塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: size * 0.025 }}>
            <div style={{ width: size * 0.03, height: size * 0.1, background: "#ffe066" }} />
            <div style={{ width: size * 0.13, height: size * 0.22, background: "#f0c040", borderRadius: "2px 2px 0 0" }} />
          </div>
          {/* 中央大塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: size * 0.025 }}>
            <div style={{ width: size * 0.04, height: size * 0.17, background: "#ffe066" }} />
            <div style={{ width: size * 0.22, height: size * 0.32, background: "#f5d060", borderRadius: "2px 2px 0 0" }} />
          </div>
          {/* 右小塔 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: size * 0.03, height: size * 0.1, background: "#ffe066" }} />
            <div style={{ width: size * 0.13, height: size * 0.22, background: "#f0c040", borderRadius: "2px 2px 0 0" }} />
          </div>
        </div>
      </div>
    ),
    { width: size, height: size }
  );
}
