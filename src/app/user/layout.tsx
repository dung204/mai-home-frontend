import { PropsWithChildren, Suspense } from 'react';

import { DehydratedHeader, Header } from '@/base/components/layout/header';
import { AuthDialogProvider } from '@/base/providers';
import { UserSidebar, UserSidebarSkeleton } from '@/modules/users';

// eslint-disable-next-line camelcase
export const experimental_ppr = true;

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthDialogProvider>
      <div className="flex h-screen flex-col">
        <Suspense fallback={<DehydratedHeader />}>
          <Header className="bg-[#0E4DB3] [&_*]:text-white" />
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
