'use client';

import { Form } from '@/base/components/ui/form';

import { changePasswordSchema } from '../types';

export function ChangePasswordForm() {
  return (
    <div className="space-y-2">
      <Form
        className="flex flex-col gap-4"
        schema={changePasswordSchema}
        fields={[
          {
            name: 'password',
            type: 'password',
            label: 'Mật khẩu hiện tại',
            placeholder: '',
          },
          {
            name: 'newPassword',
            type: 'password',
            label: 'Mật khẩu mới',
            placeholder: '',
          },
          {
            name: 'confirmPassword',
            type: 'password',
            label: 'Xác nhận mật khẩu mới',
            placeholder: '',
          },
        ]}
        renderSubmitButton={(SubmitButton) => <SubmitButton>Cập nhật</SubmitButton>}
        onSuccessSubmit={(_) => {}}
      />
    </div>
  );
}
