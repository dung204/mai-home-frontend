'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AlertCircleIcon, LockIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/base/components/ui/alert';
import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';
import { UpdateUserSchema, updateUserSchema, userService } from '@/modules/users';

import { authService } from '../services/auth.service';
import { LoginSchema, RegisterSchema, loginSchema } from '../types';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
  onStepChange?: (step: number) => void;
}

export function RegisterForm({ onRegisterSuccess, onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState(1);
  const [registerData, setRegisterData] = useState<Partial<LoginSchema>>({});

  const { mutateAsync: triggerRegister, error: step2Error } = useMutation({
    mutationFn: (payload: RegisterSchema) => authService.register(payload),
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

      if (!data.user.phone && !data.user.displayName) {
        setStep(3);
        onStepChange?.(3);
        return;
      }

      if (!data.user.displayName) {
        setStep(3.1);
        onStepChange?.(3.1);
        return;
      }

      onRegisterSuccess?.();
    },
  });

  const { mutateAsync: triggerUpdateUser, error: step3Error } = useMutation({
    mutationFn: (payload: UpdateUserSchema) => userService.updateUserProfile(payload),
    onSuccess: async () => onRegisterSuccess?.(),
  });

  switch (step) {
    case 1:
      return (
        <RegisterStep1
          onStepComplete={({ identifier }) => {
            setRegisterData((prev) => ({
              ...prev,
              ...(identifier.includes('@') ? { email: identifier } : { phone: identifier }),
            }));
            setStep(2);
          }}
        />
      );
    case 2:
      return (
        <RegisterStep2
          error={step2Error}
          onStepComplete={({ password }) => {
            triggerRegister({
              ...registerData,
              password,
            });
          }}
        />
      );
    case 3:
      return (
        <RegisterFormStep3 error={step3Error} onStepComplete={(data) => triggerUpdateUser(data)} />
      );
    case 3.1:
      return (
        <RegisterFormStep31
          error={step3Error}
          onStepComplete={(data) => {
            triggerUpdateUser(data);
          }}
        />
      );
    default:
      return <div>Unknown step</div>;
  }
}

function RegisterStep1({
  onStepComplete,
}: {
  onStepComplete?: (data: { identifier: string }) => void;
}) {
  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        schema={loginSchema.pick({
          identifier: true,
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

type RegisterStep2Props = {
  error?: Error | null;
  onStepComplete?: (data: { password: string }) => void;
};

function RegisterStep2({ onStepComplete }: RegisterStep2Props) {
  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        schema={z
          .object({
            password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
            confirmPassword: z.string().nonempty('Mật khẩu xác nhận không được để trống'),
          })
          .refine(({ password, confirmPassword }) => password === confirmPassword, {
            message: 'Mật khẩu xác nhận không khớp với mật khẩu mới',
            path: ['confirmPassword'],
          })}
        fields={[
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
        onSuccessSubmit={({ password }) => onStepComplete?.({ password })}
      />
    </div>
  );
}

type RegisterFormStep3Props = {
  error?: Error | null;
  onStepComplete?: (data: { displayName: string; phone: string }) => void;
};

function RegisterFormStep3({ onStepComplete, error }: RegisterFormStep3Props) {
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

type RegisterFormStep31Props = {
  error?: Error | null;
  onStepComplete?: (data: { displayName: string }) => void;
};

function RegisterFormStep31({ onStepComplete, error }: RegisterFormStep31Props) {
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
