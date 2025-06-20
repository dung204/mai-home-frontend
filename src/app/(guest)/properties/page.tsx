import { Metadata } from 'next';
import { Suspense } from 'react';

import {
  PropertiesPage,
  PropertiesPageSkeleton,
  PropertySearchParams,
  propertySearchParamsSchema,
} from '@/modules/properties';

export const metadata: Metadata = {
  title: 'Danh sách phòng trọ',
};

type PageProps = {
  searchParams: Promise<PropertySearchParams>;
};

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
