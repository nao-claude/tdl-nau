import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TDLなう | 東京ディズニーランド・シー リアルタイム待ち時間";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f2d5e 0%, #1a5fa8 60%, #0f2d5e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div style={{ fontSize: 100, lineHeight: 1 }}>🏰</div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-2px",
          }}
        >
          TDLなう
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#93c5fd",
            marginTop: 8,
            letterSpacing: "1px",
          }}
        >
          東京ディズニーランド・シー リアルタイム待ち時間
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: 16,
          }}
        >
          {["待ち時間", "混雑予想", "ショー情報"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: 26,
                padding: "10px 28px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
