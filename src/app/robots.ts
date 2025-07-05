import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/user/',
    },
    sitemap: 'https://maihome.info.vn/sitemap.xml',
  };
}
