import { FilePlus2Icon, FunnelIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full flex-col bg-white shadow-xl">
      <div className="border-muted-foreground/45 flex items-center justify-between border-b px-8">
        <div className="flex items-center gap-8">
          <Image src="/mai-home-logo.png" alt="Mai Home Logo" width={90} height={90} />
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
        <Button variant={'link'} className="py-7! text-black no-underline!">
          Phòng trọ
        </Button>
        <Button variant={'link'} className="py-7! text-black no-underline!">
          Nhà Nguyên Căn
        </Button>
        <Button variant={'link'} className="py-7! text-black no-underline!">
          Chung Cư Mini
        </Button>
        <Button variant={'link'} className="py-7! text-black no-underline!">
          Ở Ghép
        </Button>
        <Button variant={'link'} className="py-7! text-black no-underline!">
          Các Dịch Vụ Hỗ Trợ
        </Button>
      </div>
    </header>
  );
}
