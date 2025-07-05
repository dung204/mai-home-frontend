'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { LoadingIndicator } from '@/base/components/ui/loading-indicator';
import { useAuthDialog } from '@/base/providers';
import { User } from '@/modules/users';

import { authService } from '../services/auth.service';
import { OAuthAction } from '../types';

interface GoogleCallbackHandlerProps {
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
}

export function GoogleCallbackHandler({ user }: GoogleCallbackHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const needCompleteProfile = searchParams.get('needCompleteProfile') === 'true';
  const { setMode, setOpen, setStep, setDefaultValues, setVersion } = useAuthDialog();
  const [isConflictDialogOpen, setIsConflictDialogOpen] = useState(false);
  const [isOtherErrorDialogOpen, setIsOtherErrorDialogOpen] = useState(false);

  const { mutate: triggerHandleGoogleAuth, isPending: isHandling } = useMutation({
    mutationFn: (payload: { code: string; action: OAuthAction }) =>
      authService.handleGoogleAuth(payload),
    onSuccess: async ({ data }) => {
      const redirectUrl = new URL('/', window.location.origin);

      if (!data.user.displayName || !data.user.phone) {
        redirectUrl.searchParams.set('needCompleteProfile', 'true');
        router.replace(redirectUrl.href);
        return;
      }

      router.refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === HttpStatusCode.Conflict) {
        setIsConflictDialogOpen(true);
        return;
      }
      setIsOtherErrorDialogOpen(true);
    },
  });

  useEffect(() => {
    if (code) {
      triggerHandleGoogleAuth({ code, action: OAuthAction.AUTHENTICATE });
      return;
    }

    if (needCompleteProfile) {
      setMode('register');
      setStep(2);
      setDefaultValues({
        displayName: user?.displayName || '',
        phoneNumber: user?.phone || '',
      });
      setVersion((prev) => prev + 1);
      setOpen(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, needCompleteProfile]);

  return (
    <>
      <HandlingDialog open={isHandling} />
      <ConflictErrorDialog open={isConflictDialogOpen} onOpenChange={setIsConflictDialogOpen} />
      <OtherErrorDialog open={isOtherErrorDialogOpen} onOpenChange={setIsOtherErrorDialogOpen} />
    </>
  );
}

function HandlingDialog(props: ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="text-center">
        <AlertDialogTitle>Đang xử lý...</AlertDialogTitle>
        <div className="flex items-center justify-center">
          <LoadingIndicator className="size-16" />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ConflictErrorDialog(props: ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Không thể đăng nhập bằng Google</AlertDialogTitle>
          <AlertDialogDescription>
            Email đã được sử dụng để đăng ký tài khoản. Vui lòng đăng nhập bằng email và mật khẩu
            của bạn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function OtherErrorDialog(props: ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Không thể đăng nhập bằng Google</AlertDialogTitle>
          <AlertDialogDescription>
            Đã có lỗi xảy ra trong quá trình xử lý đăng nhập. Vui lòng thử lại sau.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
