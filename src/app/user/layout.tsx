import { PropsWithChildren, Suspense } from 'react';

import { AuthDialogProvider } from '@/base/providers';
import {
  DehydratedUserHeader,
  UserHeader,
  UserSidebar,
  UserSidebarSkeleton,
} from '@/modules/users';

// eslint-disable-next-line camelcase
export const experimental_ppr = true;

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthDialogProvider>
      <div className="flex h-screen flex-col">
        <Suspense fallback={<DehydratedUserHeader />}>
          <UserHeader />
        </Suspense>
        <main className="bg-accent flex grow">
          <Suspense fallback={<UserSidebarSkeleton />}>
            <UserSidebar />
          </Suspense>
          <div className="flex grow flex-col">{children}</div>
        </main>
      </div>
    </AuthDialogProvider>
  );
}
