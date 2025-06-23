'use client';

import { FilePlus2Icon, FolderOpenIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/base/components/ui/button';
import { SheetClose } from '@/base/components/ui/sheet';
import { useConfirmLogoutDialog } from '@/base/providers';

interface UserSidebarNavProps {
  isMobile?: boolean;
}

export function UserSidebarNav({ isMobile }: UserSidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen } = useConfirmLogoutDialog();

  return (
    <div className="flex flex-col gap-2">
      {isMobile ? (
        <SheetClose className="w-max" asChild>
          <Link href="/user/properties/new">
            <Button
              variant="ghost"
              className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
            >
              <FilePlus2Icon />
              Đăng tin
            </Button>
          </Link>
        </SheetClose>
      ) : (
        <Link href="/user/properties/new">
          <Button
            variant="ghost"
            className="hover:text-primary focus-visible:text-primary w-max p-0! hover:bg-transparent focus-visible:bg-transparent"
          >
            <FilePlus2Icon />
            Đăng tin
          </Button>
        </Link>
      )}
      {isMobile ? (
        <SheetClose className="w-max" asChild>
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
        </SheetClose>
      ) : (
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
      )}
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
      {isMobile ? (
        <SheetClose className="w-max">
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
        </SheetClose>
      ) : (
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
      )}
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
