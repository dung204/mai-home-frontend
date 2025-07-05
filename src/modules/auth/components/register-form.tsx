'use client';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { AlertCircleIcon, LockIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { Ref, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/base/components/ui/alert';
import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';
import { UpdateUserSchema, updateUserSchema, userService } from '@/modules/users';

import { authService } from '../services/auth.service';
import { RegisterSchema, loginSchema } from '../types';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  step?: number;
  onStepChange?: (step: number) => void;
  defaultValues?: Record<string, unknown>;
}

export function RegisterForm({
  onRegisterSuccess,
  onStepChange,
  step: initialStep,
  defaultValues,
}: RegisterFormProps) {
  const [step, setStep] = useState(initialStep ?? 1);
  const step1Ref = useRef<UseFormReturn>(null);

  const {
    mutate: triggerRegister,
    error: step1Error,
    isPending: step1Loading,
  } = useMutation({
    mutationFn: (payload: RegisterSchema) => authService.register(payload),
    onSuccess: async ({ data }) => {
      await axios.post('/api/auth/set-cookie', {
        data: {
          ...data,
          user: {
            ...data.user,
            displayName: !data.user.displayName ? null : encodeURIComponent(data.user.displayName),
          },
        },
      });

      if (!data.user.phone && !data.user.displayName) {
        setStep(2);
        onStepChange?.(2);
        return;
      }

      if (!data.user.displayName) {
        setStep(2.1);
        onStepChange?.(2.1);
        return;
      }

      onRegisterSuccess?.();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === HttpStatusCode.Conflict) {
        step1Ref.current?.setError('identifier', {
          type: 'conflict',
          message: 'Số điện thoại hoặc email đã được sử dụng',
        });
        return;
      }
    },
  });

  const {
    mutate: triggerUpdateUser,
    error: step3Error,
    isPending: step3Loading,
  } = useMutation({
    mutationFn: (payload: UpdateUserSchema) => userService.updateUserProfile(payload),
    onSuccess: async () => onRegisterSuccess?.(),
  });

  switch (step) {
    case 1:
      return (
        <RegisterStep1
          ref={step1Ref}
          loading={step1Loading}
          error={step1Error}
          onStepComplete={({ identifier, password }) => {
            triggerRegister({
              ...(identifier.includes('@') ? { email: identifier } : { phone: identifier }),
              password,
            });
          }}
          defaultValues={defaultValues}
        />
      );
    case 2:
      return (
        <RegisterFormStep2
          error={step3Error}
          loading={step3Loading}
          onStepComplete={(data) => triggerUpdateUser(data)}
          defaultValues={defaultValues}
        />
      );
    case 2.1:
      return (
        <RegisterFormStep21
          loading={step3Loading}
          error={step3Error}
          onStepComplete={(data) => {
            triggerUpdateUser(data);
          }}
          defaultValues={defaultValues}
        />
      );
    default:
      return <div>Unknown step</div>;
  }
}

interface RegisterStep1Props {
  ref?: Ref<UseFormReturn> | null;
  loading?: boolean;
  error?: Error | null;
  onStepComplete?: (data: { identifier: string; password: string }) => void;
  defaultValues?: Record<string, unknown>;
}

