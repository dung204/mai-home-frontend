'use client';

import { CreditCardIcon, QrCodeIcon } from 'lucide-react';
import Image from 'next/image';

import { Alert, AlertDescription, AlertTitle } from '@/base/components/ui/alert';
import { Button } from '@/base/components/ui/button';

export function TopUpPage() {
  return (
    <section className="mx-auto flex w-lg flex-col gap-8">
      <Alert className="border-y-0 border-r-0 border-l-4 border-[#11cbf0] bg-[#cff4fc]">
        <AlertTitle className="text-base font-semibold text-[#056685]">Ưu đãi nạp tiền:</AlertTitle>
        <AlertDescription className="text-[#1E7894]">
          <ul className="list-disc space-y-1 pl-4">
            <li>Nạp từ 100.000 đến dưới 1.000.000 tặng 10%</li>
            <li>Nạp từ 1.000.000 đến dưới 2.000.000 tặng 20%</li>
            <li>Nạp từ 2.000.000 trở lên tặng 25%</li>
          </ul>
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-4">
        <h2 className="font-medium">Chọn phương thức nạp tiền</h2>
        <Button variant="outline" className="h-12 justify-between text-base" size="lg">
          Quét mã QRCode
          <QrCodeIcon className="size-8" />
        </Button>
        <Button variant="outline" className="h-12 justify-between px-4! text-base" size="lg">
          Ví Momo
          <Image src="/momo-logo.png" alt="Momo Logo" width={32} height={32} />
        </Button>
        <Button variant="outline" className="h-12 justify-between text-base" size="lg">
          Thẻ ATM nội địa
          <CreditCardIcon className="size-8" />
        </Button>
        <Button variant="outline" className="h-12 justify-between p-4! text-base">
          Ví Zalo Pay
          <Image
            src="/zalo-pay-logo.png"
            className="border-border rounded-sm border"
            alt="Zalo Pay Logo"
            width={32}
            height={32}
          />
        </Button>
      </div>
    </section>
  );
}
