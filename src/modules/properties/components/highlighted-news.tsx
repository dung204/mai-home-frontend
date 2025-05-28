import { ChevronRight } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';

export function HighlightedNews() {
  return (
    <section>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Có thể bạn quan tâm</h2>
            <div className="flex flex-col gap-1">
              {Array.from({ length: 2 }).map((_, index) => (
                <Button
                  variant="link"
                  className="col-span-1 cursor-default p-0! text-base"
                  key={`interest-news-${index}`}
                >
                  <ChevronRight />
                  <span className="grow truncate">
                    <Skeleton className="h-[1lh] w-full" />
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
