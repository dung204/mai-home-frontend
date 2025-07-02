import { z } from 'zod';

import { baseEntitySchema } from '@/base/types';

export const userSchema = baseEntitySchema.extend({
  email: z.string().nullable(),
  phone: z.string().nullable(),
  avatar: z.string().nullable(),
  displayName: z
    .string()
    .transform((val) => decodeURIComponent(val))
    .nullable(),
  googleId: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  displayName: z.string().nonempty('Tên liên lạc không được để trống').optional(),
  email: z.union([z.literal(''), z.string().email('Email không hợp lệ')]).optional(),
  phone: z
    .string()
    .nonempty('Số điện thoại không được để trống')
    .regex(/(0[3579]){1}[0-9]{8}\b/g, 'Số điện thoại không hợp lệ')
    .optional(),
  avatar: z
    .object({
      file: z.any(),
      previewUrl: z.string(),
    })
    .optional(),
});

export type UpdateUserSchema = {
  displayName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};
