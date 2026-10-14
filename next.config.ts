import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["react-markdown"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;