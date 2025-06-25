'use client';

import { Ref, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';

import { CreatePropertySchema, createPropertySchema } from '../types';
import { ModeSelector } from './mode-selector';

type Mode = 'fixed' | 'range';
type FormPayload = Pick<CreatePropertySchema, 'minPricePerMonth' | 'maxPricePerMonth'>;

type PricePerMonthFormProps = {
  ref?: Ref<UseFormReturn>;
  defaultValues?: FormPayload;
  loading?: boolean;
};

export function PricePerMonthForm({ ref, defaultValues, loading }: PricePerMonthFormProps) {
  const [mode, setMode] = useState<Mode>(
    defaultValues && defaultValues.minPricePerMonth !== defaultValues.maxPricePerMonth
      ? 'range'
      : 'fixed',
  );
  const [formKey, setFormKey] = useState(0);

  if (mode === 'fixed') {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Chế độ cho giá theo tháng:</span>
          <ModeSelector
            mode={mode}
            setMode={(mode) => {
              setMode(mode);
              setFormKey((prev) => prev + 1);
            }}
          />
        </div>
        <Form
          key={formKey}
          ref={ref}
          loading={loading}
          schema={createPropertySchema.pick({
            minPricePerMonth: true,
          })}
          defaultValues={defaultValues}
          fields={[
            {
              name: 'minPricePerMonth',
              type: 'text',
              label: 'Giá thuê/tháng',
              placeholder: 'Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000',
              render: ({ Label, Control, Description, Message }) => (
                <>
                  <Label />
                  <div
                    className={cn(
                      'border-input flex items-center rounded-md border transition-all',
                      'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                      'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                    )}
                    title="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                  >
                    <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                    <div className="flex h-full items-center border-l px-4 text-sm">VNĐ/tháng</div>
                  </div>
                  <Description />
                  <Message />
                </>
              ),
            },
          ]}
          onSuccessSubmit={() => {}}
          renderSubmitButton={() => <></>}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Chế độ cho giá theo tháng:</span>
        <ModeSelector
          mode={mode}
          setMode={(mode) => {
            setMode(mode);
            setFormKey((prev) => prev + 1);
          }}
        />
      </div>
      <Form
        key={formKey}
        ref={ref}
        loading={loading}
        defaultValues={defaultValues}
        className="grid grid-cols-2 gap-4"
        schema={createPropertySchema
          .pick({
            minPricePerMonth: true,
            maxPricePerMonth: true,
          })
          .superRefine(({ minPricePerMonth, maxPricePerMonth }, ctx) => {
            if (parseFloat(minPricePerMonth) >= parseFloat(maxPricePerMonth)) {
              ctx.addIssue({
                code: 'custom',
                message: 'Diện tích tối thiểu phải nhỏ hơn diện tích tối đa',
                path: ['minPricePerMonth'],
              });
              ctx.addIssue({
                code: 'custom',
                message: 'Diện tích tối thiểu phải nhỏ hơn diện tích tối đa',
                path: ['maxPricePerMonth'],
              });
            }
          })}
        fields={[
          {
            name: 'minPricePerMonth',
            type: 'text',
            label: 'Giá thuê/tháng (tối thiểu)',
            placeholder: 'Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000',
            render: ({ Label, Control, Description, Message }) => (
              <>
                <div className="flex items-center justify-between">
                  <Label />
                </div>
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                  )}
                  title="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                >
                  <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                  <div className="flex h-full items-center border-l px-4 text-sm">VNĐ/tháng</div>
                </div>
                <Description />
                <Message />
              </>
            ),
          },
          {
            name: 'maxPricePerMonth',
            type: 'text',
            label: 'Giá thuê/tháng (tối đa)',
            placeholder: 'Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000',
            render: ({ Label, Control, Description, Message }) => (
              <>
                <Label />
                <div
                  className={cn(
                    'border-input flex items-center rounded-md border transition-all',
                    'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                    'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                  )}
                  title="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                >
                  <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                  <div className="flex h-full items-center border-l px-4 text-sm">VNĐ/tháng</div>
                </div>
                <Description />
                <Message />
              </>
            ),
          },
        ]}
        onSuccessSubmit={() => {}}
        renderSubmitButton={() => <></>}
      />
    </div>
  );
}
