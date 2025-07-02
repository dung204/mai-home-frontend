import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { NewPropertyPage } from '@/modules/properties';
import { userSchema } from '@/modules/users';

export const metadata: Metadata = {
  title: 'Đăng tin mới',
};

export default async function Page() {
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return <NewPropertyPage user={user} />;
}
