import { Metadata } from 'next';

import { ChangePhonePage } from '@/modules/users';

export const metadata: Metadata = {
  title: 'Đổi số điện thoại',
};

export default function Page() {
  return <ChangePhonePage />;
}
