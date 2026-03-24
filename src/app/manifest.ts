import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TDLなう | 東京ディズニーリゾート 待ち時間",
    short_name: "TDLなう",
    description: "東京ディズニーランド・シーのリアルタイム待ち時間・混雑予想",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#1a3a6b",
    lang: "ja",
    orientation: "portrait",
    icons: [
      {
        src: "/api/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
