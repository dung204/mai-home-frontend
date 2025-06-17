import { PropsWithChildren } from 'react';

import { UserPropertiesLayout } from '@/modules/properties';

export default function Layout({ children }: PropsWithChildren) {
  return <UserPropertiesLayout>{children}</UserPropertiesLayout>;
}
