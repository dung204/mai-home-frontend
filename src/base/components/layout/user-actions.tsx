'use client';

import {
  ChevronDown,
  FilePlus2Icon,
  FolderOpenIcon,
  HeartIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react';
import Link from 'next/link';

import { useAuthDialog, useConfirmLogoutDialog } from '@/base/providers';
import { User, UserAvatar } from '@/modules/users';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';

interface UserActionsProps {
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
}

export function UserActions({ user }: UserActionsProps) {
  const { setOpen: setAuthDialogOpen, setMode, setVersion } = useAuthDialog();
  const { setOpen: setConfirmLogoutDialogOpen } = useConfirmLogoutDialog();

  if (!user) {
    return (
      <>
        <Button
          variant="ghost"
          className="rounded-full px-4! py-6! text-base max-sm:hidden"
          onClick={() => {
            setVersion((prev) => prev + 1);
            setMode('register');
            setAuthDialogOpen(true);
          }}
        >
          <UserPlusIcon />
          Đăng ký
        </Button>
        <Button
          variant="ghost"
          className="rounded-full px-4! py-6! text-base"
          onClick={() => {
            setVersion((prev) => prev + 1);
            setMode('login');
            setAuthDialogOpen(true);
          }}
        >
          <LogInIcon />
          Đăng nhập
        </Button>
        <Button
          className="rounded-full px-4! py-6! text-base max-sm:hidden"
          onClick={() => {
            setVersion((prev) => prev + 1);
            setMode('login');
            setAuthDialogOpen(true);
          }}
        >
          <FilePlus2Icon />
          Đăng tin
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" className="hover:bg-accent rounded-full px-4! py-6! text-base">
        <HeartIcon />
        <span className="max-xl:hidden">Tin đã lưu</span>
      </Button>
      <Link href="/user/properties">
        <Button variant="ghost" className="hover:bg-accent rounded-full px-4! py-6! text-base">
          <FolderOpenIcon />
          <span className="max-xl:hidden">Quản lý</span>
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-accent rounded-full px-4! py-6! text-base">
            <UserAvatar user={user} />
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex flex-col gap-6 p-5"
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-3">
            <UserAvatar user={user} className="size-10" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{user.displayName}</span>
              <span className="text-muted-foreground text-xs">{user.phone}</span>
            </div>
          </div>
          {/* <div className="border-primary/50 bg-primary/10 flex items-center justify-between rounded-lg border-2 px-4 py-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-light">Số dư tài khoản</span>
              <span className="w-[10ch] truncate text-base font-bold">0</span>
            </div>
            <Button>
              <BanknoteArrowUp />
              Nạp tiền
            </Button>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm uppercase">Quản lý tin đăng</span>
            <div className="bg-accent flex items-center justify-between gap-6 rounded-lg px-6 py-4">
              <Link href="/user/properties">
                <div className="hover:text-primary flex w-max cursor-pointer flex-col items-center justify-center gap-1.5 p-0! transition-colors">
                  <FolderOpenIcon className="size-10" />
                  Tất cả
                </div>
              </Link>
              <div className="hover:text-primary flex w-max cursor-pointer flex-col items-center justify-center gap-1.5 p-0! transition-colors">
                <CircleCheckIcon className="size-10" />
                Đang hiển thị
              </div>
              <div className="hover:text-primary flex w-max cursor-pointer flex-col items-center justify-center gap-1.5 p-0! transition-colors">
                <TriangleAlertIcon className="size-10" />
                Hết hạn
              </div>
              <div className="hover:text-primary flex w-max cursor-pointer flex-col items-center justify-center gap-1.5 p-0! transition-colors">
                <EyeOffIcon className="size-10" />
                Bị ẩn
              </div>
            </div>
          </div> */}
          <div className="flex flex-col gap-2">
            <Link href="/user/properties">
              <div className="flex w-max cursor-pointer items-center gap-4 font-medium">
                <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                  <FolderOpenIcon />
                </Button>
                Quản lý tin đăng
              </div>
            </Link>
            {/* <div className="flex w-max cursor-pointer items-center gap-4 font-medium">
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <BanknoteArrowUp />
              </Button>
              Quản lý giao dịch
            </div> */}
            <div className="flex w-max cursor-pointer items-center gap-4 font-medium">
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <UserIcon />
              </Button>
              Quản lý tài khoản
            </div>
            <div
              className="text-danger flex w-max cursor-pointer items-center gap-4 font-medium"
              onClick={() => setConfirmLogoutDialogOpen(true)}
            >
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <LogOutIcon />
              </Button>
              Đăng xuất
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/user/properties/new">
        <Button className="rounded-full px-4! py-6! text-base max-sm:hidden">
          <FilePlus2Icon />
          Đăng tin
        </Button>
      </Link>
    </>
  );
}

export function UserActionsSkeleton() {
  return (
    <>
      <Button variant="ghost" className="rounded-full px-4! py-6! text-base">
        <Avatar className="size-8">
          <AvatarFallback>
            <Skeleton className="size-full" />
          </AvatarFallback>
        </Avatar>
        <span className="h-[1lh] w-[10ch]">
          <Skeleton className="size-full" />
        </span>
      </Button>
      <Button className="rounded-full px-4! py-6! text-base max-sm:hidden">
        <FilePlus2Icon />
        Đăng tin
      </Button>
    </>
  );
}
