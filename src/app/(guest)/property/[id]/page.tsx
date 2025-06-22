import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Suspense, cache } from 'react';

import { getQueryClient } from '@/base/lib';
import {
  PropertyDetailsNotFound,
  PropertyDetailsPage,
  PropertyDetailsPageSkeleton,
  propertiesService,
} from '@/modules/properties';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const fetchProperty = cache((id: string) => propertiesService.getPropertyById(id));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data: property } = await fetchProperty(id);

    return {
      title: property.title,
      description: property.description,
      openGraph: {
        title: property.title,
        description: property.description,
        images: [
          {
            url: property.images[0] || '',
            width: 800,
            height: 600,
            alt: property.title,
          },
        ],
      },
      twitter: {
        title: property.title,
        description: property.description,
        images: [property.images[0] || ''],
      },
    };
  } catch (_err) {
    return {
      title: 'Không tìm thấy bài đăng',
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ['property', id],
      queryFn: () => propertiesService.getPropertyById(id),
    });
  } catch (_err) {
    return <PropertyDetailsNotFound />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<PropertyDetailsPageSkeleton />}>
        <PropertyDetailsPage id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
