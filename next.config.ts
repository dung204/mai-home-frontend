import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        pathname: '/dmpllzq2z/image/upload/**',
        protocol: 'https',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
};

const withMDX = createMDX({});

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/base/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: ['./messages/en.json', './messages/vi.json'],
  },
});
export default withNextIntl(withMDX(nextConfig));
