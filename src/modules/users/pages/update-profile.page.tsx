import { Card, CardContent } from '@/base/components/ui/card';

import { UpdateProfileForm } from '../components/update-profile-form';
import { userSchema } from '../types';

export async function UpdateProfilePage() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const user = userSchema
    .omit({
      createTimestamp: true,
      updateTimestamp: true,
      deleteTimestamp: true,
    })
    .safeParse(JSON.parse(cookieStore.get('user')?.value || '{}')).data;

  return (
    <section className="container mx-auto lg:max-w-lg!">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <UpdateProfileForm user={user} />
        </CardContent>
      </Card>
    </section>
  );
}
