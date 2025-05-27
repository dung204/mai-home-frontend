import { Metadata } from 'next';

import { PropertiesPage } from '@/modules/properties';

export const metadata: Metadata = {
  title: 'Danh sách phòng trọ',
};

export default function Page() {
  return <PropertiesPage />;
}
