'use client';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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
import { ComponentProps, useState } from 'react';

import { useAuthDialog } from '@/base/providers';
import { useUser } from '@/modules/users';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button, buttonVariantsFn } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';

export function UserActions() {
  const { data, error, isLoading } = useUser();
  const { setOpen, setMode, setVersion } = useAuthDialog();
  const queryClient = useQueryClient();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  if (isLoading) {
    return <UserActionsSkeleton />;
  }

  if (error || !data || !data.data) {
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
        <Button
          className="rounded-full px-4! py-6! text-base"
          onClick={() => {
            setVersion((prev) => prev + 1);
            setMode('login');
            setOpen(true);
          }}
        >
          <FilePlus2Icon />
          Đăng tin
        </Button>
      </>
    );
  }

  const user = data.data;

  const handleLogout = async () => {
    await axios.delete('/api/auth/delete-cookie');
    await queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
  };

  return (
    <>
      <Button variant="ghost" className="hover:bg-accent rounded-full px-4! py-6! text-base">
        <HeartIcon />
        Tin đã lưu
      </Button>
      <Link href="/user/properties">
        <Button variant="ghost" className="hover:bg-accent rounded-full px-4! py-6! text-base">
          <FolderOpenIcon />
          Quản lý
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:bg-accent rounded-full px-4! py-6! text-base">
            <Avatar>
              <AvatarImage src="/default-user-avatar.png" />
            </Avatar>
            {user.displayName}
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
              <AvatarImage src="/default-user-avatar.png" />
            </Avatar>
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
              onClick={() => setLogoutConfirmOpen(true)}
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
        <Button className="rounded-full px-4! py-6! text-base">
          <FilePlus2Icon />
          Đăng tin
        </Button>
      </Link>
      <LogoutConfirmDialog
        open={logoutConfirmOpen}
        onOpenChange={setLogoutConfirmOpen}
        onConfirm={handleLogout}
      />
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
    </>
  );
}

interface LogoutConfirmDialogProps extends ComponentProps<typeof AlertDialog> {
  onConfirm: () => void;
}

function LogoutConfirmDialog(props: LogoutConfirmDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất không?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Không</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariantsFn({ variant: 'danger' })}
            onClick={() => props.onConfirm()}
          >
            Có
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
