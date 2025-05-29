import { Metadata } from 'next';

import { TopUpPage } from '@/modules/transactions';

export const metadata: Metadata = {
  title: 'Nạp tiền vào tài khoản',
};

export default function Page() {
  return <TopUpPage />;
}
