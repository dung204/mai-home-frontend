'use client';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { AlertCircleIcon, LockIcon, User } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/base/components/ui/alert';
import { Button } from '@/base/components/ui/button';
import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';
import { LoginSchema, loginSchema } from '@/modules/auth/types';

import { authService } from '../services/auth.service';

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
  defaultValues?: Record<string, unknown>;
}

export function LoginForm({ onLoginSuccess, onForgotPassword, defaultValues }: LoginFormProps) {
  const {
    mutateAsync: triggerLogin,
    isPending,
    error,
  } = useMutation({
    mutationFn: (payload: LoginSchema) => authService.login(payload),
    onSuccess: async ({ data }) => {
      await axios.post('/api/auth/set-cookie', {
        data: {
          ...data,
          user: {
            ...data.user,
            displayName: data.user.displayName && encodeURIComponent(data.user.displayName),
          },
        },
      });
      onLoginSuccess?.();
    },
  });

  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể đăng nhập</AlertTitle>
          <AlertDescription>
            {error instanceof AxiosError && error.status === HttpStatusCode.Unauthorized
              ? 'Email/số điện thoại hoặc mật khẩu không chính xác.'
              : 'Đã xảy ra lỗi bất ngờ khi đăng nhập. Vui lòng thử lại sau.'}
          </AlertDescription>
        </Alert>
      )}
      <Form
        className="flex flex-col gap-4"
        defaultValues={defaultValues}
        loading={isPending}
        schema={loginSchema}
        fields={[
          {
            name: 'identifier',
            type: 'text',
            placeholder: 'Số điện thoại hoặc email',
            disabled: isPending,
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
                  <User />
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
            disabled: isPending,
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
          <Button size="lg" className="py-8 text-xl">
            Đăng nhập
          </Button>
        )}
        onSuccessSubmit={({ identifier, password }) =>
          triggerLogin({
            password,
            ...(identifier.includes('@') ? { email: identifier } : { phone: identifier }),
          })
        }
      />
      <div className="flex justify-end">
        <Button
          className="mt-2 h-max p-0! text-sm"
          variant="link"
          onClick={() => onForgotPassword?.()}
        >
          Quên mật khẩu?
        </Button>
      </div>
    </div>
  );
}
