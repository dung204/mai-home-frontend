import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
        pathname: '/dmpllzq2z/image/upload/**',
        protocol: 'https',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/base/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: ['./messages/en.json', './messages/vi.json'],
  },
});
export default withNextIntl(nextConfig);
