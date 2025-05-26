import { ChevronsRight } from 'lucide-react';

import { Button } from '@/base/components/ui/button';

import { PropertyCarousel } from './property-carousel';

export function TopMiniApartmentBuildings() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize">Chung cư mini</h2>
        <Button variant="link" className="text-lg">
          xem thêm
          <ChevronsRight className="size-5" />
        </Button>
      </div>
      <PropertyCarousel />
    </section>
  );
}
