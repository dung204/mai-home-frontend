'use client';

import { useQuery } from '@tanstack/react-query';

import { userService } from '../services/user.service';

export function useUser() {
  return useQuery({
    queryKey: ['users', 'profile'],
    queryFn: () => userService.getUserProfile(),
    refetchOnWindowFocus: false,
  });
}
