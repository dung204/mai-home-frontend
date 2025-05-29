import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/base/components/ui/table';

export function PurchaseHistoryPage() {
  return (
    <section className="my-10 w-full px-10">
      <Table>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead>Mã tin</TableHead>
            <TableHead>Loại tin</TableHead>
            <TableHead>Phí thanh toán</TableHead>
            <TableHead>Thuế</TableHead>
            <TableHead>Số dư trước</TableHead>
            <TableHead>Số dư sau</TableHead>
            <TableHead>Thời gian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="py-6 text-center">
              Không có dữ liệu.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
