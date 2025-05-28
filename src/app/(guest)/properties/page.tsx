import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { PropertiesPage } from '@/modules/properties';

export const metadata: Metadata = {
  title: 'Danh sách phòng trọ',
};

type PageProps = {
  searchParams: Promise<{
    type?: 'room' | 'house' | 'apartment' | 'shared';
    view?: 'recommended' | 'latest';
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  let needRedirect = false;
  const awaitedSearchParams = await searchParams;
  const { type, view } = awaitedSearchParams;
  const newSearchParams = new URLSearchParams(awaitedSearchParams as Record<string, string>);

  if (!type || !['room', 'house', 'apartment', 'shared'].includes(type)) {
    newSearchParams.set('type', 'room');
    needRedirect = true;
  }

  if (!view || !['recommended', 'latest'].includes(view)) {
    newSearchParams.set('view', 'recommended');
    needRedirect = true;
  }

  if (needRedirect) {
    redirect(`/properties?${newSearchParams.toString()}`);
  }

  return <PropertiesPage />;
}
