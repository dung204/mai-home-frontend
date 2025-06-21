import { ComponentProps } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/base/components/ui/avatar';
import { Skeleton } from '@/base/components/ui/skeleton';

import { User } from '../types';

interface UserAvatarProps extends Omit<ComponentProps<typeof Avatar>, 'ref'> {
  user: Partial<User> | undefined;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage
        src={user?.avatar || '/default-user-avatar.png'}
        alt={user?.displayName || 'User Avatar'}
      />
      <AvatarFallback>
        <Skeleton className="size-full" />
      </AvatarFallback>
    </Avatar>
  );
}
