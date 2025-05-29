import { PropsWithChildren } from 'react';

import { TransactionsLayout } from '@/modules/transactions';

export default function Layout({ children }: PropsWithChildren) {
  return <TransactionsLayout>{children}</TransactionsLayout>;
}
