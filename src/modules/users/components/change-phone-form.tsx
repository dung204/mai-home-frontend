'use client';

import { z } from 'zod';

import { Form } from '@/base/components/ui/form';
import { StringUtils } from '@/base/utils';

export function ChangePhoneForm() {
  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        schema={z.object({
          phone: z
            .string()
            .nonempty('Số điện thoại không được để trống')
            .refine((val) => val.match(StringUtils.PHONE_REGEX), 'Số điện thoại không hợp lệ'),
        })}
        fields={[
          {
            name: 'phone',
            type: 'text',
            label: 'Số điện thoại mới',
            placeholder: '',
          },
        ]}
        renderSubmitButton={(SubmitButton) => <SubmitButton>Cập nhật</SubmitButton>}
        onSuccessSubmit={(_) => {}}
      />
    </div>
  );
}
