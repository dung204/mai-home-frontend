import { Suspense } from 'react';

import { HeaderNav } from './header-nav';
import { UserActions, UserActionsSkeleton } from './user-actions';

export async function Header() {
  return (
    <header className="z-50 flex w-full flex-col bg-white shadow-md">
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-8">
        <HeaderNav />
        <div className="flex items-center gap-2">
          <Suspense fallback={<UserActionsSkeleton />}>
            <UserActions />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
