'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight, FilterIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { Pagination, PaginationSkeleton } from '@/base/components/layout/pagination';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { cn } from '@/base/lib';

import { HighlightedNews } from '../components/highlighted-news';
import {
  HighlightedProperties,
  HighlightedPropertiesSkeleton,
} from '../components/highlighted-properties';
import { PropertiesFilter } from '../components/properties-filter';
import {
  HorizontalPropertyCard,
  HorizontalPropertyCardSkeleton,
} from '../components/property-card';
import {
  RecommendedProperties,
  RecommendedPropertiesSkeleton,
} from '../components/recommended-properties';
import { propertiesService } from '../services/properties.service';
import { PropertySearchParams, propertyCategories } from '../types';

type PropertiesPageProps = {
  searchParams: PropertySearchParams;
};

export function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const router = useRouter();
  const {
    data: {
      data: properties,
      metadata: { pagination },
    },
  } = useSuspenseQuery({
    queryKey: ['properties', 'all', searchParams],
    queryFn: () => propertiesService.getAllProperties(searchParams),
  });

  const redirectToFilteredArea = (minArea: number, maxArea: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('minArea', minArea.toString());
    params.set('maxArea', maxArea.toString());
    router.push(`/properties?${params.toString()}`);
  };

  const redirectToFilteredPrice = (minPrice: number, maxPrice: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('minPricePerMonth', minPrice.toString());
    params.set('maxPricePerMonth', maxPrice.toString());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="container mx-auto mt-12 flex flex-col gap-x-16 xl:max-w-6xl!">
      <div className="grid-col-2 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="max-xs:flex-col flex items-center justify-between gap-2">
            <span className="max-xs:text-center" title={getTitle(searchParams)}>
              {getTitle(searchParams)}
            </span>
            <PropertiesFilter key={JSON.stringify(searchParams)} />
          </div>
          {properties.length !== 0 ? (
            <>
              {properties.map((property) => (
                <HorizontalPropertyCard key={`property-card-${property.id}`} property={property} />
              ))}
              <Pagination pagination={pagination} />
            </>
          ) : (
            <div className="space-y-20">
              <div className="flex flex-col items-center gap-4">
                <Image src="/result-not-found.png" alt="not found" width={300} height={300} />
                <p className="w-2/3 text-center">
                  Không tìm thấy bài đăng nào phù hợp với bộ lọc của bạn. Vui lòng điều chỉnh bộ lọc
                  hoặc tìm kiếm khác.
                </p>
              </div>
              <Suspense fallback={<RecommendedPropertiesSkeleton />}>
                <RecommendedProperties />
              </Suspense>
            </div>
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Xem theo giá</h2>
                <div className="grid grid-cols-2">
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minPricePerMonth === '1000000' &&
                        searchParams.maxPricePerMonth === '2000000',
                    })}
                    onClick={() => redirectToFilteredPrice(1_000_000, 2_000_000)}
                  >
                    <ChevronRight />
                    Từ 1 - 2 triệu
                  </Button>
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minPricePerMonth === '2000000' &&
                        searchParams.maxPricePerMonth === '3000000',
                    })}
                    onClick={() => redirectToFilteredPrice(2_000_000, 3_000_000)}
                  >
                    <ChevronRight />
                    Từ 2 - 3 triệu
                  </Button>
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minPricePerMonth === '3000000' &&
                        searchParams.maxPricePerMonth === '4000000',
                    })}
                    onClick={() => redirectToFilteredPrice(3_000_000, 4_000_000)}
                  >
                    <ChevronRight />
                    Từ 3 - 4 triệu
                  </Button>
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minPricePerMonth === '5000000' &&
                        searchParams.maxPricePerMonth === '7000000',
                    })}
                    onClick={() => redirectToFilteredPrice(5_000_000, 7_000_000)}
                  >
                    <ChevronRight />
                    Từ 5 - 7 triệu
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Xem theo diện tích</h2>
                <div className="grid grid-cols-2">
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minArea === '0' && searchParams.maxArea === '20',
                    })}
                    onClick={() => redirectToFilteredArea(0, 20)}
                  >
                    <ChevronRight />
                    <span>
                      Dưới 20m<sup>2</sup>
                    </span>
                  </Button>
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minArea === '20' && searchParams.maxArea === '30',
                    })}
                    onClick={() => redirectToFilteredArea(20, 30)}
                  >
                    <ChevronRight />
                    <span>
                      Từ 20m<sup>2</sup> - 30m<sup>2</sup>
                    </span>
                  </Button>
                  <Button
                    variant="link"
                    className={cn('col-span-1 w-max p-0! text-base', {
                      'text-[#0E4DB3] underline':
                        searchParams.minArea === '30' && searchParams.maxArea === '40',
                    })}
                    onClick={() => redirectToFilteredArea(30, 40)}
                  >
                    <ChevronRight />
                    <span>
                      Từ 30m<sup>2</sup> - 40m<sup>2</sup>
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<HighlightedPropertiesSkeleton />}>
            <HighlightedProperties />
          </Suspense>
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}

