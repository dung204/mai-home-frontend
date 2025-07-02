'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PlayCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';
import { envClient } from '@/base/config/env-client.config';

import { propertiesService } from '../services/properties.service';

export function HighlightedProperties() {
  const {
    data: { data: properties },
  } = useSuspenseQuery({
    queryKey: ['properties', 'highlighted'],
    queryFn: async () => propertiesService.getAllProperties({ pageSize: 4 }),
  });

  return (
    <section>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Tin nổi bật</h2>
            <div className="flex flex-col gap-4">
              {properties.map((property) => (
                <div key={`highlighted-property-${crypto.randomUUID()}`} className="flex gap-3.5">
                  <Link href={`/property/${property.id}`}>
                    <div className="relative aspect-square h-20">
                      {property.videos.length > 0 ? (
                        <>
                          <div className="absolute inset-0 flex size-full items-center justify-center rounded-md bg-black/50">
                            <PlayCircleIcon className="size-10 text-white" />
                          </div>
                          <video
                            controls={false}
                            muted
                            className="size-full rounded-md bg-black/50 object-cover object-center"
                          >
                            <source
                              src={`${envClient.NEXT_PUBLIC_ASSETS_URL}${property.videos[0]}`}
                            />
                          </video>
                        </>
                      ) : (
                        <Image
                          src={`${envClient.NEXT_PUBLIC_ASSETS_URL}${property.images[0]}`}
                          alt={property.title}
                          className="size-full rounded-md bg-black/50 object-cover object-center"
                          fill
                        />
                      )}
                    </div>
                  </Link>
                  <Link href={`/property/${property.id}`}>
                    <div className="w-full font-semibold">
                      <span className="line-clamp-2">{property.title}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function HighlightedPropertiesSkeleton() {
  return (
    <section>
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
    </section>
  );
}
