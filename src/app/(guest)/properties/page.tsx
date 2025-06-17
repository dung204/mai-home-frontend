import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { getQueryClient } from '@/base/lib';
import {
  PropertiesPage,
  PropertiesPageSkeleton,
  PropertySearchParams,
  propertiesService,
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
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['properties', 'all', awaitedSearchParams],
    queryFn: () => propertiesService.getAllProperties(awaitedSearchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<PropertiesPageSkeleton />}>
        <PropertiesPage searchParams={awaitedSearchParams} />
      </Suspense>
    </HydrationBoundary>
  );
}
