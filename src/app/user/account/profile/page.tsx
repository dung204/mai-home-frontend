import { Metadata } from 'next';

import { UpdateProfilePage } from '@/modules/users';

export const metadata: Metadata = {
  title: 'Cập nhật thông tin cá nhân',
};

export default function Page() {
  return <UpdateProfilePage />;
}
