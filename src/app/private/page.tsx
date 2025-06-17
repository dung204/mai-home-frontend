import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getQueryClient } from '@/base/lib';
import { PrivatePage } from '@/modules/auth';
import { userService } from '@/modules/users';

export default async function Private() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', 'profile'],
    queryFn: userService.getUserProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
        <Suspense fallback={<p>Loading...</p>}>
          <PrivatePage />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
