import { cookies } from 'next/headers';

import { userSchema } from '@/modules/users';

import { DehydratedHeaderNav, HeaderNav } from './header-nav';
import { UserActions, UserActionsSkeleton } from './user-actions';

export async function Header() {
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return (
    <header className="z-50 flex w-full flex-col bg-white shadow-md">
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-4 xl:px-8">
        <HeaderNav user={user} />
        <div className="flex items-center">
          <UserActions user={user} />
        </div>
      </div>
    </header>
  );
}

export function DehydratedHeader() {
  return (
    <header className="z-[100] flex w-full flex-col bg-white shadow-md">
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-8">
        <DehydratedHeaderNav />
        <div className="flex items-center gap-2">
          <UserActionsSkeleton />
        </div>
      </div>
    </header>
  );
}
