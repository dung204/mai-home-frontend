'use client';

import { PhoneIcon } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';

// TODO: define other steps

interface ForgotPasswordProps {
  onRegisterSuccess?: () => void;
}

export function ForgotPasswordForm({}: ForgotPasswordProps) {
  const [step, setStep] = useState(1);
  const [_, setRegisterData] = useState<Record<string, unknown>>({});

  switch (step) {
    case 1:
      return (
        <ForgotPasswordStep1
          onStepComplete={(data) => {
            setRegisterData((prev) => ({ ...prev, ...data }));
            setStep(2);
          }}
        />
      );
    default:
      return <div>Unknown step</div>;
  }
}

function ForgotPasswordStep1({
  onStepComplete,
}: {
  onStepComplete?: (data: { phone: string }) => void;
}) {
  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        schema={z.object({
          phone: z.string().length(10, 'Số điện thoại không hợp lệ'),
        })}
        fields={[
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
