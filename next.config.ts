import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
