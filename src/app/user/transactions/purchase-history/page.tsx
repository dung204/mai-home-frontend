import { Metadata } from 'next';

import { PurchaseHistoryPage } from '@/modules/transactions';

export const metadata: Metadata = {
  title: 'Lịch sử thanh toán',
};

export default function Page() {
  return <PurchaseHistoryPage />;
}
