import Image from 'next/image';
import Link from 'next/link';

import { UserActions, UserActionsSkeleton } from '@/base/components/layout/user-actions';
import { Button } from '@/base/components/ui/button';

import { userSchema } from '../types';

export async function UserHeader() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return (
    <header className="z-50 flex w-full flex-col bg-[#0E4DB3] text-white shadow-md">
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
                Bảng giá đăng tin
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserActions user={user} />
        </div>
      </div>
    </header>
  );
}

export function DehydratedUserHeader() {
  return (
    <header className="z-50 flex w-full flex-col bg-[#0E4DB3] text-white shadow-md">
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
                Bảng giá đăng tin
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserActionsSkeleton />
        </div>
      </div>
    </header>
  );
}
