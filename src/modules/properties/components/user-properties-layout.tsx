'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Footer } from '@/base/components/layout/footer';
import { Button } from '@/base/components/ui/button';
import { ScrollArea } from '@/base/components/ui/scroll-area';
import { ScrollToTopButton } from '@/base/components/ui/scroll-to-top-button';
import { cn } from '@/base/lib';

export function UserPropertiesLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname === '/user/properties/new') {
    return (
      <>
        <section className="z-50 flex flex-col gap-4 bg-white px-10 py-6 shadow-md">
          <h1 className="text-2xl font-medium">Đăng tin cho thuê</h1>
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

  if (pathname.startsWith('/user/properties') && pathname.endsWith('/edit')) {
    return (
      <>
        <section className="z-50 flex flex-col gap-4 bg-white px-10 py-6 shadow-md">
          <h1 className="text-2xl font-medium">Chỉnh sửa bài đăng</h1>
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

  return (
    <>
      <section className="z-50 flex flex-col gap-4 bg-white px-10 pt-6 shadow-md">
        <h1 className="text-2xl font-medium">Danh sách tin đăng</h1>
        <div className="flex gap-10">
          <Link href="/user/properties">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!':
                    pathname === '/user/properties' && searchParams.get('filter') === null,
                },
              )}
            >
              Đang hoạt động
            </Button>
          </Link>
          {/* <Link href="/user/properties?filter=active">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!':
                    pathname === '/user/properties' && searchParams.get('filter') === 'active',
                },
              )}
            >
              Đang hiển thị
            </Button>
          </Link> */}
          {/* <Link href="/user/properties?filter=expired">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!':
                    pathname === '/user/properties' && searchParams.get('filter') === 'expired',
                },
              )}
            >
              Hết hạn
            </Button>
          </Link> */}
          <Link href="/user/properties?filter=deleted">
            <Button
              variant="link"
              className={cn(
                'text-muted-foreground px-0! py-7! text-base no-underline! underline-offset-[22px] transition-none',
                {
                  'text-primary underline!':
                    pathname === '/user/properties' && searchParams.get('filter') === 'deleted',
                },
              )}
            >
              Đã xóa
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
