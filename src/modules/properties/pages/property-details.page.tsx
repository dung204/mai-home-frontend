'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PenIcon, PhoneIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/base/components/ui/breadcrumb';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Separator } from '@/base/components/ui/separator';
import { Skeleton } from '@/base/components/ui/skeleton';
import { StringUtils } from '@/base/utils';
import { User, UserAvatar } from '@/modules/users';

import { HighlightedNews } from '../components/highlighted-news';
import {
  HighlightedProperties,
  HighlightedPropertiesSkeleton,
} from '../components/highlighted-properties';
import { PropertyImageCarousel } from '../components/property-image-carousel';
import {
  RecommendedProperties,
  RecommendedPropertiesSkeleton,
} from '../components/recommended-properties';
import { propertiesService } from '../services/properties.service';
import { PropertyCategory, propertyCategories } from '../types';
import { PropertiesUtils } from '../utils/properties.utils';

type PropertyDetailsPageProps = {
  id: string;
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
};

const FixedMap = dynamic(() => import('@/base/components/ui/fixed-map'), {
  ssr: false,
});

export function PropertyDetailsPage({ id, user }: PropertyDetailsPageProps) {
  const {
    data: { data: property },
  } = useSuspenseQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesService.getPropertyById(id),
  });

  return (
    <div className="container m-auto mt-12 flex flex-col gap-16 xl:max-w-6xl!">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="text-nowrap">
                {propertyCategories[property.category ?? PropertyCategory.ROOM]}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-nowrap">{property.city.name}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-nowrap">{property.district.name}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="line-clamp-1">{property.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <section>
            <Card className="overflow-hidden pt-0">
              <PropertyImageCarousel
                property={property}
                classNames={{
                  item: 'h-[300px]',
                }}
                opts={{
                  loop: true,
                }}
              />
            </Card>
          </section>
          <section>
            <Card>
              <CardContent className="flex flex-col gap-10">
                <div className="space-y-4">
                  {user && (
                    <div className="flex items-center justify-end">
                      {property.owner.id === user.id && (
                        <Link href={`/user/properties/${property.id}/edit`}>
                          <Button variant="success">
                            <PenIcon />
                            Sửa bài đăng
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                  <h1 className="text-xl font-medium">{property.title}</h1>
                </div>
                <div className="text-xl font-medium">
                  {PropertiesUtils.getPricePerMonth(property)}
                </div>
                <div className="xs:gap-x-6 xs:grid-cols-5 grid grid-cols-2 gap-y-6">
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Diện tích:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    {PropertiesUtils.getArea(property)}
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Tỉnh/Thành phố:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">{property.city.name}</div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Quận/Huyện:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    {property.district.name}
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Phường/Xã:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">{property.ward.name}</div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Địa chỉ:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">{property.address}</div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Ngày đăng:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    {StringUtils.formatDate(property.createTimestamp)}
                  </div>
                </div>
                <Separator />
                <h2 className="text-base font-bold">Thông tin mô tả</h2>
                {property.description}
                <Separator />
                <h2 className="text-base font-bold">Vị trí bản đồ</h2>
                <FixedMap
                  position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                />
                <Separator />
                <h2 className="text-base font-bold">Thông tin liên hệ</h2>
                <div className="max-xs:flex-col flex items-center gap-x-10 gap-y-3">
                  <UserAvatar user={property.owner} className="size-24" />
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="max-xs:text-center text-xl font-medium">
                        {property.owner.displayName}
                      </div>
                      <div className="max-xs:justify-center flex items-center gap-1 text-xs">
                        Tham gia từ ngày{' '}
                        {StringUtils.formatDate(property.owner.createTimestamp ?? '')}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`tel:${property.owner.phone}`} target="_blank">
                        <Button variant="success">
                          <PhoneIcon />
                          {property.owner.phone}
                        </Button>
                      </Link>
                      <Link href={`https://zalo.me/${property.owner.phone}`} target="_blank">
                        <Button className="bg-[#0d6efd] hover:bg-[#0d6efd]/90">
                          <PhoneIcon />
                          Liên hệ Zalo
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <Suspense fallback={<RecommendedPropertiesSkeleton />}>
            <RecommendedProperties />
          </Suspense>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <section className="max-lg:hidden">
            <Card>
              <CardContent className="flex flex-col items-center gap-6">
                <UserAvatar user={property.owner} className="size-24" />
                <div className="flex flex-col items-center gap-3">
                  <div className="text-base font-medium">{property.owner.displayName}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span>
                      Tham gia từ ngày{' '}
                      {StringUtils.formatDate(property.owner.createTimestamp ?? '')}
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center gap-3">
                  <Link href={`tel:${property.owner.phone}`} target="_blank">
                    <Button variant="success">
                      <PhoneIcon />
                      {property.owner.phone}
                    </Button>
                  </Link>
                  <Link href={`https://zalo.me/${property.owner.phone}`} target="_blank">
                    <Button className="bg-[#0d6efd]">
                      <PhoneIcon />
                      Liên hệ Zalo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
          <Suspense fallback={<HighlightedPropertiesSkeleton />}>
            <HighlightedProperties />
          </Suspense>
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}

export function PropertyDetailsNotFound() {
  return (
    <div className="container m-auto mt-12 flex flex-col gap-16 xl:max-w-6xl!">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="space-y-20">
            <div className="flex flex-col items-center gap-4">
              <Image src="/result-not-found.png" alt="not found" width={300} height={300} />
              <p className="w-2/3 text-center">Bài đăng không tồn tại hoặc đã bị xóa, hết hạn.</p>
            </div>
            <Suspense fallback={<RecommendedPropertiesSkeleton />}>
              <RecommendedProperties />
            </Suspense>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <Suspense fallback={<HighlightedPropertiesSkeleton />}>
            <HighlightedProperties />
          </Suspense>
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}

export function PropertyDetailsPageSkeleton() {
  return (
    <div className="container m-auto mt-12 flex flex-col gap-16 xl:max-w-6xl!">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="basis-1/8 text-nowrap">
                <Skeleton className="h-[1lh] w-full" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="basis-1/8 text-nowrap">
                <Skeleton className="h-[1lh] w-full" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="basis-1/8 text-nowrap">
                <Skeleton className="h-[1lh] w-full" />
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
                <div className="flex flex-wrap justify-center gap-3">
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
                <div className="xs:gap-x-6 xs:grid-cols-5 grid grid-cols-2 gap-y-6">
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Diện tích:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    <Skeleton className="h-[1lh] w-[5ch]" />
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Tỉnh/Thành phố:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Quận/Huyện:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Phường/Xã:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Địa chỉ:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
                    <Skeleton className="h-[1lh] w-full" />
                  </div>
                  <div className="xs:col-span-2 col-span-1 sm:col-span-1">Ngày đăng:</div>
                  <div className="xs:col-span-3 col-span-1 sm:col-span-4">
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
                <div className="max-xs:flex-col flex items-center gap-x-10 gap-y-3">
                  <Avatar className="size-24">
                    <AvatarFallback>
                      <Skeleton className="size-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="max-xs:justify-center flex text-xl font-medium">
                        <Skeleton className="h-[1lh] w-[15ch]" />
                      </div>
                      <div className="max-xs:justify-center flex items-center gap-1 text-xs">
                        <Skeleton className="h-[1lh] w-[25ch]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-[15ch]" />
                      <Skeleton className="h-10 w-[15ch]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <Suspense fallback={<RecommendedPropertiesSkeleton />}>
            <RecommendedProperties />
          </Suspense>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <section className="max-lg:hidden">
            <Card>
              <CardContent className="flex flex-col items-center gap-6">
                <Avatar className="size-24">
                  <AvatarFallback>
                    <Skeleton className="size-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-base font-medium">
                    <Skeleton className="h-[1lh] w-[15ch]" />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span>
                      <Skeleton className="h-[1lh] w-[25ch]" />
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center gap-3">
                  <Skeleton className="h-10 w-[20ch]" />
                  <Skeleton className="h-10 w-[15ch]" />
                </div>
              </CardContent>
            </Card>
          </section>
          <Suspense fallback={<HighlightedPropertiesSkeleton />}>
            <HighlightedProperties />
          </Suspense>
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}
