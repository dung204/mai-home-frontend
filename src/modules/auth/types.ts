import { z } from 'zod';

import { SuccessResponse } from '@/base/types';

export const loginSchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type LoginSuccessResponse = SuccessResponse<{
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    avatar: string | null;
    description: string | null;
  };
}>;

export type RefreshTokenSuccessResponse = LoginSuccessResponse;

export const registerSchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().min(8),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const changePasswordSchema = z
  .object({
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    newPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: z.string().nonempty('Mật khẩu xác nhận không được để trống'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp với mật khẩu mới',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
