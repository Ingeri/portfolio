import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ingeri.netlify.app',
      },
    ],
  },
};

export default nextConfig;
