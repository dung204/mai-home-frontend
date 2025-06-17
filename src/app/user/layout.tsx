import { PropsWithChildren } from 'react';

import { AuthDialogProvider } from '@/base/providers';
import { UserLayout } from '@/modules/users';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthDialogProvider>
      <UserLayout>{children}</UserLayout>
    </AuthDialogProvider>
  );
}
