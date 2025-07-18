'use client';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { buttonVariantsFn } from '@/base/components/ui/button';

import { authService } from '../services/auth.service';

export function ConfirmLogoutDialog(props: ComponentProps<typeof AlertDialog>) {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: triggerLogout } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      if (pathname.startsWith('/user')) {
        router.replace('/');
      } else {
        router.refresh();
      }
    },
  });

  return (
    <AlertDialog {...props}>
      <AlertDialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất hay không?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => triggerLogout()}
            className={buttonVariantsFn({ variant: 'danger' })}
          >
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
