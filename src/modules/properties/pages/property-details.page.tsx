import { DotIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/base/components/ui/breadcrumb';
import { Card, CardContent } from '@/base/components/ui/card';
import { Separator } from '@/base/components/ui/separator';
import { Skeleton } from '@/base/components/ui/skeleton';

import { HighlightedNews } from '../components/highlighted-news';
import { HighlightedProperties } from '../components/highlighted-properties';
import { HorizontalPropertyCard } from '../components/property-card';

type PropertyDetailsPageProps = {
  id: string;
};

export function PropertyDetailsPage({}: PropertyDetailsPageProps) {
  return (
    <div className="m-auto flex w-6xl flex-col gap-16 pt-[182px]">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Skeleton className="h-[1lh] w-[15ch]" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Skeleton className="h-[1lh] w-[10ch]" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Skeleton className="h-[1lh] w-[10ch]" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="grow">
                <Skeleton className="h-[1lh] w-full" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <section>
            <Card className="overflow-hidden pt-0">
              <div className="h-[310px] w-full">
                <Skeleton className="size-full rounded-none" />
              </div>
              <CardContent>
                <div className="flex justify-center gap-3">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div className="aspect-square h-16" key={`property-image-${index}`}>
                      <Skeleton className="size-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card>
              <CardContent className="flex flex-col gap-10">
                <h1 className="flex flex-col gap-1.5 text-xl font-medium">
                  <Skeleton className="h-[1lh] w-full" />
                  <Skeleton className="h-[1lh] w-1/3" />
                </h1>
                <div className="text-xl font-medium">
                  <Skeleton className="h-[1lh] w-1/3" />
                </div>
                <div className="grid grid-cols-5 gap-6">
                  <div className="col-span-1">Diện tích:</div>
                  <div className="col-span-4">
                    <Skeleton className="h-[1lh] w-[5ch]" />
                  </div>
                  <div className="col-span-1">Tỉnh thành:</div>
                  <div className="col-span-4">
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </div>
                  <div className="col-span-1">Quận huyện:</div>
                  <div className="col-span-4">
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </div>
                  <div className="col-span-1">Địa chỉ:</div>
                  <div className="col-span-4">
                    <Skeleton className="h-[1lh] w-full" />
                  </div>
                  <div className="col-span-1">Ngày đăng:</div>
                  <div className="col-span-4">
                    <Skeleton className="h-[1lh] w-1/3" />
                  </div>
                  <div className="col-span-1">Ngày hết hạn:</div>
                  <div className="col-span-4">
                    <Skeleton className="h-[1lh] w-1/3" />
                  </div>
                </div>
                <Separator />
                <h2 className="text-base font-bold">Thông tin mô tả</h2>
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-[1lh] w-full" />
                  <Skeleton className="h-[1lh] w-full" />
                  <Skeleton className="h-[1lh] w-2/3" />
                  <Skeleton className="h-[1lh] w-full" />
                  <Skeleton className="h-[1lh] w-1/3" />
                  <Skeleton className="h-[1lh] w-full" />
                  <Skeleton className="h-[1lh] w-2/3" />
                  <Skeleton className="h-[1lh] w-full" />
                  <Skeleton className="h-[1lh] w-3/4" />
                </div>
                <Separator />
                <h2 className="text-base font-bold">Vị trí bản đồ</h2>
                <div className="h-[300px] w-full">
                  <Skeleton className="size-full" />
                </div>
                <Separator />
                <h2 className="text-base font-bold">Thông tin liên hệ</h2>
                <div className="flex items-center gap-10">
                  <Avatar className="size-24">
                    <AvatarFallback>
                      <Skeleton className="size-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-3">
                    <div className="text-xl font-medium">
                      <Skeleton className="h-[1lh] w-[15ch]" />
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span>
                        <Skeleton className="h-[1lh] w-[10ch]" />
                      </span>
                      <DotIcon className="text-muted-foreground" />
                      <span>
                        <Skeleton className="h-[1lh] w-[25ch]" />
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-[20ch]" />
                      <Skeleton className="h-10 w-[15ch]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section className="flex flex-col gap-6">
            <h2 className="mt-10 text-lg font-semibold">Có thể bạn quan tâm</h2>
            <HorizontalPropertyCard />
            <HorizontalPropertyCard />
          </section>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <section>
            <Card>
              <CardContent className="flex flex-col items-center gap-6">
                <Avatar className="size-24">
                  <AvatarFallback>
                    <Skeleton className="size-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-base font-medium">
                  <Skeleton className="h-[1lh] w-[15ch]" />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span>
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </span>
                  <DotIcon className="text-muted-foreground" />
                  <span>
                    <Skeleton className="h-[1lh] w-[25ch]" />
                  </span>
                </div>
                <div className="flex w-full flex-col items-center gap-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </section>
          <HighlightedProperties />
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}
