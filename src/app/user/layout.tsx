import { PropsWithChildren, Suspense } from 'react';

import { DehydratedHeader, Header } from '@/base/components/layout/header';
import { AuthDialogProvider } from '@/base/providers';
import { UserSidebar, UserSidebarSkeleton } from '@/modules/users';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthDialogProvider>
      <div className="flex h-screen flex-col">
        <Suspense fallback={<DehydratedHeader brandImage="/mai-home-logo-white.png" />}>
          <Header brandImage="/mai-home-logo-white.png" className="bg-[#0E4DB3] [&_*]:text-white" />
        </Suspense>
        <main className="bg-accent relative flex grow">
          <Suspense fallback={<UserSidebarSkeleton />}>
            <UserSidebar />
          </Suspense>
          <div className="flex grow flex-col">{children}</div>
        </main>
      </div>
    </AuthDialogProvider>
  );
}
