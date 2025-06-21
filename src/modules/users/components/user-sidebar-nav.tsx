'use client';

import { FilePlus2Icon, FolderOpenIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/base/components/ui/button';
import { useConfirmLogoutDialog } from '@/base/providers';

export function UserSidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen } = useConfirmLogoutDialog();

  return (
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
  );
}
