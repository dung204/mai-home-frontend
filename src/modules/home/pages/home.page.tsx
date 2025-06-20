import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { Card, CardContent } from '@/base/components/ui/card';
import { AuthDialog } from '@/modules/auth';
import {
  NewPropertyButton,
  TopApartments,
  TopApartmentsSkeleton,
  TopRentedRooms,
  TopRentedRoomsSkeleton,
  TopShared,
  TopSharedSkeleton,
  TopWholeHouses,
  TopWholeHousesSkeleton,
} from '@/modules/properties';

import { LatestPosts } from '../components/latest-posts';
import { WelcomeBanner } from '../components/welcome-banner';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

export async function HomePage() {
  return (
    <>
      <WelcomeBanner />
      <div className="m-auto flex w-6xl flex-col gap-16">
        <LatestPosts />
        <Suspense fallback={<TopRentedRoomsSkeleton />}>
          <TopRentedRooms />
        </Suspense>
        <Suspense fallback={<TopWholeHousesSkeleton />}>
          <TopWholeHouses />
        </Suspense>
        <Suspense fallback={<TopApartmentsSkeleton />}>
          <TopApartments />
        </Suspense>
        <Suspense fallback={<TopSharedSkeleton />}>
          <TopShared />
        </Suspense>
        <Card>
          <CardContent className="flex flex-col gap-10 px-20 text-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">Tại sao lại chọn Mai Home?</h2>
              <p>
                Chúng tôi hiểu bạn có rất nhiều kênh để lựa chọn, nhưng Mai Home tự hào là nền tảng
                hiệu quả, thân thiện và đáng tin cậy dành cho những ai đang cần cho{' '}
                <Link href="/properties?category=ROOM" className="text-primary font-bold underline">
                  thuê phòng trọ
                </Link>
                ,{' '}
                <Link
                  href="/properties?category=HOUSE"
                  className="text-primary font-bold underline"
                >
                  nhà nguyên căn
                </Link>
                ,{' '}
                <Link
                  href="/properties?category=APARTMENT"
                  className="text-primary font-bold underline"
                >
                  chung cư mini
                </Link>
                , hoặc{' '}
                <Link
                  href="/properties?category=SHARED"
                  className="text-primary font-bold underline"
                >
                  tìm người ở ghép
                </Link>
                .
              </p>
              <p>
                Với hệ thống tối ưu chuẩn SEO và lượng truy cập ổn định, tin đăng của bạn trên Mai
                Home sẽ tiếp cận được nhiều khách hàng hơn từ đó giao dịch nhanh chóng, hạn chế tình
                trạng phòng trống kéo dài và tiết kiệm chi phí đáng kể.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-xl font-bold">Bạn đang có phòng trọ / căn hộ cho thuê?</h2>
              <p>
                Đừng để phòng trống lâu ngày!
                <br />
                Hãy để Mai Home giúp bạn tiếp cận đúng người - đúng nhu cầu - đúng thời điểm.
              </p>
              <NewPropertyButton />
            </div>
          </CardContent>
        </Card>
      </div>
      <AuthDialog />
    </>
  );
}
