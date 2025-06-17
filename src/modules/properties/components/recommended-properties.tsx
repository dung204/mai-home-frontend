import { useSuspenseQuery } from '@tanstack/react-query';

import { propertiesService } from '../services/properties.service';
import { HorizontalPropertyCard, HorizontalPropertyCardSkeleton } from './property-card';

export function RecommendedProperties() {
  const {
    data: { data: properties },
  } = useSuspenseQuery({
    queryKey: ['properties', 'recommended'],
    queryFn: async () => propertiesService.getAllProperties({ pageSize: 2 }),
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Có thể bạn quan tâm</h2>
      {properties.map((property) => (
        <HorizontalPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export function RecommendedPropertiesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Có thể bạn quan tâm</h2>
      <HorizontalPropertyCardSkeleton />
      <HorizontalPropertyCardSkeleton />
    </div>
  );
}
