'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Footer } from '@/base/components/layout/footer';
import { Button } from '@/base/components/ui/button';
import { ScrollArea } from '@/base/components/ui/scroll-area';
import { ScrollToTopButton } from '@/base/components/ui/scroll-to-top-button';
import { cn } from '@/base/lib';

export function TransactionsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <section className="z-50 flex flex-col gap-4 bg-white px-10 pt-6 shadow-md">
        <h1 className="text-2xl font-medium">Quản lý giao dịch</h1>
        <div className="flex gap-10">
          <Link href="/user/transactions/top-up">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!': pathname === '/user/transactions/top-up',
                },
              )}
            >
              Nạp tiền vào tài khoản
            </Button>
          </Link>
          <Link href="/user/transactions/top-up-history">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!': pathname === '/user/transactions/top-up-history',
                },
              )}
            >
              Lịch sử nạp tiền
            </Button>
          </Link>
          <Link href="/user/transactions/purchase-history">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!': pathname === '/user/transactions/purchase-history',
                },
              )}
            >
              Lịch sử thanh toán
            </Button>
          </Link>
        </div>
      </section>
      <ScrollArea className="app-scroll-area grow">
        <section className="absolute inset-0">
          <div className="mx-auto my-10 flex w-3xl flex-col gap-8">{children}</div>
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
