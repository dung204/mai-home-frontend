import { PropsWithChildren, Suspense } from 'react';

import { UserPropertiesLayout } from '@/modules/properties';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <UserPropertiesLayout>{children}</UserPropertiesLayout>
    </Suspense>
  );
}
