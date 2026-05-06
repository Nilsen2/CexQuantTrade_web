import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
