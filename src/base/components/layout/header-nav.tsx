'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/base/lib';
import { NewPropertyButton, PropertyCategory } from '@/modules/properties';
import { User } from '@/modules/users';

import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';

interface HeaderNavProps {
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
}

export function HeaderNav({ user }: HeaderNavProps) {
  return (
    <>
      <MobileHeaderNav user={user} />
      <DesktopHeaderNav />
    </>
  );
}

export function DehydratedHeaderNav() {
  return (
    <>
      <DehydratedMobileHeaderNav />
      <DehydratedDesktopHeaderNav />
    </>
  );
}

function MobileHeaderNav({ user }: HeaderNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const Icon = menuOpen ? XIcon : MenuIcon;

  return (
    <nav className="flex items-center gap-4 xl:hidden">
      <Link href="/">
        <div className="relative size-20">
          <Image
            src="/mai-home-logo.png"
            alt="Mai Home Logo"
            fill
            className="object-cover object-center"
          />
        </div>
      </Link>
      <Icon onClick={() => setMenuOpen(!menuOpen)} />
      <Sheet modal={false} open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          className="h-[calc(100vh-5rem)] w-full translate-y-20 py-4 data-[state=open]:duration-[350ms] sm:max-w-full [&>button]:hidden"
          side="left"
          onPointerDownOutside={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <Link href="/properties?category=ROOM">
              <Button
                variant="link"
                className={cn('text-base font-medium text-black capitalize', {
                  'text-primary font-semibold':
                    pathname === '/properties' &&
                    searchParams.get('category') === PropertyCategory.ROOM,
                })}
                onClick={() => setMenuOpen(false)}
              >
                Phòng trọ
              </Button>
            </Link>
            <Link href="/properties?category=HOUSE">
              <Button
                variant="link"
                className={cn('text-base font-medium text-black capitalize', {
                  'text-primary font-semibold':
                    pathname === '/properties' &&
                    searchParams.get('category') === PropertyCategory.HOUSE,
                })}
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
              >
                Bảng giá đăng tin
              </Button>
            </Link>
            <div className="px-4 sm:hidden">
              <NewPropertyButton user={user} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

function DesktopHeaderNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="flex items-center gap-2 max-xl:hidden">
      <Link href="/">
        <div className="relative size-20">
          <Image
            src="/mai-home-logo.png"
            alt="Mai Home Logo"
            fill
            className="object-cover object-center"
          />
        </div>
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

function DehydratedMobileHeaderNav() {
  return (
    <nav className="flex items-center gap-2 xl:hidden">
      <Link href="/">
        <div className="relative size-20">
          <Image
            src="/mai-home-logo.png"
            alt="Mai Home Logo"
            fill
            className="object-cover object-center"
          />
        </div>
      </Link>
      <MenuIcon />
    </nav>
  );
}

function DehydratedDesktopHeaderNav() {
  return (
    <nav className="flex items-center gap-4 max-xl:hidden">
      <Link href="/">
        <Image src="/mai-home-logo.png" alt="Mai Home Logo" width={90} height={90} />
      </Link>
      <Link href="/properties?category=ROOM">
        <Button variant="link" className="text-base font-medium text-black capitalize">
          Phòng trọ
        </Button>
      </Link>
      <Link href="/properties?category=HOUSE">
        <Button variant="link" className="text-base font-medium text-black capitalize">
          Nhà nguyên căn
        </Button>
      </Link>
      <Link href="/properties?category=APARTMENT">
        <Button variant="link" className="text-base font-medium text-black capitalize">
          Chung cư mini
        </Button>
      </Link>
      <Link href="/properties?category=SHARED">
        <Button variant="link" className="text-base font-medium text-black capitalize">
          Ở ghép
        </Button>
      </Link>
      <Link href="/services">
        <Button variant="link" className="text-base font-medium text-black capitalize">
          Bảng giá đăng tin
        </Button>
      </Link>
    </nav>
  );
}
