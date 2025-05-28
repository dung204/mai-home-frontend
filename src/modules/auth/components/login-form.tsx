'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'lucide-react';

import { Button } from '@/base/components/ui/button';
import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';
import { LoginSchema, loginSchema } from '@/modules/auth/types';

import { authService } from '../services/auth.service';

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
}

export function LoginForm({ onLoginSuccess, onForgotPassword }: LoginFormProps) {
  const { mutateAsync: triggerLogin, isPending } = useMutation({
    mutationFn: (payload: LoginSchema) => authService.login(payload),
    onSuccess: async ({ data }) => {
      await axios.post('/api/auth/set-cookie', { data });
      onLoginSuccess?.();
    },
  });

  const i18nNamespace = 'modules.auth.components.LoginForm';

  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        i18nNamespace={i18nNamespace}
        schema={loginSchema}
        fields={[
          {
            name: 'email',
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
                <Control classNames={{ container: 'py-2', input: 'text-base!' }} />
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
        onSuccessSubmit={(data) => triggerLogin(data)}
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