function RegisterStep1({ onStepComplete, loading, error, ref, defaultValues }: RegisterStep1Props) {
  return (
    <div className="space-y-2">
      {error && !(error instanceof AxiosError && error.status === HttpStatusCode.Conflict) && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể đăng ký</AlertTitle>
          <AlertDescription>
            Đã xảy ra lỗi bất ngờ khi đăng ký. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}
      <Form
        ref={ref}
        defaultValues={defaultValues}
        className="flex flex-col gap-4"
        loading={loading}
        schema={loginSchema
          .pick({
            identifier: true,
            password: true,
          })
          .extend({
            confirmPassword: z.string().nonempty('Mật khẩu xác nhận không được để trống'),
          })
          .refine(({ password, confirmPassword }) => password === confirmPassword, {
            message: 'Mật khẩu xác nhận không khớp với mật khẩu mới',
            path: ['confirmPassword'],
          })}
        fields={[
          {
            name: 'identifier',
            type: 'text',
            placeholder: 'Số điện thoại hoặc email',
            render: ({ Control, Message }) => (
              <>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border px-4 pr-2 transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    'py-2',
                  )}
                >
                  <UserIcon />
                  <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                </div>
                <Message />
              </>
            ),
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Mật khẩu',
            render: ({ Control, Message }) => (
              <>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border px-4 pr-2 transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    'py-2',
                  )}
                >
                  <LockIcon />
                  <Control
                    classNames={{
                      container:
                        'rounded-none border-0! shadow-none ring-0! focus-visible:ring-0! w-full',
                      input: 'text-base!',
                    }}
                  />
                </div>
                <Message />
              </>
            ),
          },
          {
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Xác nhận mật khẩu',
            render: ({ Control, Message }) => (
              <>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border px-4 pr-2 transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    'py-2',
                  )}
                >
                  <LockIcon />
                  <Control
                    classNames={{
                      container:
                        'rounded-none border-0! shadow-none ring-0! focus-visible:ring-0! w-full',
                      input: 'text-base!',
                    }}
                  />
                </div>
                <Message />
              </>
            ),
          },
        ]}
        renderSubmitButton={(Button) => (
          <Button size="lg" className="py-8 text-xl capitalize">
            Tiếp tục
          </Button>
        )}
        onSuccessSubmit={({ identifier, password }) => onStepComplete?.({ identifier, password })}
      />
    </div>
  );
}

type RegisterFormStep2Props = {
  error?: Error | null;
  loading?: boolean;
  onStepComplete?: (data: { displayName: string; phone: string }) => void;
  defaultValues?: Record<string, unknown>;
};

function RegisterFormStep2({
  loading,
  onStepComplete,
  error,
  defaultValues,
}: RegisterFormStep2Props) {
  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể cập nhật thông tin</AlertTitle>
          <AlertDescription>
            Đã xảy ra lỗi bất ngờ khi cập nhật thông tin. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}
      <Form
        loading={loading}
        defaultValues={defaultValues}
        className="flex flex-col gap-4"
        schema={updateUserSchema
          .pick({
            displayName: true,
            phone: true,
          })
          .required()}
        fields={[
          {
            name: 'displayName',
            type: 'text',
            placeholder: 'Tên hiển thị',
            render: ({ Control, Message }) => (
              <>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border px-4 pr-2 transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    'py-2',
                  )}
                >
                  <UserIcon />
                  <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                </div>
                <Message />
              </>
            ),
          },
          {
            name: 'phone',
            type: 'text',
            placeholder: 'Số điện thoại',
            render: ({ Control, Message }) => (
              <>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border px-4 pr-2 transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    'py-2',
                  )}
                >
                  <PhoneIcon />
                  <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                </div>
                <Message />
              </>
            ),
          },
        ]}
        renderSubmitButton={(Button) => (
          <Button size="lg" className="py-8 text-xl capitalize">
            Tiếp tục
          </Button>
        )}
        onSuccessSubmit={(data) => onStepComplete?.(data)}
      />
    </div>
  );
}

type RegisterFormStep21Props = {
  error?: Error | null;
  loading?: boolean;
  onStepComplete?: (data: { displayName: string }) => void;
  defaultValues?: Record<string, unknown>;
};

function RegisterFormStep21({
  loading,
  onStepComplete,
  error,
  defaultValues,
}: RegisterFormStep21Props) {
  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể cập nhật thông tin</AlertTitle>
          <AlertDescription>
            Đã xảy ra lỗi bất ngờ khi cập nhật thông tin. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}
      <Form
        defaultValues={defaultValues}
        loading={loading}
        className="flex flex-col gap-4"
        schema={updateUserSchema
          .pick({
            displayName: true,
          })
          .required()}
        fields={[
          {
            name: 'displayName',
            type: 'text',
            placeholder: 'Tên hiển thị',
            render: ({ Control, Message }) => (
              <>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border px-4 pr-2 transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    'py-2',
                  )}
                >
                  <UserIcon />
                  <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                </div>
                <Message />
              </>
            ),
          },
        ]}
        renderSubmitButton={(Button) => (
          <Button size="lg" className="py-8 text-xl capitalize">
            Tiếp tục
          </Button>
        )}
        onSuccessSubmit={(data) => onStepComplete?.(data)}
      />
    </div>
  );
}
