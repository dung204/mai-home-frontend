import { FilePlus2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';

import { LatestPosts } from '../components/latest-posts';
import { TopMiniApartmentBuildings } from '../components/top-mini-apartment-buildings';
import { TopRentedRooms } from '../components/top-rented-rooms';
import { TopWholeHouses } from '../components/top-whole-houses';

export function HomePage() {
  return (
    <>
      <div className="relative h-screen w-full">
        <Image
          src="/home-banner.png"
          alt="home banner"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pt-[142px] text-white">
          <div className="font-josefinslab text-6xl! font-semibold uppercase text-shadow-sm">
            Welcome to
          </div>
          <div className="font-lilitaone text-9xl! uppercase text-shadow-sm">Mai Home</div>
          <div className="text-2xl! font-bold text-shadow-sm">
            Website tìm trọ tốt nhất hiện nay
          </div>
          <Button size="lg" className="p-7! text-xl! font-semibold">
            <FilePlus2Icon className="size-6" />
            Đăng tin ngay
          </Button>
        </div>
      </div>
      <div className="m-auto flex w-6xl flex-col gap-16">
        <LatestPosts />
        <TopRentedRooms />
        <TopWholeHouses />
        <TopMiniApartmentBuildings />
        <Card>
          <CardContent className="flex flex-col gap-10 px-20 text-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">Tại sao lại chọn Mai Home?</h2>
              <p>
                Chúng tôi hiểu bạn có rất nhiều kênh để lựa chọn, nhưng Mai Home tự hào là nền tảng
                hiệu quả, thân thiện và đáng tin cậy dành cho những ai đang cần cho{' '}
                <Link href="#" className="text-primary font-bold underline">
                  thuê phòng trọ
                </Link>
                ,{' '}
                <Link href="#" className="text-primary font-bold underline">
                  nhà nguyên căn
                </Link>
                ,{' '}
                <Link href="#" className="text-primary font-bold underline">
                  chung cư mini
                </Link>
                , hoặc{' '}
                <Link href="#" className="text-primary font-bold underline">
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
              <Button size="lg" className="w-max p-7! text-xl! font-semibold">
                <FilePlus2Icon className="size-6" />
                Đăng tin ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
