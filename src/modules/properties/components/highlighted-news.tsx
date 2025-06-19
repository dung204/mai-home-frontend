import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';

export function HighlightedNews() {
  return (
    <section>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Có thể bạn quan tâm</h2>
            <div className="flex flex-col gap-1">
              <Button variant="link" className="col-span-1 cursor-default p-0! text-base">
                <ChevronRight />
                <span className="grow truncate">
                  <Link
                    href="/news/1"
                    title="“Giải Mã” Giá Phòng Trọ Tại Hòa Lạc Năm 2025: Gần Trường - Tiện Nghi - Hợp Ví Tiền"
                  >
                    “Giải Mã” Giá Phòng Trọ Tại Hòa Lạc Năm 2025: Gần Trường - Tiện Nghi - Hợp Ví
                    Tiền
                  </Link>
                </span>
              </Button>
              <Button variant="link" className="col-span-1 cursor-default p-0! text-base">
                <ChevronRight />
                <span className="grow truncate">
                  <Link
                    href="/news/2"
                    title="Tân Xã - “Thiên Đường Trọ Sinh Viên” Tại Hòa Lạc: Giá Mềm, Gần Trường, Đủ Tiện Nghi"
                  >
                    Tân Xã - “Thiên Đường Trọ Sinh Viên” Tại Hòa Lạc: Giá Mềm, Gần Trường, Đủ Tiện
                    Nghi
                  </Link>
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
