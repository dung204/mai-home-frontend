'use client';

import {
  BanknoteArrowUp,
  ChevronDown,
  CircleCheckIcon,
  EyeOffIcon,
  FolderOpenIcon,
  HeartIcon,
  LogInIcon,
  LogOutIcon,
  Tag,
  TriangleAlertIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react';
import { useState } from 'react';

import { useAuthDialog } from '@/base/providers';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';

export function UserActions() {
  const [isLoggedIn, _] = useState(false); // mock state for login status
  const { setOpen, setMode, setVersion } = useAuthDialog();

  if (!isLoggedIn) {
    return (
      <>
        <Button
          variant="ghost"
          className="rounded-full px-4! py-6! text-base"
          onClick={() => {
            setVersion((prev) => prev + 1);
            setMode('register');
            setOpen(true);
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
            setOpen(true);
          }}
        >
          <LogInIcon />
          Đăng nhập
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        className="hover:bg-accent/10 rounded-full px-4! py-6! text-base hover:text-white"
      >
        <HeartIcon />
        Tin đã lưu
      </Button>
      <Button
        variant="ghost"
        className="hover:bg-accent/10 rounded-full px-4! py-6! text-base hover:text-white"
      >
        <FolderOpenIcon />
        Quản lý
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-accent/10 rounded-full px-4! py-6! text-base hover:text-white"
          >
            <Avatar>
              <AvatarFallback>
                <Skeleton className="size-full" />
              </AvatarFallback>
            </Avatar>
            user1236
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex flex-col gap-6 p-5"
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback>
                <Skeleton className="size-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">user1236</span>
              <span className="text-muted-foreground text-xs">0123456789</span>
            </div>
          </div>
          <div className="border-primary/50 bg-primary/10 flex items-center justify-between rounded-lg border-2 px-4 py-2">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-light">Số dư tài khoản</span>
              <span className="w-[10ch] truncate text-base font-bold">0</span>
            </div>
            <Button>
              <BanknoteArrowUp />
              Nạp tiền
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm uppercase">Quản lý tin đăng</span>
            <div className="bg-accent flex items-center justify-between gap-6 rounded-lg px-6 py-4">
              <div className="hover:text-primary flex w-max cursor-pointer flex-col items-center justify-center gap-1.5 p-0! transition-colors">
                <FolderOpenIcon className="size-10" />
                Tất cả
              </div>
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
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-max cursor-pointer items-center gap-4 font-medium">
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <Tag />
              </Button>
              Bảng giá dịch vụ
            </div>
            <div className="flex w-max cursor-pointer items-center gap-4 font-medium">
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <BanknoteArrowUp />
              </Button>
              Quản lý giao dịch
            </div>
            <div className="flex w-max cursor-pointer items-center gap-4 font-medium">
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <UserIcon />
              </Button>
              Quản lý tài khoản
            </div>
            <div className="text-danger flex w-max cursor-pointer items-center gap-4 font-medium">
              <Button variant="ghost" className="bg-accent rounded-full" size="icon">
                <LogOutIcon />
              </Button>
              Đăng xuất
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
