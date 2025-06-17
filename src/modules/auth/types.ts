import { z } from 'zod';

import { SuccessResponse } from '@/base/types';

export const loginSchema = z.object({
  identifier: z.union(
    [
      z
        .string()
        .nonempty('Vui lòng nhập email hoặc số điện thoại hợp lệ')
        .email('Vui lòng nhập email hoặc số điện thoại hợp lệ'),
      z
        .string()
        .nonempty('Vui lòng nhập email hoặc số điện thoại hợp lệ')
        .regex(/(\+84|0[3|5|7|8|9]){1}([0-9]{8})\b/g, {
          message: 'Vui lòng nhập email hoặc số điện thoại hợp lệ',
        }),
    ],
    { message: 'Vui lòng nhập email hoặc số điện thoại hợp lệ' },
  ),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

export type LoginSchema = {
  email?: string;
  phone?: string;
  password: string;
};

export type LoginSuccessResponse = SuccessResponse<{
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    phone: string | null;
    displayName: string | null;
    avatar: string | null;
  };
}>;

export type RefreshTokenSuccessResponse = LoginSuccessResponse;

export const registerSchema = z.object({
  email: z.string().nonempty('Email không được để trống').email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

export type RegisterSchema = LoginSchema;

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

export const getOtpSchema = z.object({
  email: z.string().nonempty('Email không được để trống').email('Email không hợp lệ'),
});

export type GetOtpSchema = z.infer<typeof getOtpSchema>;

export const verifyOtpSchema = getOtpSchema.extend({
  otp: z
    .string()
    .length(6, 'Mã OTP phải có 6 ký tự')
    .regex(/^\d{6}$/, 'Mã OTP không hợp lệ'),
});

export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
