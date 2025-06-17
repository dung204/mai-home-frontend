import { z } from 'zod';

import { BaseEntity, commonSearchParamsSchema } from '@/base/types';

export interface Location extends BaseEntity {
  name: string;
}

export const locationSearchParamsSchema = commonSearchParamsSchema.extend({
  name: z.string().optional(),
});

export type LocationSearchParams = z.infer<typeof locationSearchParamsSchema>;

export const locationFormSchema = z.object({
  cityId: z.string().min(1, { message: 'Vui lòng chọn thành phố' }),
  districtId: z.string().min(1, { message: 'Vui lòng chọn quận/huyện' }),
  wardId: z.string().min(1, { message: 'Vui lòng chọn phường/xã' }),
  address: z.string().nonempty({ message: 'Địa chỉ không được để trống' }),
});

export type LocationFormPayload = z.infer<typeof locationFormSchema>;
