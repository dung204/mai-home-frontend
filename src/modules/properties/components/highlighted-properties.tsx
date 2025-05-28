import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';

export function HighlightedProperties() {
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
