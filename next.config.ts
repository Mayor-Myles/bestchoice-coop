import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://mylezic.myartsonline.com/:path*',
      },
    ];
  },
};

export default nextConfig;
