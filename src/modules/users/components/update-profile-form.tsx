'use client';

import Image from 'next/image';
import { z } from 'zod';

import { Button } from '@/base/components/ui/button';
import { Form } from '@/base/components/ui/form';

export function UpdateProfileForm() {
  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        schema={z.object({
          displayName: z.string().nonempty('Tên liên lạc không được để trống'),
          address: z.string().optional(),
        })}
        fields={[
          {
            name: 'displayName',
            type: 'text',
            label: 'Tên liên lạc',
            placeholder: '',
          },
          {
            name: 'address',
            type: 'text',
            label: 'Địa chỉ',
            placeholder: '',
          },
        ]}
        renderSubmitButton={(SubmitButton) => (
          <>
            <Button type="button" variant="outline" className="w-full">
              <Image src="/facebook-logo.svg" alt="Facebook logo" width={24} height={24} />
              Liên kết tài khoản với với Facebook
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <Image src="/google-logo.svg" alt="Google logo" width={24} height={24} />
              Đăng nhập với Google
            </Button>
            <SubmitButton>Cập nhật</SubmitButton>
          </>
        )}
        onSuccessSubmit={(_) => {}}
      />
    </div>
  );
}
