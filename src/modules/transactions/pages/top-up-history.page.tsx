import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/base/components/ui/table';

export function TopUpHistoryPage() {
  return (
    <section className="my-10 w-full px-10">
      <Table>
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead>Mã giao dịch</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày nạp</TableHead>
            <TableHead>Số tiền nạp</TableHead>
            <TableHead>Thuế</TableHead>
            <TableHead>Khuyến mại</TableHead>
            <TableHead>Phương thức</TableHead>
            <TableHead>Ghi chú</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="py-6 text-center">
              Không có dữ liệu.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
