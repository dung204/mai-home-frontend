import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import {
  PropertyCategory,
  PropertySearchParams,
  UserPropertiesPage,
  UserPropertiesPageSkeleton,
  propertySearchParamsSchema,
} from '@/modules/properties';

export const metadata: Metadata = {
  title: 'Danh sách tin đăng',
};

type PageProps = {
  searchParams: Promise<
    PropertySearchParams & {
      filter?: 'active' | 'deleted';
    }
  >;
};

export default async function Page({ searchParams }: PageProps) {
  const { filter, category, ...otherSearchParams } = await searchParams;
  const awaitedSearchParams = propertySearchParamsSchema.parse(
    otherSearchParams,
  ) as PropertySearchParams;
  const cookieStore = await cookies();
  const user = JSON.parse(cookieStore.get('user')?.value ?? '{}');

  if (filter && !['active', 'deleted'].includes(filter)) {
    redirect('/user/properties');
  }

  if (!category || !Object.values(PropertyCategory).includes(category as PropertyCategory)) {
    delete awaitedSearchParams.category;
  }

  return (
    <Suspense fallback={<UserPropertiesPageSkeleton />}>
      <UserPropertiesPage
        user={user}
        searchParams={{
          filter,
          ...awaitedSearchParams,
          ...(category && { category }),
        }}
      />
    </Suspense>
  );
}
