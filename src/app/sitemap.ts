import axios from 'axios';
import * as fs from 'fs/promises';
import type { MetadataRoute } from 'next';
import { join } from 'path';

import { envServer } from '@/base/config/env-server.config';
import { PropertyCategory } from '@/modules/properties';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await fs.readdir(join(process.cwd(), './src/news/'))).map((file) =>
    file.replace(/\.mdx?$/, ''),
  );

  const propertyIdsRes = await axios.get(`${envServer.API_URL}properties/ids`);
  const propertyIds = propertyIdsRes.data.data as string[];

  return [
    {
      url: 'https://www.maihome.info.vn',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.maihome.info.vn/properties',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    ...propertyIds.map(
      (id) =>
        ({
          url: `https://www.maihome.info.vn/property/${id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.9,
        }) satisfies MetadataRoute.Sitemap[number],
    ),
    ...Object.values(PropertyCategory).map(
      (category) =>
        ({
          url: `https://www.maihome.info.vn/properties?category=${category}`,
          lastModified: new Date(),
          changeFrequency: 'always',
          priority: 0.8,
        }) satisfies MetadataRoute.Sitemap[number],
    ),
    {
      url: 'https://www.maihome.info.vn/news/all',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    ...posts.map(
      (post) =>
        ({
          url: `https://www.maihome.info.vn/news/${post}`,
          lastModified: new Date(),
          changeFrequency: 'never',
          priority: 0.6,
        }) satisfies MetadataRoute.Sitemap[number],
    ),
  ];
}
