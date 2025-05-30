import { Metadata } from 'next';

import { ChangePasswordPage } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Đổi mật khẩu',
};

export default function Page() {
  return <ChangePasswordPage />;
}
