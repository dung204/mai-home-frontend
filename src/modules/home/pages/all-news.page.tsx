import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import path from 'path';
import { Suspense } from 'react';

import { Pagination } from '@/base/components/layout/pagination';
import { HighlightedNews } from '@/modules/properties/components/highlighted-news';
import {
  HighlightedProperties,
  HighlightedPropertiesSkeleton,
} from '@/modules/properties/components/highlighted-properties';
import {
  RecommendedProperties,
  RecommendedPropertiesSkeleton,
} from '@/modules/properties/components/recommended-properties';

import { NewsCard } from '../components/news-card';
import { NewsCategorySelect } from '../components/news-category-select';
import { NewsSearchParams, newsCategory } from '../types';

interface AllNewsPageProps {
  searchParams: NewsSearchParams;
}

export function AllNewsPage({ searchParams }: AllNewsPageProps) {
  const { page, category } = searchParams;

  const newsDir = path.join(process.cwd(), 'src', 'news');
  const allNews = fs.readdirSync(newsDir).filter((news) => {
    if (!category) return true;

    const {
      data: { category: newsCategory },
    } = matter(fs.readFileSync(path.join(newsDir, news, 'post.mdx'), 'utf-8'));

    return newsCategory === category;
  });
  const latestSortedNews = fs
    .readdirSync(newsDir)
    .toSorted((a, b) => {
      const {
        data: { date: bDate },
      } = matter(fs.readFileSync(path.join(newsDir, b, 'post.mdx'), 'utf-8'));
      const {
        data: { date: aDate },
      } = matter(fs.readFileSync(path.join(newsDir, a, 'post.mdx'), 'utf-8'));
      const subDate = new Date(bDate).getTime() - new Date(aDate).getTime();

      if (subDate === 0) {
        const bModified = fs.statSync(path.join(newsDir, b)).mtime.getTime();
        const aModified = fs.statSync(path.join(newsDir, a)).mtime.getTime();
        return bModified - aModified;
      }

      return subDate;
    })
    .filter((news) => {
      if (!category) return true;

      const {
        data: { category: newsCategory },
      } = matter(fs.readFileSync(path.join(newsDir, news, 'post.mdx'), 'utf-8'));

      return newsCategory === category;
    })
    .slice((page ?? 1 - 1) * 6, page ?? 1 * 6)
    .map((news) => {
      const {
        data: { title, description, category, date },
      } = matter(fs.readFileSync(path.join(newsDir, news, 'post.mdx'), 'utf-8'));

      return {
        id: news,
        title,
        description,
        publishedDate: new Date(date),
        category,
        coverImage: import(`@/news/${news}/cover.webp`).then((mod) => mod.default),
      };
    });

  return (
    <div className="container mx-auto mt-12 flex flex-col gap-x-16 xl:max-w-6xl!">
      <div className="grid-col-2 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="max-xs:flex-col flex items-center justify-between gap-2">
            <span className="max-xs:text-center" title={getTitle(searchParams)}>
              {getTitle(searchParams)}
            </span>
          </div>
          {latestSortedNews.length !== 0 ? (
            <>
              {latestSortedNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
              <Pagination
                pagination={{
                  currentPage: page ?? 1,
                  total: allNews.length,
                  pageSize: 6,
                  totalPage: Math.ceil(allNews.length / 6),
                  hasNextPage: (page ?? 1) * 6 < allNews.length,
                  hasPreviousPage: (page ?? 1) > 1,
                }}
              />
            </>
          ) : (
            <div className="space-y-20">
              <div className="flex flex-col items-center gap-4">
                <Image src="/result-not-found.png" alt="not found" width={300} height={300} />
                <p className="w-2/3 text-center">
                  Không tìm thấy bài viết nào thuộc chuyên mục này. Vui lòng chọn chuyên mục khác.
                </p>
              </div>
              <Suspense fallback={<RecommendedPropertiesSkeleton />}>
                <RecommendedProperties />
              </Suspense>
            </div>
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <Suspense>
            <NewsCategorySelect category={category} />
          </Suspense>
          <Suspense fallback={<HighlightedPropertiesSkeleton />}>
            <HighlightedProperties />
          </Suspense>
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}

function getTitle({ category }: NewsSearchParams) {
  if (!category) {
    return 'Đang hiện tất cả bài viết';
  }

  return `Đang hiện bài viết thuộc chuyên mục ${newsCategory[category].toLocaleLowerCase('vi-VN')}`;
}
