'use client';

import { FilePlus2Icon, FolderOpenIcon, HeadsetIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarImage } from '@/base/components/ui/avatar';
import { Button } from '@/base/components/ui/button';
import { Separator } from '@/base/components/ui/separator';
import { useConfirmLogoutDialog } from '@/base/providers';

import { useUser } from '../hooks/use-user.hook';

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen } = useConfirmLogoutDialog();
  const { data } = useUser();
  const user = data?.data;

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
        <div className="flex flex-col gap-2">
          <Link href="/user/properties/new">
            <Button
              variant="ghost"
              className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
            >
              <FilePlus2Icon />
              Đăng tin
            </Button>
          </Link>
          <Link href="/user/properties">
            <Button
              variant="ghost"
              className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
              onClick={(e) => {
                if (!pathname.startsWith('/user/properties')) {
                  e.preventDefault();
                  router.push('/user/properties');
                }
              }}
            >
              <FolderOpenIcon />
              Danh sách tin đăng
            </Button>
          </Link>
          {/* <Button
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
          </Button> */}
          <Button
            variant="ghost"
            className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
            onClick={(e) => {
              if (!pathname.startsWith('/user/account')) {
                e.preventDefault();
                router.push('/user/account/profile');
              }
            }}
          >
            <UserIcon />
            Quản lý tài khoản
          </Button>
          <Button
            variant="ghost"
            className="hover:text-danger/70 focus-visible:text-danger/70 text-danger w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
            onClick={() => setOpen(true)}
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
