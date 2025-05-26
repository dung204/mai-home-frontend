'use client';

import { FilePlus2Icon, FunnelIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from '@/base/lib';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="fixed top-0 left-0 z-50 flex w-full flex-col bg-white shadow-md">
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/mai-home-logo.png" alt="Mai Home Logo" width={90} height={90} />
          </Link>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Tìm theo khu vực"
              className="bg-primary/15 text-muted-foreground rounded-full p-6 text-lg focus-visible:ring-0"
            />
            <Button variant="outline" className="rounded-full px-4! py-6!">
              <FunnelIcon />
              Bộ lọc
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="rounded-full px-4! py-6!">
            <UserPlusIcon />
            Đăng ký
          </Button>
          <Button variant="ghost" className="rounded-full px-4! py-6!">
            <LogInIcon />
            Đăng nhập
          </Button>
          <Button className="rounded-full px-4! py-6!">
            <FilePlus2Icon />
            Đăng tin
          </Button>
        </div>
      </div>
      <div className="m-auto flex max-w-6xl items-center gap-12">
        <Button
          variant={'link'}
          className={cn('py-7! text-black no-underline! underline-offset-[22px]', {
            'text-primary underline!':
              pathname === '/properties' || searchParams.get('type') === 'room',
          })}
        >
          Phòng trọ
        </Button>
        <Button
          variant={'link'}
          className={cn('py-7! text-black no-underline! underline-offset-[22px]', {
            'text-primary underline!':
              pathname === '/properties' || searchParams.get('type') === 'house',
          })}
        >
          Nhà Nguyên Căn
        </Button>
        <Button
          variant={'link'}
          className={cn('py-7! text-black no-underline! underline-offset-[22px]', {
            'text-primary underline!':
              pathname === '/properties' || searchParams.get('type') === 'apartment',
          })}
        >
          Chung Cư Mini
        </Button>
        <Button
          variant={'link'}
          className={cn('py-7! text-black no-underline! underline-offset-[22px]', {
            'text-primary underline!':
              pathname === '/properties' || searchParams.get('type') === 'shared',
          })}
        >
          Ở Ghép
        </Button>
        <Link href="/services">
          <Button
            variant={'link'}
            className={cn('border-primary py-7! text-black no-underline! underline-offset-[22px]', {
              'text-primary underline!': pathname === '/services',
            })}
          >
            Các Dịch Vụ Hỗ Trợ
          </Button>
        </Link>
      </div>
    </header>
  );
}
