import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/ads.txt", destination: "/api/ads-txt" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media1.tokyodisneyresort.jp",
        pathname: "/images/adventure/attraction/**",
      },
    ],
  },
};

export default nextConfig;
