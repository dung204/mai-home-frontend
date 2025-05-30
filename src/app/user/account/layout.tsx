import { PropsWithChildren } from 'react';

import { AccountManagementLayout } from '@/modules/users';

export default function Layout({ children }: PropsWithChildren) {
  return <AccountManagementLayout>{children}</AccountManagementLayout>;
}
