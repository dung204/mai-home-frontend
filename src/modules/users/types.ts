import { z } from 'zod';

import { baseEntitySchema } from '@/base/types';

export const userSchema = baseEntitySchema.extend({
  email: z.string(),
  phone: z.string().nullable(),
  avatar: z.string().nullable(),
  displayName: z
    .string()
    .transform((val) => decodeURIComponent(val))
    .nullable(),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  displayName: z.string().optional(),
  email: z.string().email('Email không hợp lệ').optional(),
  phone: z
    .string()
    .regex(/(0[3579]){1}[0-9]{8}\b/g, 'Số điện thoại không hợp lệ')
    .optional(),
  avatar: z.string().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
