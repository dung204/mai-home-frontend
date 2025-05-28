'use client';

import { BadgeDollarSignIcon, HeartIcon, LandPlotIcon, MapPinIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
import { withTooltip } from '@/base/components/ui/tooltip';

const PriceIcon = withTooltip(BadgeDollarSignIcon);
const AreaIcon = withTooltip(LandPlotIcon);
const LocationIcon = withTooltip(MapPinIcon);

const FavouriteButton = withTooltip(Button);

export function HorizontalPropertyCard() {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-6">
          <div className="aspect-square h-64">
            <Skeleton className="size-full" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-[1lh] w-full" />
              <Skeleton className="h-[1lh] w-2/3" />
            </div>
            <div className="flex items-center gap-1">
              <PriceIcon
                className="text-muted-foreground"
                tooltip="Giá thuê 1 tháng"
                tooltipContentProps={{ side: 'left' }}
              />
              :
              <Skeleton className="h-[1lh] w-[6ch]" />
            </div>
            <div className="flex items-center gap-1">
              <AreaIcon
                className="text-muted-foreground"
                tooltip="Diện tích"
                tooltipContentProps={{ side: 'left' }}
              />
              :
              <Skeleton className="h-[1lh] w-[6ch]" />
            </div>
            <div className="flex items-center gap-1">
              <LocationIcon
                className="text-muted-foreground"
                tooltip="Vị trí"
                tooltipContentProps={{ side: 'left' }}
              />
              :
              <Skeleton className="h-[1lh] w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <Skeleton className="size-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex w-full flex-col gap-1.5">
                  <Skeleton className="h-[1lh] w-[10ch]" />
                  <div className="text-xs">
                    <Skeleton className="h-[1lh] w-[10ch]" />
                  </div>
                </div>
              </div>
              <FavouriteButton
                variant="outline"
                size="icon"
                className="text-danger border-danger hover:text-danger"
                disabled
                tooltip="Thêm vào danh sách yêu thích"
              >
                <HeartIcon />
              </FavouriteButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function VerticalPropertyCard() {
  return (
    <Card className="overflow-hidden pt-0">
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
  );
}
