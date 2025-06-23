import { Metadata } from 'next';

import { NewPropertyPage } from '@/modules/properties';

export const metadata: Metadata = {
  title: 'Đăng tin mới',
};

export default function Page() {
  return <NewPropertyPage />;
}
