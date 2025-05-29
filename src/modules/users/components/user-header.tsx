'use client';

import {
  BanknoteArrowUp,
  ChevronDown,
  CircleCheckIcon,
  EyeOffIcon,
  FilePlus2Icon,
  FolderOpenIcon,
  HeartIcon,
  LogOutIcon,
  Tag,
  TriangleAlertIcon,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import { Button } from '@/base/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/base/components/ui/dropdown-menu';
import { Skeleton } from '@/base/components/ui/skeleton';

export function UserHeader() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full flex-col bg-[#0E4DB3] text-white shadow-md">
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/mai-home-logo-white.png" alt="Mai Home Logo" width={90} height={90} />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/properties?type=room">
              <Button variant="link" className="text-base font-normal text-white capitalize">
                Phòng trọ
              </Button>
            </Link>
            <Link href="/properties?type=house">
              <Button variant="link" className="text-base font-normal text-white capitalize">
                Nhà nguyên căn
              </Button>
            </Link>
            <Link href="/properties?type=apartment">
              <Button variant="link" className="text-base font-normal text-white capitalize">
                Chung cư mini
              </Button>
            </Link>
            <Link href="/properties?type=shared">
              <Button variant="link" className="text-base font-normal text-white capitalize">
                Ở ghép
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="link" className="text-base font-normal text-white capitalize">
                Các dịch vụ hỗ trợ
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <Button className="rounded-full px-4! py-6! text-base">
            <FilePlus2Icon />
            Đăng tin
          </Button>
        </div>
      </div>
    </header>
  );
}
