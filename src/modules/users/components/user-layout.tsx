import { PropsWithChildren } from 'react';

import { Footer } from '@/base/components/layout/footer';

import { UserHeader } from './user-header';
import { UserSidebar } from './user-sidebar';

export function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <UserHeader />
      <main className="bg-accent mt-[87px] min-h-[calc(100vh-87px)]">
        <UserSidebar />
        <div className="ml-[300px] flex grow flex-col">
          {children}
          <div className="w-full px-10">
            <div className="border-muted-foreground size-full border-t">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
