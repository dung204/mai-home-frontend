'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Footer } from '@/base/components/layout/footer';
import { Button } from '@/base/components/ui/button';
import { ScrollArea } from '@/base/components/ui/scroll-area';
import { ScrollToTopButton } from '@/base/components/ui/scroll-to-top-button';
import { cn } from '@/base/lib';

export function AccountManagementLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <section className="z-50 flex flex-col gap-4 bg-white px-10 pt-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="size-6 xl:hidden"></div>
          <h1 className="text-2xl font-medium">Quản lý tài khoản</h1>
        </div>
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
      <ScrollArea className="app-scroll-area grow">
        <section className="absolute inset-0">
          <div className="mx-auto my-10 flex flex-col gap-8">{children}</div>
          <div className="w-full px-10">
            <div className="border-muted-foreground size-full border-t">
              <Footer />
            </div>
          </div>
        </section>
        <ScrollToTopButton />
      </ScrollArea>
    </>
  );
}
