import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '../ui/separator';

export function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="grid gap-y-12 pt-10 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 flex flex-col gap-4 max-lg:items-center">
          <h3 className="text-lg font-semibold uppercase">Về Maihome</h3>
          <Link href="#" className="capitalize">
            Giới thiệu
          </Link>
          <Link href="#" className="capitalize">
            Chính sách bảo mật
          </Link>
          <Link href="#" className="capitalize">
            Liên hệ
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 max-lg:items-center">
          <h3 className="text-lg font-semibold uppercase">Dành cho khách hàng</h3>
          <Link href="#" className="capitalize">
            Câu hỏi thường gặp
          </Link>
          <Link href="#" className="capitalize">
            Hướng dẫn đăng tin
          </Link>
          <Link href="#" className="capitalize">
            Bảng giá dịch vụ
          </Link>
          <Link href="#" className="capitalize">
            Quyền khiếu nại
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 max-lg:items-center">
          <h3 className="text-lg font-semibold uppercase">Phương thức thanh toán</h3>
          <div className="flex flex-wrap items-center gap-8">
            <Image src="/visa-logo.png" alt="Visa" width={50} height={50}></Image>
            <Image src="/momo-logo.png" alt="Momo" width={50} height={50}></Image>
            <Image src="/zalo-pay-logo.png" alt="Zalo pay" width={50} height={50}></Image>
            <Image src="/shopee-pay-logo.png" alt="Shopee pay" width={50} height={50}></Image>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4 max-lg:items-center">
          <h3 className="text-lg font-semibold uppercase">Theo dõi Maihome</h3>
          <div className="flex flex-wrap items-center gap-8">
            <Link href="https://www.facebook.com/Maihomeforyou" target="_blank">
              <Image src="/facebook-logo.svg" alt="Facebook" width={50} height={50}></Image>
            </Link>
            <Image src="/zalo-logo.png" alt="Zalo" width={50} height={50}></Image>
          </div>
        </div>
      </div>
      <Separator className="bg-muted-foreground" />
      <div className="flex flex-col gap-2.5 py-12 max-sm:items-center max-sm:text-center">
        <h3 className="text-lg font-semibold uppercase">Thuộc dự án của Hoa Mai Group</h3>
        <p>Khu Công Nghệ Cao Hòa Lạc, km 29, Đại lộ, Thăng Long, Hà Nội</p>
        <p>
          Email:{' '}
          <Link href="mailto:contact@maihome.info.vn" className="text-blue-500 underline">
            contact@maihome.info.vn
          </Link>
        </p>
        <p>
          Hotline:{' '}
          <Link href="tel:0375028703" className="text-blue-500 underline">
            037 502 8703
          </Link>
        </p>
      </div>
    </footer>
  );
}
