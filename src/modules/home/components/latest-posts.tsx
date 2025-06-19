'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Card, CardHeader } from '@/base/components/ui/card';
import { cn } from '@/base/lib';

const _postCategories = ['news', 'handbook', 'guide'] as const;

export function LatestPosts() {
  const [postCategory, setPostCategory] = useState<(typeof _postCategories)[number]>('news');

  return (
    <section>
      <Card>
        <CardHeader className="flex">
          <Button
            variant="link"
            className={cn('text-muted-foreground text-xl font-bold underline-offset-[20px]', {
              'text-primary underline': postCategory === 'news',
            })}
            onClick={() => setPostCategory('news')}
          >
            Tin tức
          </Button>
          <Button
            variant="link"
            className={cn('text-muted-foreground text-xl font-bold underline-offset-[20px]', {
              'text-primary underline': postCategory === 'handbook',
            })}
            onClick={() => setPostCategory('handbook')}
          >
            Cẩm nang
          </Button>
          <Button
            variant="link"
            className={cn('text-muted-foreground text-xl font-bold underline-offset-[20px]', {
              'text-primary underline': postCategory === 'guide',
            })}
            onClick={() => setPostCategory('guide')}
          >
            Hướng dẫn
          </Button>
        </CardHeader>
        <div className="mt-6 grid h-[572px] w-full grid-cols-2 grid-rows-3 gap-6 px-6">
          <div className="col-span-1 row-span-3 flex flex-col gap-8">
            <div className="relative h-2/3 w-full">
              <Link href="/news/1">
                <Image
                  src="/news-1.png"
                  alt="News 1"
                  fill
                  className="rounded-md object-cover object-center"
                />
              </Link>
            </div>
            <Link href="/news/1">
              <h3 className="text-2xl font-bold">
                “Giải Mã” Giá Phòng Trọ Tại Hòa Lạc Năm 2025: Gần Trường - Tiện Nghi - Hợp Ví Tiền
              </h3>
            </Link>
          </div>
          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <div className="relative col-span-1 h-full">
              <Link href="/news/2">
                <Image
                  src="/news-2.png"
                  alt="News 2"
                  fill
                  className="rounded-md object-cover object-center"
                />
              </Link>
            </div>
            <h3 className="col-span-2 text-xl font-bold">
              <Link href="/news/2">
                Tân Xã - “Thiên Đường Trọ Sinh Viên” Tại Hòa Lạc: Giá Mềm, Gần Trường, Đủ Tiện Nghi
              </Link>
            </h3>
          </div>

          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <div className="relative col-span-1 h-full">
              <Link href="/news/3">
                <Image
                  src="/news-3.png"
                  alt="News 3"
                  fill
                  className="rounded-md border object-cover object-center"
                />
              </Link>
            </div>
            <div className="col-span-2 text-xl font-bold">
              <Link href="/news/3">
                Bí kíp sinh tồn giúp sinh viên Hòa Lạc tìm được căn phòng ưng ý
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
