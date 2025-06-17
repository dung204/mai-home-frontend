'use client';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { AlertCircleIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/base/components/ui/alert';
import { Button } from '@/base/components/ui/button';
import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';
import { UpdateUserSchema, updateUserSchema, userService } from '@/modules/users';

import { authService } from '../services/auth.service';
import { GetOtpSchema, VerifyOtpSchema, getOtpSchema, verifyOtpSchema } from '../types';

interface AuthFormProps {
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onLoginSuccess?: () => void;
}

export function AuthForm({ initialStep, onStepChange, onLoginSuccess }: AuthFormProps) {
  const [step, setStep] = useState(initialStep || 1);
  const [email, setEmail] = useState<string>();

  const { mutateAsync: triggerGetOtp, error: step1Error } = useMutation({
    mutationFn: (payload: GetOtpSchema) => authService.getOtp(payload),
    onSuccess: async (_, { email }) => {
      setEmail(email);
      setStep(2);
      onStepChange?.(2);
    },
  });

  const { mutateAsync: triggerVerifyOtp, error: step2Error } = useMutation({
    mutationFn: (payload: VerifyOtpSchema) => authService.verifyOtp(payload),
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

      onLoginSuccess?.();
    },
  });

  const { mutateAsync: triggerUpdateUser, error: step3Error } = useMutation({
    mutationFn: (payload: UpdateUserSchema) => userService.updateUserProfile(payload),
    onSuccess: async () => onLoginSuccess?.(),
  });

  switch (step) {
    case 1:
      return <AuthFormStep1 error={step1Error} onStepComplete={(data) => triggerGetOtp(data)} />;
    case 2:
      return (
        <AuthFormStep2
          error={step2Error}
          onStepComplete={({ otp }) => triggerVerifyOtp({ email: email!, otp })}
          onReturnToPreviousStep={() => {
            setStep(1);
            onStepChange?.(1);
          }}
        />
      );
    case 3:
      return (
        <AuthFormStep3 error={step3Error} onStepComplete={(data) => triggerUpdateUser(data)} />
      );
    default:
      return <div>Unknown step</div>;
  }
}

type AuthFormStep1Props = {
  error: Error | null;
  onStepComplete?: (data: { email: string }) => void;
};

function AuthFormStep1({ onStepComplete, error }: AuthFormStep1Props) {
  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể gửi mã OTP</AlertTitle>
          <AlertDescription>
            Đã xảy ra lỗi bất ngờ khi gửi mã OTP. Vui lòng thử lại sau.
          </AlertDescription>
        </Alert>
      )}
      <Form
        className="flex flex-col gap-4"
        schema={getOtpSchema}
        fields={[
          {
            name: 'email',
            type: 'text',
            placeholder: 'Email của bạn',
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
                  <MailIcon />
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

type AuthFormStep2Props = {
  error: Error | null;
  onStepComplete?: (data: { otp: string }) => void;
  onReturnToPreviousStep?: () => void;
};

function AuthFormStep2({ onStepComplete, onReturnToPreviousStep, error }: AuthFormStep2Props) {
  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể xác thực mã OTP</AlertTitle>
          <AlertDescription>
            {error instanceof AxiosError && error.status === HttpStatusCode.Unauthorized
              ? 'Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng gửi lại mã.'
              : 'Đã xảy ra lỗi bất ngờ khi xác thực mã OTP. Vui lòng thử lại sau.'}
          </AlertDescription>
        </Alert>
      )}
      <Form
        className="flex flex-col gap-4"
        schema={verifyOtpSchema.pick({ otp: true })}
        fields={[
          {
            name: 'otp',
            type: 'otp',
            render: ({ Control, Message }) => (
              <>
                <Control slotProps={{ className: 'text-xl' }} />
                <Message />
                <div>
                  <p className="text-center">
                    Không nhận được mã?{' '}
                    <Button type="button" variant="link" className="px-0! text-base">
                      Gửi lại mã
                    </Button>
                  </p>
                  <p className="text-center">
                    Không đúng email?{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="px-0! text-base"
                      onClick={onReturnToPreviousStep}
                    >
                      Đổi lại email
                    </Button>
                  </p>
                </div>
              </>
            ),
          },
        ]}
        renderSubmitButton={(Button) => (
          <Button size="lg" className="py-8 text-xl capitalize">
            Tiếp tục
          </Button>
        )}
        onSuccessSubmit={({ otp }) => onStepComplete?.({ otp })}
      />
    </div>
  );
}

type AuthFormStep3Props = {
  error: Error | null;
  onStepComplete?: (data: { displayName: string; phone: string }) => void;
};

function AuthFormStep3({ onStepComplete, error }: AuthFormStep3Props) {
  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="danger" className="bg-danger/10">
          <AlertCircleIcon />
          <AlertTitle>Không thể cập nhật thông tin</AlertTitle>
          <AlertDescription>
            Đã xảy ra lỗi bất ngờ khi gửi mã OTP. Vui lòng thử lại sau.
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
