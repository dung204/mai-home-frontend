import { StaticImageData } from 'next/image';
import { z } from 'zod';

import { commonSearchParamsSchema } from '@/base/types';

export enum NewsCategory {
  NEWS = 'news',
  HANDBOOK = 'handbook',
  GUIDE = 'guide',
}

export const newsCategory = {
  [NewsCategory.NEWS]: 'Tin tức',
  [NewsCategory.HANDBOOK]: 'Cẩm nang',
  [NewsCategory.GUIDE]: 'Hướng dẫn',
};

export const newsSearchParams = commonSearchParamsSchema.pick({ page: true }).extend({
  category: z.nativeEnum(NewsCategory).optional().catch(undefined),
});

export type NewsSearchParams = z.infer<typeof newsSearchParams>;

export type News = {
  id: string;
  title: string;
  description: string;
  category: NewsCategory;
  publishedDate: Date;
  coverImage: Promise<StaticImageData>;
};
