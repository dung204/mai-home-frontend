import { PropsWithChildren, Suspense } from 'react';

import { HighlightedNews } from '@/modules/properties/components/highlighted-news';
import {
  HighlightedProperties,
  HighlightedPropertiesSkeleton,
} from '@/modules/properties/components/highlighted-properties';
import {
  RecommendedProperties,
  RecommendedPropertiesSkeleton,
} from '@/modules/properties/components/recommended-properties';

export default function NewsLayout({ children }: PropsWithChildren) {
  return (
    <div className="container m-auto mt-12 flex flex-col gap-16 xl:max-w-6xl!">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {children}
          <Suspense fallback={<RecommendedPropertiesSkeleton />}>
            <RecommendedProperties />
          </Suspense>
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
