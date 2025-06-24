import { HeadsetIcon, PanelRightOpenIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import { Separator } from '@/base/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/base/components/ui/sheet';
import { Skeleton } from '@/base/components/ui/skeleton';

import { userSchema } from '../types';
import { UserAvatar } from './user-avatar';
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
    <>
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger className="absolute top-7 left-10 z-[100] h-max xl:pointer-events-none xl:hidden">
          <PanelRightOpenIcon className="size-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="z-[120] h-[calc(100vh-5rem)] w-[300px] translate-y-20 sm:max-w-[300px]"
          overlayClassName="h-[calc(100vh-5rem)] translate-y-20"
        >
          <aside className="h-max w-[300px] bg-white">
            <div className="flex flex-col gap-6 p-5">
              <div className="flex items-center gap-4">
                <UserAvatar user={user} className="size-14" />
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold">{user?.displayName}</span>
                  <span className="text-muted-foreground text-sm">{user?.phone}</span>
                </div>
              </div>
              <UserSidebarNav isMobile />
            </div>
            <Separator />
            <div className="flex items-center gap-4 p-6">
              <HeadsetIcon />
              <div className="flex flex-col gap-1">
                <span className="text-xs">Liên hệ ngay để được tư vấn</span>
                <span className="text-sm font-bold">
                  <Link href="tel:0375028703" className="text-blue-500 underline">
                    037 502 8703
                  </Link>{' '}
                  - Ms. Linh Linh
                </span>
              </div>
            </div>
          </aside>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="h-max w-[300px] bg-white shadow-md max-xl:hidden">
        <div className="flex flex-col gap-6 p-5">
          <div className="flex items-center gap-4">
            <UserAvatar user={user} className="size-14" />
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">{user?.displayName}</span>
              <span className="text-muted-foreground text-sm">{user?.phone}</span>
            </div>
          </div>
          <UserSidebarNav />
        </div>
        <Separator />
        <div className="flex items-center gap-4 p-6">
          <HeadsetIcon />
          <div className="flex flex-col gap-1">
            <span className="text-xs">Liên hệ ngay để được tư vấn</span>
            <span className="text-sm font-bold">
              <Link href="tel:0375028703" className="text-blue-500 underline">
                037 502 8703
              </Link>{' '}
              - Ms. Linh Linh
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}

export function UserSidebarSkeleton() {
  return (
    <>
      <PanelRightOpenIcon className="absolute top-7 left-10 z-[100] size-6 h-max xl:pointer-events-none xl:hidden" />
      <aside className="h-max w-[300px] bg-white shadow-md max-xl:hidden">
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
            <span className="text-sm font-bold">
              <Link href="tel:0375028703" className="text-blue-500 underline">
                037 502 8703
              </Link>{' '}
              - Ms. Linh Linh
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
