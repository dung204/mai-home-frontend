'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/base/components/ui/carousel';
import {
  VerticalPropertyCard,
  VerticalPropertyCardSkeleton,
} from '@/modules/properties/components/property-card';

import { Property } from '../types';

interface PropertyCarouselProps {
  properties: Property[];
}

export function PropertyCarousel({ properties }: PropertyCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {properties.map((property) => (
          <CarouselItem key={property.id} className="basis-1/4">
            <div className="p-1">
              <VerticalPropertyCard property={property} withOwner />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function PropertyCarouselSkeleton() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map(() => (
          <CarouselItem key={crypto.randomUUID()} className="basis-1/4">
            <div className="p-1">
              <VerticalPropertyCardSkeleton />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
