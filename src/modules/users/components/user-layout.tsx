import { PropsWithChildren } from 'react';

import { UserHeader } from './user-header';
import { UserSidebar } from './user-sidebar';

export function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <UserHeader />
      <main className="bg-accent flex grow">
        <UserSidebar />
        <div className="flex grow flex-col">{children}</div>
      </main>
    </div>
  );
}
