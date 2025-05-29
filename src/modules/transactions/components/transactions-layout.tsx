'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Button } from '@/base/components/ui/button';
import { cn } from '@/base/lib';

export function TransactionsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <section className="fixed top-[87px] right-0 left-[300px] z-50 flex flex-col gap-4 bg-white px-10 pt-6 shadow-md">
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
      <div className="mt-[128px]">{children}</div>
    </>
  );
}
