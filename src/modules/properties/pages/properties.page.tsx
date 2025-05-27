import { ChevronRight } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/base/components/ui/pagination';
import { Skeleton } from '@/base/components/ui/skeleton';
import { cn } from '@/base/lib';

import { HorizontalPropertyCard } from '../components/property-card';

export function PropertiesPage() {
  return (
    <div className="m-auto flex w-6xl flex-col gap-16 pt-[182px]">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-10">
            <Button
              variant={'link'}
              className={cn('py-0! text-base text-black no-underline! underline-offset-8', {
                'text-primary underline!': false,
              })}
            >
              Đề Xuất
            </Button>
            <Button
              variant={'link'}
              className={cn('py-0! text-base text-black no-underline! underline-offset-8', {
                'text-primary underline!': false,
              })}
            >
              Mới Đăng
            </Button>
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <HorizontalPropertyCard key={`property-card-${index}`} />
          ))}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Xem theo giá</h2>
                <div className="grid grid-cols-2">
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Từ 1 - 2 triệu
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Từ 2 - 3 triệu
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Từ 3 - 4 triệu
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Từ 5 - 7 triệu
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Xem theo diện tích</h2>
                <div className="grid grid-cols-2">
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Dưới 20m²
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Từ 20m² - 30m²
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    Từ 30m² - 40m²
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Tin nổi bật</h2>
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div className="flex gap-3.5" key={`highlighted-property-${index}`}>
                      <div className="aspect-square h-20">
                        <Skeleton className="size-full" />
                      </div>
                      <div className="flex w-full flex-col gap-1.5">
                        <Skeleton className="h-[1lh] w-full" />
                        <Skeleton className="h-[1lh] w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex flex-col gap-6">
                <h2 className="text-lg font-semibold">Có thể bạn quan tâm</h2>
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <Button
                      variant="link"
                      className="col-span-1 p-0! text-base"
                      key={`interest-news-${index}`}
                    >
                      <ChevronRight />
                      <span className="truncate">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
