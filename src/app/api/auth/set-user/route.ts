import { cookies } from 'next/headers';

import { userSchema } from '@/modules/users/types';

const schema = userSchema.omit({
  createTimestamp: true,
  updateTimestamp: true,
  deleteTimestamp: true,
});

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const currentUser = schema.safeParse(JSON.parse(cookieStore.get('user')?.value ?? '{}')).data;
  const updatedUser = schema.safeParse(await request.json()).data;

  if (!currentUser || !updatedUser) return Response.json({ status: 204 });

  Object.assign(currentUser, updatedUser);

  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': `user=${JSON.stringify({ ...currentUser, displayName: !currentUser.displayName ? null : encodeURIComponent(currentUser.displayName) })}; Path=/; Secure; Max-Age=31536000; HttpOnly; SameSite=Lax`,
    },
  });
}
