'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronsRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/base/components/ui/button';

import { propertiesService } from '../services/properties.service';
import { PropertyCategory } from '../types';
import { PropertyCarousel, PropertyCarouselSkeleton } from './property-carousel';

export function TopRentedRooms() {
  const {
    data: { data: properties },
  } = useSuspenseQuery({
    queryKey: ['properties', 'top', { category: PropertyCategory.ROOM }],
    queryFn: () =>
      propertiesService.getAllProperties({
        category: PropertyCategory.ROOM,
        pageSize: 10,
      }),
  });

  if (!properties || properties.length === 0) {
    return <></>;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize">Phòng trọ</h2>
        <Link href="/properties?category=ROOM">
          <Button variant="link" className="text-lg">
            xem thêm
            <ChevronsRight className="size-5" />
          </Button>
        </Link>
      </div>
      <PropertyCarousel properties={properties} />
    </section>
  );
}

export function TopRentedRoomsSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize">Phòng trọ</h2>
        <Button variant="link" className="text-lg">
          xem thêm
          <ChevronsRight className="size-5" />
        </Button>
      </div>
      <PropertyCarouselSkeleton />
    </section>
  );
}
