import { Metadata } from 'next';
import { Suspense } from 'react';

import { HomePage, HomePageSkeleton } from '@/modules/home';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description:
    'Nhà là nơi có người chờ, trọ là nơi ta tự chăm lòng mình còn Maihome là nơi giúp bạn tìm được chỗ trọ ưng ý để lòng mình an yên.',
};

export default async function Page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
