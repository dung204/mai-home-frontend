'use client';

import { PlayCircleIcon } from 'lucide-react';
import Image from 'next/image';
import {
  ComponentProps,
  ComponentRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/base/components/ui/carousel';
import { cn } from '@/base/lib';

import { Property } from '../types';

interface PropertyImageCarouselProps
  extends Omit<ComponentProps<typeof Carousel>, 'setApi' | 'className' | 'property'> {
  property: Property;
  classNames?: {
    carousel?: string;
    item?: string;
  };
}

export function PropertyImageCarousel({
  property,
  classNames = {},
  ...props
}: PropertyImageCarouselProps) {
  const thumbnailsRef = useRef<ComponentRef<typeof Thumbnails>>(null);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      thumbnailsRef.current?.setCurrentThumbnail(api.selectedScrollSnap() - 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        className={cn('mx-auto w-full bg-black/50', classNames.carousel)}
        setApi={setApi}
        {...props}
      >
        <CarouselContent>
          {property.videos.map((video) => (
            <CarouselItem
              className={cn('relative w-full', classNames.item)}
              key={`property-video-${crypto.randomUUID()}`}
            >
              <video src={video} controls className="size-full object-contain" />
            </CarouselItem>
          ))}
          {property.images.map((image) => (
            <CarouselItem
              className={cn('relative w-full', classNames.item)}
              key={`property-image-${crypto.randomUUID()}`}
            >
              <Image
                src={image ?? '/placeholder-600x400.svg'}
                alt=""
                className="object-contain"
                fill
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-50" />
        <CarouselNext className="right-4 z-50" />
      </Carousel>
      <Thumbnails
        property={property}
        ref={thumbnailsRef}
        onThumbnailClick={(index) => api?.scrollTo(index)}
      />
    </div>
  );
}

interface ThumbnailsProps {
  property: Property;
  ref?: Ref<{ setCurrentThumbnail: (index: number) => void }>;
  onThumbnailClick?: (index: number) => void;
}

function Thumbnails({ property, ref, onThumbnailClick }: ThumbnailsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      setCurrentThumbnail: (index: number) => {
        setCurrentSlide(index + 1);
      },
    }),
    [],
  );

  return (
    <div className="flex justify-center gap-4">
      {property.videos.map((video, index) => (
        <div
          className={cn('relative aspect-square h-16 cursor-pointer rounded-md bg-black/50', {
            'border-primary border-2': currentSlide === index,
          })}
          key={`property-video-${crypto.randomUUID()}`}
          onClick={() => onThumbnailClick?.(index)}
        >
          <div className="absolute flex size-full items-center justify-center">
            <PlayCircleIcon className="text-white" />
          </div>
          <video
            preload="metadata"
            src={video}
            className="size-full object-contain object-center"
            muted
            controls={false}
          />
        </div>
      ))}
      {property.images.map((image, index) => (
        <div
          className={cn('relative aspect-square h-16 cursor-pointer rounded-md bg-black/50', {
            'border-primary border-2': currentSlide === index + property.videos.length,
          })}
          key={`property-image-${crypto.randomUUID()}`}
          onClick={() => onThumbnailClick?.(index + property.videos.length)}
        >
          <Image
            src={image ?? '/placeholder-600x400.svg'}
            alt=""
            className="object-contain object-center"
            fill
            priority
          />
        </div>
      ))}
    </div>
  );
}
