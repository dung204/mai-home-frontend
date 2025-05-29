'use client';

import {
  BadgeDollarSignIcon,
  BanknoteArrowUp,
  FilePlus2Icon,
  FolderOpenIcon,
  HeadsetIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import { Button } from '@/base/components/ui/button';
import { Separator } from '@/base/components/ui/separator';
import { Skeleton } from '@/base/components/ui/skeleton';
import { cn } from '@/base/lib';

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed top-[87px] left-0 h-max w-[300px] bg-white shadow-md">
      <div className="flex flex-col gap-6 p-5">
        <div className="flex items-center gap-6">
          <Avatar className="size-14">
            <AvatarFallback>
              <Skeleton className="size-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold">user1236</span>
            <span className="text-muted-foreground text-sm">0123456789</span>
          </div>
        </div>
        <div className="border-primary/50 bg-primary/10 flex items-center justify-between gap-4 rounded-lg border-2 px-4 py-2">
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
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
          >
            <FilePlus2Icon />
            Đăng tin
          </Button>
          <Button
            variant="ghost"
            className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
          >
            <FolderOpenIcon />
            Danh sách tin đăng
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent',
              {
                'text-primary': pathname.startsWith('/user/transactions'),
              },
            )}
            onClick={(e) => {
              if (!pathname.startsWith('/user/transactions')) {
                e.preventDefault();
                router.push('/user/transactions');
              }
            }}
          >
            <BadgeDollarSignIcon />
            Quản lý giao dịch
          </Button>
          <Button
            variant="ghost"
            className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
          >
            <UserIcon />
            Quản lý tài khoản
          </Button>
          <Button
            variant="ghost"
            className="hover:text-danger/70 focus-visible:text-danger/70 text-danger w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
          >
            <LogOutIcon />
            Đăng xuất
          </Button>
        </div>
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
