import { CheckIcon, ChevronsRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/base/components/ui/table';

export function ServicesPage() {
  return (
    <div className="m-auto flex w-6xl flex-col gap-16 pt-[206px]">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-10">
          <h2 className="text-2xl font-semibold uppercase">Bảng giá đăng tin</h2>
          <Table className="border-border border">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-accent"></TableHead>
                <TableHead className="border-border border bg-[#B9E7DD] p-3.5 text-center text-lg font-bold text-white">
                  Tin thường
                </TableHead>
                <TableHead className="border-border border bg-[#90CFD4] p-3.5 text-center text-lg font-bold text-white">
                  Tin VIP 1
                </TableHead>
                <TableHead className="border-border border bg-[#57B0C2] p-3.5 text-center text-lg font-bold text-white">
                  Tin VIP 2
                </TableHead>
                <TableHead className="border-border border bg-[#388FA3] p-3.5 text-center text-lg font-bold text-white">
                  Tin VIP 3
                </TableHead>
                <TableHead className="border-border border bg-[#236D88] p-3.5 text-center text-lg font-bold text-white">
                  Tin nổi bật
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Giá ngày</TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Giá tuần (7 ngày)</TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Giá tháng (30 ngày)</TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Giá đẩy tin</TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  50.000 VNĐ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Kích thước tin</TableCell>
                <TableCell className="border-border border p-3.5 text-center">Nhỏ</TableCell>
                <TableCell className="border-border border p-3.5 text-center">Trung bình</TableCell>
                <TableCell className="border-border border p-3.5 text-center">Trung bình</TableCell>
                <TableCell className="border-border border p-3.5 text-center">Lớn</TableCell>
                <TableCell className="border-border border p-3.5 text-center">Rất lớn</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Hiển thị nút gọi điện</TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[rgba(200,200,200,1)] text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[rgba(200,200,200,1)] text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[rgba(200,200,200,1)] text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#12B500] text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#12B500] text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-muted-foreground text-xs">
            (*) Các tin VIP sẽ được hiển thị ngay sau khi khách hàng đăng tin mà không cần chờ kiểm
            duyệt. Tin đăng sẽ được kiểm duyệt nội dung sau.
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col">
        <h2 className="mb-16 text-center text-2xl font-semibold uppercase">Dịch vụ vận chuyển</h2>
        <div className="grid grid-cols-2 gap-10">
          <Card className="col-span-1">
            <CardContent className="flex flex-col gap-4 p-8">
              <Image src="/transportation.png" alt="transportation" width={141} height={141} />
              <div className="mt-6 text-3xl font-bold uppercase">
                200+ tài xế đang sẵn sàng để vận chuyển
              </div>
              <Button variant="link" className="w-max p-0! text-lg">
                Khám phá ngay
                <ChevronsRight className="size-5" />
              </Button>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="flex flex-col gap-4 p-8">
              <Image src="/transportation-fee.png" alt="transportation" width={141} height={141} />
              <div className="mt-6 text-3xl font-bold uppercase">
                chi phí vận chuyển và giá cước
              </div>
              <Button variant="link" className="w-max p-0! text-lg">
                Khám phá ngay
                <ChevronsRight className="size-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
