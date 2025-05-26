'use client';

import { BadgeDollarSignIcon, LandPlotIcon, MapPinIcon } from 'lucide-react';

import { Card, CardContent } from '@/base/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/base/components/ui/carousel';
import { Skeleton } from '@/base/components/ui/skeleton';
import { withTooltip } from '@/base/components/ui/tooltip';

const PriceIcon = withTooltip(BadgeDollarSignIcon);
const AreaIcon = withTooltip(LandPlotIcon);
const LocationIcon = withTooltip(MapPinIcon);

export function PropertyCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/4">
            <div className="p-1">
              <Card className="pt-0">
                <div className="h-52 w-full">
                  <Skeleton className="size-full rounded-none" />
                </div>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-[1lh] w-full" />
                    <Skeleton className="h-[1lh] w-2/3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <PriceIcon
                      className="text-muted-foreground"
                      tooltip="Price for 1 month"
                      tooltipContentProps={{ side: 'left' }}
                    />
                    :
                    <Skeleton className="h-[1lh] w-[6ch]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <AreaIcon
                      className="text-muted-foreground"
                      tooltip="Area"
                      tooltipContentProps={{ side: 'left' }}
                    />
                    :
                    <Skeleton className="h-[1lh] w-[6ch]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <LocationIcon
                      className="text-muted-foreground"
                      tooltip="Location"
                      tooltipContentProps={{ side: 'left' }}
                    />
                    :
                    <Skeleton className="h-[1lh] w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
