'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { ComponentProps, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { Form } from '@/base/components/ui/form';
import { ChangePasswordSchema, authService, changePasswordSchema } from '@/modules/auth';

export function ChangePasswordForm() {
  const formRef = useRef<UseFormReturn<ChangePasswordSchema>>(null);
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { mutate: triggerUpdateUser, isPending: isChangingPassword } = useMutation({
    mutationFn: (payload: Omit<ChangePasswordSchema, 'confirmPassword'>) =>
      authService.changePassword(payload),
    onSuccess: () => {
      formRef.current?.reset();
      setShowSuccessDialog(true);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === HttpStatusCode.BadRequest) {
        formRef.current?.setError(error.response?.data.field, {
          type: 'invalid',
          message: error.response?.data.message,
        });
        return;
      }

      setShowFailedDialog(true);
    },
  });

  return (
    <>
      <Form
        ref={formRef}
        className="grid gap-4"
        loading={isChangingPassword}
        schema={changePasswordSchema}
        fields={[
          {
            name: 'password',
            type: 'password',
            label: 'Mật khẩu hiện tại',
            placeholder: '',
            description: 'Bỏ qua nếu tài khoản chưa thiết lập mật khẩu',
          },
          {
            name: 'newPassword',
            type: 'password',
            label: 'Mật khẩu mới',
            placeholder: '',
          },
          {
            name: 'confirmPassword',
            type: 'password',
            label: 'Xác nhận mật khẩu mới',
            placeholder: '',
          },
        ]}
        renderSubmitButton={(SubmitButton) => <SubmitButton>Cập nhật</SubmitButton>}
        onSuccessSubmit={({ password, newPassword }) =>
          triggerUpdateUser({ password, newPassword })
        }
      />
      <FailedAlertDialog open={showFailedDialog} onOpenChange={setShowFailedDialog} />
      <SuccessAlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog} />
    </>
  );
}

function FailedAlertDialog(props: ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đổi mật khẩu thất bại</AlertDialogTitle>
          <AlertDialogDescription>Đã có lỗi xảy ra. Vui lòng thử lại sau.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface SuccessAlertDialogProps extends ComponentProps<typeof AlertDialog> {
  onOkClick?: () => void;
}

function SuccessAlertDialog({ onOkClick, ...props }: SuccessAlertDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đổi mật khẩu thành công</AlertDialogTitle>
          <AlertDialogDescription>
            Mật khẩu của bạn đã được cập nhật thành công.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOkClick?.()}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
