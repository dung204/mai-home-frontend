'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from '@/base/lib';
import { PropertyCategory } from '@/modules/properties';

import { Button } from '../ui/button';

export function HeaderNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="flex items-center gap-4">
      <Link href="/">
        <Image src="/mai-home-logo.png" alt="Mai Home Logo" width={90} height={90} />
      </Link>
      <Link href="/properties?category=ROOM">
        <Button
          variant="link"
          className={cn('text-base font-medium text-black capitalize', {
            'text-primary font-semibold':
              pathname === '/properties' && searchParams.get('category') === PropertyCategory.ROOM,
          })}
        >
          Phòng trọ
        </Button>
      </Link>
      <Link href="/properties?category=HOUSE">
        <Button
          variant="link"
          className={cn('text-base font-medium text-black capitalize', {
            'text-primary font-semibold':
              pathname === '/properties' && searchParams.get('category') === PropertyCategory.HOUSE,
          })}
        >
          Nhà nguyên căn
        </Button>
      </Link>
      <Link href="/properties?category=APARTMENT">
        <Button
          variant="link"
          className={cn('text-base font-medium text-black capitalize', {
            'text-primary font-semibold':
              pathname === '/properties' &&
              searchParams.get('category') === PropertyCategory.APARTMENT,
          })}
        >
          Chung cư mini
        </Button>
      </Link>
      <Link href="/properties?category=SHARED">
        <Button
          variant="link"
          className={cn('text-base font-medium text-black capitalize', {
            'text-primary font-semibold':
              pathname === '/properties' &&
              searchParams.get('category') === PropertyCategory.SHARED,
          })}
        >
          Ở ghép
        </Button>
      </Link>
      <Link href="/services">
        <Button
          variant="link"
          className={cn('text-base font-medium text-black capitalize', {
            'text-primary font-semibold': pathname === '/services',
          })}
        >
          Bảng giá đăng tin
        </Button>
      </Link>
    </nav>
  );
}