export function PropertiesPageSkeleton() {
  return (
    <div className="container mx-auto mt-12 flex flex-col gap-x-16 xl:max-w-6xl!">
      <div className="grid-col-2 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="max-xs:flex-col flex items-center justify-between gap-2">
            <span className="max-xs:text-center">Đang hiện tất cả các bài đăng</span>
            <Button variant="outline">
              <FilterIcon />
              Bộ lọc
            </Button>
          </div>
          {Array.from({ length: 10 }).map((_, index) => (
            <HorizontalPropertyCardSkeleton key={`property-card-${index}`} />
          ))}
          <PaginationSkeleton />
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
                    <span>
                      Dưới 20m<sup>2</sup>
                    </span>
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    <span>
                      Từ 20m<sup>2</sup> - 30m<sup>2</sup>
                    </span>
                  </Button>
                  <Button variant="link" className="col-span-1 w-max p-0! text-base">
                    <ChevronRight />
                    <span>
                      Từ 30m<sup>2</sup> - 40m<sup>2</sup>
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Suspense fallback={<HighlightedPropertiesSkeleton />}>
            <HighlightedProperties />
          </Suspense>
          <HighlightedNews />
        </div>
      </div>
    </div>
  );
}

function getTitle(searchParams: PropertySearchParams): string {
  const category = searchParams.category ? propertyCategories[searchParams.category] : '';

  const categoryTitle = `Đang hiện tất cả bài đăng ${category.toLowerCase()}`;
  let priceTitle = '';
  let areaTitle = '';

  const moneyFormatter = new Intl.NumberFormat('vi-VN', { currency: 'VND', style: 'currency' });

  if (
    searchParams.minPricePerMonth &&
    Number(searchParams.minPricePerMonth) !== 0 &&
    searchParams.maxPricePerMonth
  ) {
    priceTitle = `, giá từ ${moneyFormatter.format(Number(searchParams.minPricePerMonth))} đến ${moneyFormatter.format(Number(searchParams.maxPricePerMonth))}`;
  } else if (searchParams.minPricePerMonth && Number(searchParams.minPricePerMonth) !== 0) {
    priceTitle = `, giá từ ${moneyFormatter.format(Number(searchParams.minPricePerMonth))}`;
  } else if (searchParams.maxPricePerMonth) {
    priceTitle = `, giá dưới ${moneyFormatter.format(Number(searchParams.maxPricePerMonth))}`;
  }

  if (searchParams.minArea && Number(searchParams.minArea) !== 0 && searchParams.maxArea) {
    areaTitle = `, diện tích từ ${searchParams.minArea} đến ${searchParams.maxArea}m²`;
  } else if (searchParams.minArea && Number(searchParams.minArea) !== 0) {
    areaTitle = `, diện tích từ ${searchParams.minArea}m²`;
  } else if (searchParams.maxArea) {
    areaTitle = `, diện tích dưới ${searchParams.maxArea}m²`;
  }

  return `${categoryTitle}${priceTitle}${areaTitle}`;
}
