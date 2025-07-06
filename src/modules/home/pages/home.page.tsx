import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { Card, CardContent } from '@/base/components/ui/card';
import {
  NewPropertyButton,
  NewPropertyButtonSkeleton,
  TopApartments,
  TopApartmentsSkeleton,
  TopRentedRooms,
  TopRentedRoomsSkeleton,
  TopShared,
  TopSharedSkeleton,
  TopWholeHouses,
  TopWholeHousesSkeleton,
} from '@/modules/properties';
import { userSchema } from '@/modules/users';

import { LatestNews } from '../components/latest-news';

export async function HomePage() {
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return (
    <>
      <section className="relative h-[calc(100vh-5rem)]">
        <Image
          src="/home-banner.png"
          alt="home banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">
          <div className="font-josefinslab text-center text-[clamp(2.25rem,1.6285rem+2.6519vw,3.75rem)]! leading-[1] font-semibold uppercase text-shadow-sm">
            Welcome to
          </div>
          <div className="font-lilitaone text-center text-[clamp(4.5rem,3.0497rem+6.1878vw,8rem)]! leading-[1] uppercase text-shadow-sm">
            Mai Home
          </div>
          <div className="text-center text-[clamp(1.25rem,1.1464rem+0.442vw,1.5rem)]! font-bold text-shadow-sm">
            Website tìm trọ tốt nhất hiện nay
          </div>
          <NewPropertyButton user={user} />
        </div>
      </section>
      <div className="container m-auto flex flex-col gap-16 xl:max-w-6xl!">
        <LatestNews />
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
          <CardContent className="flex flex-col gap-10 px-8 text-center sm:px-20">
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
              <NewPropertyButton user={user} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <section className="relative h-[calc(100vh-5rem)]">
        <Image
          src="/home-banner.png"
          alt="home banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">
          <div className="font-josefinslab text-center text-[clamp(2.25rem,1.6285rem+2.6519vw,3.75rem)]! leading-[1] font-semibold uppercase text-shadow-sm">
            Welcome to
          </div>
          <div className="font-lilitaone text-center text-[clamp(4.5rem,3.0497rem+6.1878vw,8rem)]! leading-[1] uppercase text-shadow-sm">
            Mai Home
          </div>
          <div className="text-center text-[clamp(1.25rem,1.1464rem+0.442vw,1.5rem)]! font-bold text-shadow-sm">
            Website tìm trọ tốt nhất hiện nay
          </div>
          <NewPropertyButtonSkeleton />
        </div>
      </section>
      <div className="container m-auto flex flex-col gap-16 xl:max-w-6xl!">
        <LatestNews />
        <TopRentedRoomsSkeleton />
        <TopWholeHousesSkeleton />
        <TopApartmentsSkeleton />
        <TopSharedSkeleton />
        <Card>
          <CardContent className="flex flex-col gap-10 px-8 text-center sm:px-20">
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
              <NewPropertyButtonSkeleton />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
