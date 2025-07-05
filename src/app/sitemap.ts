import * as fs from 'fs/promises';
import type { MetadataRoute } from 'next';
import { join } from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await fs.readdir(join(process.cwd(), './src/news/'))).map((file) =>
    file.replace(/\.mdx?$/, ''),
  );

  return [
    {
      url: 'https://maihome.info.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://maihome.info.com/properties',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    ...posts.map(
      (post) =>
        ({
          url: `https://maihome.info.com/news/${post}`,
          lastModified: new Date(),
          changeFrequency: 'never',
          priority: 0.6,
        }) satisfies MetadataRoute.Sitemap[number],
    ),
  ];
}
