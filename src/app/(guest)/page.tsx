import { Metadata } from 'next';
import { Suspense } from 'react';

import { HomePage, HomePageSkeleton } from '@/modules/home';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

export default function Page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
