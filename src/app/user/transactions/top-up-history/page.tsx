import { Metadata } from 'next';

import { TopUpHistoryPage } from '@/modules/transactions';

export const metadata: Metadata = {
  title: 'Lịch sử nạp tiền',
};

export default function Page() {
  return <TopUpHistoryPage />;
}
