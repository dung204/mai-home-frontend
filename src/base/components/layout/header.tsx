import { cookies } from 'next/headers';

import { cn } from '@/base/lib';
import { userSchema } from '@/modules/users';

import { DehydratedHeaderNav, HeaderNav } from './header-nav';
import { UserActions, UserActionsSkeleton } from './user-actions';

interface HeaderProps {
  className?: string;
}

export async function Header({ className }: HeaderProps) {
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return (
    <header className={cn('z-50 flex w-full flex-col bg-white shadow-md', className)}>
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-4 xl:px-8">
        <HeaderNav user={user} />
        <div className="flex items-center">
          <UserActions user={user} />
        </div>
      </div>
    </header>
  );
}

export function DehydratedHeader({ className }: HeaderProps) {
  return (
    <header className={cn('z-50 flex w-full flex-col bg-white shadow-md', className)}>
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-4 xl:px-8">
        <DehydratedHeaderNav />
        <div className="flex items-center">
          <UserActionsSkeleton />
        </div>
      </div>
    </header>
  );
}
