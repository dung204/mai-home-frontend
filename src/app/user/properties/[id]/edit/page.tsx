import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { getQueryClient } from '@/base/lib';
import { propertiesService } from '@/modules/properties';
import {
  EditPropertyPage,
  EditPropertyPageNotFound,
  EditPropertyPageSkeleton,
} from '@/modules/properties/pages/edit-property.page';
import { userSchema } from '@/modules/users';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Chỉnh sửa bài đăng',
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;
  const queryClient = getQueryClient();

  let property;

  try {
    property = (
      await queryClient.fetchQuery({
        queryKey: ['property', id],
        queryFn: () => propertiesService.getPropertyById(id),
      })
    ).data;

    if (!property || property.owner.id !== user!.id) throw new Error();
  } catch (_err) {
    return <EditPropertyPageNotFound />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<EditPropertyPageSkeleton />}>
        <EditPropertyPage propertyId={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
