import { Metadata } from 'next';
import { Suspense } from 'react';

import {
  PropertiesPage,
  PropertiesPageSkeleton,
  PropertySearchParams,
  propertyCategories,
  propertySearchParamsSchema,
} from '@/modules/properties';

type PageProps = {
  searchParams: Promise<PropertySearchParams>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const title = !category
    ? 'Tất cả bài đăng'
    : `Danh sách bài đăng ${propertyCategories[category].toLocaleLowerCase('vi-VN')}`;
  const description = `Danh sách ${!category ? 'tất cả bài đăng' : `các bài đăng ${propertyCategories[category].toLocaleLowerCase('vi-VN')} trên Mai Home`}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://maihome.info.vn/properties?${new URLSearchParams(
        Object.entries(await searchParams),
      ).toString()}`,
      countryName: 'Vietnam',
      siteName: 'Mai Home',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const awaitedSearchParams = propertySearchParamsSchema.parse(
    await searchParams,
  ) as PropertySearchParams;

  return (
    <Suspense fallback={<PropertiesPageSkeleton />}>
      <PropertiesPage searchParams={awaitedSearchParams} />
    </Suspense>
  );
}
