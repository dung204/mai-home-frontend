import { PropsWithChildren } from 'react';

import { UserLayout } from '@/modules/users';

export default function Layout({ children }: PropsWithChildren) {
  return <UserLayout>{children}</UserLayout>;
}
