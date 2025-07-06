import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/base/components/ui/card';

import { News } from '../types';
import { NewsCategoryBadge } from './news-category-badge';

interface NewsCardProps {
  news: News;
}

export async function NewsCard({ news }: NewsCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-6">
          <Link href={`/news/${news.id}`}>
            <div className="relative aspect-square w-32 sm:w-32">
              <Image
                src={await news.coverImage}
                alt={news.title}
                className="size-full rounded-md bg-black/50 object-cover object-center"
                fill
              />
            </div>
          </Link>
          <div className="flex w-full flex-col gap-4">
            <Link href={`/news/${news.id}`}>
              <div className="h-[2lh] text-lg font-bold">
                <span className="line-clamp-2" title={news.title}>
                  {news.title}
                </span>
              </div>
            </Link>
            <NewsCategoryBadge category={news.category} />
            <p>
              Xuất bản vào{' '}
              {new Intl.RelativeTimeFormat('vi-VN', { numeric: 'auto' })
                .format(
                  Math.round((new Date(news.publishedDate).getTime() - Date.now()) / 86400000),
                  'days',
                )
                .toLocaleLowerCase('vi-VN')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
