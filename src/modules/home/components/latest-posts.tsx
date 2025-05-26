'use client';

import { useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Card, CardHeader } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
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
            <Skeleton className="h-2/3 w-full" />
            <div className="flex flex-col gap-1.5 text-xl">
              <Skeleton className="h-[1lh] w-full" />
              <Skeleton className="h-[1lh] w-2/3" />
            </div>
          </div>
          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <Skeleton className="col-span-1 h-full" />
            <div className="col-span-2 flex flex-col gap-1.5 text-xl">
              <Skeleton className="h-[1lh] w-full" />
              <Skeleton className="h-[1lh] w-2/3" />
            </div>
          </div>
          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <Skeleton className="col-span-1 h-full" />
            <div className="col-span-2 flex flex-col gap-1.5 text-xl">
              <Skeleton className="h-[1lh] w-full" />
              <Skeleton className="h-[1lh] w-2/3" />
            </div>
          </div>
          <div className="col-span-1 row-span-1 grid grid-cols-3 gap-6">
            <Skeleton className="col-span-1 h-full" />
            <div className="col-span-2 flex flex-col gap-1.5 text-xl">
              <Skeleton className="h-[1lh] w-full" />
              <Skeleton className="h-[1lh] w-2/3" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
