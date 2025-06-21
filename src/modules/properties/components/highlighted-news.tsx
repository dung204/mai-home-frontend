import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/base/components/ui/card';

export function HighlightedNews() {
  return (
    <section>
      <Card className="size-full">
        <CardContent>
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Có thể bạn quan tâm</h2>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ChevronRight className="text-primary size-8" />
                <Link
                  href="/news/1"
                  className="text-primary line-clamp-1 text-base font-medium"
                  title='"Giải Mã" Giá Phòng Trọ Tại Hòa Lạc Năm 2025: Gần Trường - Tiện Nghi - Hợp Ví Tiền'
                >
                  &quot;Giải Mã&quot; Giá Phòng Trọ Tại Hòa Lạc Năm 2025: Gần Trường - Tiện Nghi -
                  Hợp Ví Tiền
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="text-primary size-8" />
                <Link
                  href="/news/1"
                  className="text-primary line-clamp-1 text-base font-medium"
                  title="Tân Xã - “Thiên Đường Trọ Sinh Viên” Tại Hòa Lạc: Giá Mềm, Gần Trường, Đủ Tiện Nghi"
                >
                  Tân Xã - “Thiên Đường Trọ Sinh Viên” Tại Hòa Lạc: Giá Mềm, Gần Trường, Đủ Tiện
                  Nghi
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
