'use client';

import {
  ArchiveRestore,
  BadgeDollarSignIcon,
  EditIcon,
  HeartIcon,
  LandPlotIcon,
  MapPinIcon,
  PlayCircleIcon,
  Trash2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/base/components/ui/avatar';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
import { withTooltip } from '@/base/components/ui/tooltip';

import { Property } from '../types';

const PriceIcon = withTooltip(BadgeDollarSignIcon);
const AreaIcon = withTooltip(LandPlotIcon);
const LocationIcon = withTooltip(MapPinIcon);

const FavouriteButton = withTooltip(Button);

type PropertyCardProps = {
  property: Property;
  withControls?: boolean;
  withOwner?: boolean;
  onDelete?: (propertyId: string) => void;
  onRestore?: (propertyId: string) => void;
};

export function HorizontalPropertyCard({ property }: PropertyCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-6">
          <Link href={`/property/${property.id}`}>
            <div className="relative aspect-square w-32 sm:w-64">
              {property.videos.length > 0 ? (
                <>
                  <div className="absolute inset-0 flex size-full items-center justify-center rounded-md bg-black/50">
                    <PlayCircleIcon className="size-20 text-white" />
                  </div>
                  <video
                    controls={false}
                    muted
                    className="size-full rounded-md bg-black/50 object-cover object-center"
                  >
                    <source src={property.videos[0]} />
                  </video>
                </>
              ) : (
                <Image
                  src={property.images[0] ?? '/placeholder-600x400.svg'}
                  alt={property.title}
                  className="size-full rounded-md bg-black/50 object-cover object-center"
                  fill
                />
              )}
            </div>
          </Link>
          <div className="flex w-full flex-col gap-4">
            <Link href={`/property/${property.id}`}>
              <div className="text-lg font-bold">
                <span className="line-clamp-2" title={property.title}>
                  {property.title}
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <PriceIcon
                className="text-muted-foreground"
                tooltip="Giá thuê 1 tháng"
                tooltipContentProps={{ side: 'left' }}
              />
              :
              <span>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(Number(property.pricePerMonth))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <AreaIcon
                className="text-muted-foreground"
                tooltip="Diện tích"
                tooltipContentProps={{ side: 'left' }}
              />
              :
              <span>
                {property.area} m<sup>2</sup>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <LocationIcon
                className="text-muted-foreground"
                tooltip="Vị trí"
                tooltipContentProps={{ side: 'left' }}
              />
              :
              <span
                className="line-clamp-1"
                title={`${property.address}, ${property.ward.name}, ${property.district.name}, ${property.city.name}`}
              >
                {property.address}, {property.ward.name}, {property.district.name},{' '}
                {property.city.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/default-user-avatar.png" />
                </Avatar>
                <div className="flex w-full flex-col gap-1">
                  <span className="font-semibold">{property.owner.displayName}</span>
                  <div className="text-sm">
                    Đăng vào{' '}
                    {new Intl.RelativeTimeFormat('vi-VN', { numeric: 'auto' })
                      .format(
                        Math.round(
                          (new Date(property.createTimestamp).getTime() - Date.now()) / 86400000,
                        ),
                        'days',
                      )
                      .toLocaleLowerCase('vi-VN')}
                  </div>
                </div>
              </div>
              <FavouriteButton
                variant="outline"
                size="icon"
                className="text-danger border-danger hover:text-danger"
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

export function HorizontalPropertyCardSkeleton() {
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

export function VerticalPropertyCard({
  property,
  withControls,
  withOwner,
  onDelete,
  onRestore,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative h-52 w-full">
        <Link href={`/property/${property.id}`}>
          {property.videos.length > 0 ? (
            <>
              <div className="absolute inset-0 flex size-full items-center justify-center rounded-md rounded-b-none bg-black/50">
                <PlayCircleIcon className="size-20 text-white" />
              </div>
              <video
                controls={false}
                muted
                className="size-full rounded-md rounded-b-none bg-black/50 object-cover object-center"
              >
                <source src={property.videos[0]} />
              </video>
            </>
          ) : (
            <Image
              src={property.images[0] ?? '/placeholder-600x400.svg'}
              alt={property.title}
              className="rounded-md rounded-b-none bg-black/50 object-cover object-center"
              fill
            />
          )}
        </Link>
      </div>
      <CardContent className="flex flex-col gap-4">
        <Link href={`/property/${property.id}`}>
          <span className="line-clamp-2 font-bold">{property.title}</span>
        </Link>
        <div className="flex items-center gap-1">
          <PriceIcon
            className="text-muted-foreground"
            tooltip="Price for 1 month"
            tooltipContentProps={{ side: 'left' }}
          />
          :
          <span>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(Number(property.pricePerMonth))}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <AreaIcon
            className="text-muted-foreground"
            tooltip="Area"
            tooltipContentProps={{ side: 'left' }}
          />
          :
          <span>
            {property.area} m<sup>2</sup>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LocationIcon
            className="text-muted-foreground size-6"
            tooltip="Location"
            tooltipContentProps={{ side: 'left' }}
          />
          :
          <span
            className="line-clamp-1"
            title={`${property.address}, ${property.ward.name}, ${property.district.name}, ${property.city.name}`}
          >
            {property.address}, {property.ward.name}, {property.district.name}, {property.city.name}
          </span>
        </div>
        {withOwner && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/default-user-avatar.png" />
            </Avatar>
            <div className="flex w-full flex-col gap-1">
              <span className="font-semibold">{property.owner.displayName}</span>
              <div className="text-sm">
                Đăng vào{' '}
                {new Intl.RelativeTimeFormat('vi-VN', { numeric: 'auto' })
                  .format(
                    Math.round(
                      (new Date(property.createTimestamp).getTime() - Date.now()) / 86400000,
                    ),
                    'days',
                  )
                  .toLocaleLowerCase('vi-VN')}
              </div>
            </div>
          </div>
        )}
        {withControls &&
          (property.deleteTimestamp ? (
            <Button variant="success" onClick={() => onRestore?.(property.id)}>
              <ArchiveRestore />
              Khôi phục
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Link href={`/user/properties/${property.id}/edit`}>
                <Button variant="success" className="w-full">
                  <EditIcon />
                  Sửa
                </Button>
              </Link>
              <Button variant="danger" onClick={() => onDelete?.(property.id)}>
                <Trash2Icon />
                Xóa
              </Button>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export function VerticalPropertyCardSkeleton() {
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
