import { ComponentProps } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/base/components/ui/avatar';
import { Skeleton } from '@/base/components/ui/skeleton';
import { cn } from '@/base/lib';

import { User } from '../types';

interface UserAvatarProps extends Omit<ComponentProps<typeof Avatar>, 'ref'> {
  user: Partial<User> | undefined;
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  return (
    <Avatar className={cn('border-primary border-2', className)} {...props}>
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
