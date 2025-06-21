import { HeadsetIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/base/components/ui/avatar';
import { Separator } from '@/base/components/ui/separator';
import { Skeleton } from '@/base/components/ui/skeleton';

import { userSchema } from '../types';
import { UserSidebarNav } from './user-sidebar-nav';

export async function UserSidebar() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return (
    <aside className="h-max w-[300px] bg-white shadow-md">
      <div className="flex flex-col gap-6 p-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="/default-user-avatar.png" />
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold">{user?.displayName}</span>
            <span className="text-muted-foreground text-sm">{user?.phone}</span>
          </div>
        </div>
        {/* <div className="border-primary/50 bg-primary/10 flex items-center justify-between gap-4 rounded-lg border-2 px-4 py-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-light">Số dư tài khoản</span>
            <span className="w-[10ch] truncate text-base font-bold">0</span>
          </div>
          <Link href="/user/transactions/top-up">
            <Button>
              <BanknoteArrowUp />
              Nạp tiền
            </Button>
          </Link>
        </div> */}
        <UserSidebarNav />
      </div>
      <Separator />
      <div className="flex items-center gap-4 p-6">
        <HeadsetIcon />
        <div className="flex flex-col gap-1">
          <span className="text-xs">Liên hệ ngay để được tư vấn</span>
          <span className="text-sm font-bold">090xxxxxxx - Ms. Linh Linh</span>
        </div>
      </div>
    </aside>
  );
}

export function UserSidebarSkeleton() {
  return (
    <aside className="h-max w-[300px] bg-white shadow-md">
      <div className="flex flex-col gap-6 p-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback>
              <Skeleton className="size-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold">
              <Skeleton className="h-[1lh] w-[20ch]" />
            </span>
            <span className="text-muted-foreground text-sm">
              <Skeleton className="h-[1lh] w-[10ch]" />
            </span>
          </div>
        </div>
        {/* <div className="border-primary/50 bg-primary/10 flex items-center justify-between gap-4 rounded-lg border-2 px-4 py-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-light">Số dư tài khoản</span>
            <span className="w-[10ch] truncate text-base font-bold">0</span>
          </div>
          <Link href="/user/transactions/top-up">
            <Button>
              <BanknoteArrowUp />
              Nạp tiền
            </Button>
          </Link>
        </div> */}
        <UserSidebarNav />
      </div>
      <Separator />
      <div className="flex items-center gap-4 p-6">
        <HeadsetIcon />
        <div className="flex flex-col gap-1">
          <span className="text-xs">Liên hệ ngay để được tư vấn</span>
          <span className="text-sm font-bold">090xxxxxxx - Ms. Linh Linh</span>
        </div>
      </div>
    </aside>
  );
}
