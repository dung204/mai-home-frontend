import { CheckIcon } from 'lucide-react';

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
    <div className="container m-auto mt-12 flex flex-col gap-16 xl:max-w-6xl!">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-10">
          <h2 className="text-2xl font-semibold uppercase">Bảng giá đăng tin</h2>
          <Table className="border-border border">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-accent"></TableHead>
                <TableHead className="border-border bg-danger border p-3.5 text-center text-lg font-bold text-white">
                  Tin VIP Pro
                </TableHead>
                <TableHead className="border-border bg-primary border p-3.5 text-center text-lg font-bold text-white">
                  Tin VIP
                </TableHead>
                <TableHead className="border-border border bg-[#2175be] p-3.5 text-center text-lg font-bold text-white">
                  Tin thường
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Giá đăng/gia hạn tin</TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  18.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  15.000 VNĐ
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-lg font-bold">
                  3.000 VNĐ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">
                  Thời hạn tin<sup className="ml-0.5">(*)</sup>
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-base">
                  10 ngày
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-base">
                  5 ngày
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-base">
                  8 giờ
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">
                  Tự động duyệt<sup className="ml-0.5">(**)</sup>
                </TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="bg-success flex size-6 items-center justify-center rounded-full text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-border border p-3.5">
                  <div className="flex items-center justify-center">
                    <div className="bg-success flex size-6 items-center justify-center rounded-full text-white">
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
              </TableRow>
              <TableRow>
                <TableCell className="bg-accent p-3.5">Tiêu đề tin</TableCell>
                <TableCell className="border-border text-danger border p-3.5 text-center text-base font-bold uppercase">
                  MÀU ĐỎ, IN HOA
                </TableCell>
                <TableCell className="border-border text-primary border p-3.5 text-center text-base font-semibold uppercase">
                  MÀU CAM, IN HOA
                </TableCell>
                <TableCell className="border-border border p-3.5 text-center text-base font-medium text-[#2175be]">
                  màu xanh, in thường
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="text-left">
            <p className="text-muted-foreground text-xs">
              (*) Đối với Tin thường, quý khách có thể tự chọn bất kỳ khung giờ nào trong ngày đăng
              tin. Tin trong các gói còn lại sẽ có hiệu lực kể từ thời điểm đăng tin
            </p>
            <p className="text-muted-foreground text-xs">
              (**) Các tin VIP & VIP Pro sẽ được hiển thị ngay sau khi khách hàng đăng tin mà không
              cần chờ kiểm duyệt. Tuy nhiên, ban quản trị vẫn tiến hành kiểm duyệt và có thể gỡ tin
              nếu tin vi phạm quy tắc cộng đồng
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
