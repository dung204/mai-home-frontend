'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ComponentProps, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { Button } from '@/base/components/ui/button';
import { Form } from '@/base/components/ui/form';
import { mediaService } from '@/modules/media';

import { userService } from '../services/user.service';
import { UpdateUserSchema, User, updateUserSchema } from '../types';

interface UpdateProfileFormProps {
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
}

const updateProfileFormSchema = updateUserSchema.required({
  displayName: true,
  phone: true,
});

export function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const router = useRouter();
  const formRef = useRef<UseFormReturn<z.infer<typeof updateProfileFormSchema>>>(null);
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { mutateAsync: triggerUploadFiles, isPending: isUploadingFiles } = useMutation({
    mutationFn: (payload: { files: File[]; folder?: string }) => mediaService.uploadFiles(payload),
  });

  const { mutate: triggerUpdateUser, isPending: isUpdatingProfile } = useMutation({
    mutationFn: (payload: UpdateUserSchema) => userService.updateUserProfile(payload),
    onSuccess: () => {
      setShowSuccessDialog(true);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === HttpStatusCode.Conflict) {
        formRef.current?.setError(error.response?.data.field, {
          type: 'conflict',
          message: error.response?.data.message,
        });
        return;
      }

      setShowFailedDialog(true);
    },
  });

  const handleSubmit = async ({
    avatar,
    displayName,
    email,
    phone,
  }: z.infer<typeof updateProfileFormSchema>) => {
    let savedAvatar: string | undefined;

    if (avatar) {
      try {
        const res = await triggerUploadFiles({
          files: [avatar.file],
          folder: `avatars/${user?.id}`,
        });

        if (!res.data[0].url) throw new Error();

        savedAvatar = res.data[0].fileName;
      } catch (_err) {}
    }

    const uploadPayload: UpdateUserSchema = {
      ...(displayName === user?.displayName ? {} : { displayName }),
      ...(email === user?.email ? {} : { email }),
      ...(phone === user?.phone ? {} : { phone }),
      ...(savedAvatar ? { avatar: savedAvatar } : {}),
    };

    if (Object.keys(uploadPayload).length !== 0) {
      triggerUpdateUser({
        displayName,
        email,
        phone,
        ...(savedAvatar ? { avatar: savedAvatar } : {}),
      });
    }
  };

  return (
    <>
      <Form
        ref={formRef}
        className="grid gap-4"
        loading={isUpdatingProfile || isUploadingFiles}
        schema={updateProfileFormSchema}
        defaultValues={{
          email: user?.email ?? '',
          phone: user?.phone ?? '',
          displayName: user?.displayName ?? '',
        }}
        fields={[
          {
            name: 'avatar',
            type: 'avatar',
            user,
            className: 'justify-self-center',
            render: ({ Control }) => <Control className="size-24" />,
          },
          {
            name: 'displayName',
            type: 'text',
            label: 'Tên liên lạc',
            placeholder: '',
          },
          {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: '',
            required: false,
          },
          {
            name: 'phone',
            type: 'text',
            label: 'Số điện thoại',
            placeholder: '',
          },
        ]}
        renderSubmitButton={(SubmitButton) => (
          <>
            <Button type="button" variant="outline" className="w-full">
              <Image src="/google-logo.svg" alt="Google logo" width={24} height={24} />
              Liên kết với Google
            </Button>
            <SubmitButton>Cập nhật</SubmitButton>
          </>
        )}
        onSuccessSubmit={(data) => handleSubmit(data)}
      />
      <FailedAlertDialog open={showFailedDialog} onOpenChange={setShowFailedDialog} />
      <SuccessAlertDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onOkClick={() => {
          router.refresh();
          formRef.current?.setValue('avatar', undefined);
        }}
      />
    </>
  );
}

function FailedAlertDialog(props: ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cập nhật thông tin thất bại</AlertDialogTitle>
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
          <AlertDialogTitle>Cập nhật thông tin thành công</AlertDialogTitle>
          <AlertDialogDescription>Thông tin của bạn đã được cập nhật.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOkClick?.()}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
