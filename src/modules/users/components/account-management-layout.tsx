'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Button } from '@/base/components/ui/button';
import { cn } from '@/base/lib';

export function AccountManagementLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <section className="fixed top-[87px] right-0 left-[300px] z-50 flex flex-col gap-4 bg-white px-10 pt-6 shadow-md">
        <h1 className="text-2xl font-medium">Quản lý tài khoản</h1>
        <div className="flex gap-10">
          <Link href="/user/account/profile">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!': pathname === '/user/account/profile',
                },
              )}
            >
              Cập nhật thông tin cá nhân
            </Button>
          </Link>
          <Link href="/user/account/phone">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!': pathname === '/user/account/phone',
                },
              )}
            >
              Đổi số điện thoại
            </Button>
          </Link>
          <Link href="/user/account/password">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!': pathname === '/user/account/password',
                },
              )}
            >
              Đổi mật khẩu
            </Button>
          </Link>
        </div>
      </section>
      <div className="mt-[128px]">{children}</div>
    </>
  );
}
