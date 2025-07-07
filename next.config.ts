import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import remarkFrontmatter from 'remark-frontmatter';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'assets.maihome.info.vn',
        pathname: '/**',
        protocol: 'https',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
  },
});

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/base/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: ['./messages/en.json', './messages/vi.json'],
  },
});
export default withNextIntl(withMDX(nextConfig));
