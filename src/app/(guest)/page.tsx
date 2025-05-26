import { Metadata } from 'next';

import { HomePage } from '@/modules/home';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

export default function Page() {
  return <HomePage />;
}
