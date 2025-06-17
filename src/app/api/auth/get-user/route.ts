import { cookies } from 'next/headers';

import { userSchema } from '@/modules/users';

export async function GET(_request: Request) {
  const cookieStore = await cookies();
  const { data: user } = userSchema
    .omit({ deleteTimestamp: true, createTimestamp: true, updateTimestamp: true })
    .safeParse(JSON.parse(cookieStore.get('user')?.value ?? '{}'));

  return Response.json(!user ? null : user);
}
