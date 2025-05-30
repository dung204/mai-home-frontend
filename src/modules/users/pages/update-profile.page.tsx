import { Avatar, AvatarFallback } from '@/base/components/ui/avatar';
import { Card, CardContent } from '@/base/components/ui/card';
import { Skeleton } from '@/base/components/ui/skeleton';

import { UpdateProfileForm } from '../components/update-profile-form';

export function UpdateProfilePage() {
  return (
    <section className="mx-auto my-10 w-lg">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback>
                <Skeleton className="size-full" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">user1236</span>
              <span className="text-muted-foreground text-sm">0123456789</span>
            </div>
          </div>
          <UpdateProfileForm />
        </CardContent>
      </Card>
    </section>
  );
}
