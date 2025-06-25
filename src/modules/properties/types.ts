import { z } from 'zod';

import { BaseEntity, CommonSearchParams, commonSearchParamsSchema } from '@/base/types';
import { Location } from '@/modules/location';

import { locationFormSchema } from '../location';
import { User } from '../users';

export enum PropertyCategory {
  ROOM = 'ROOM',
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  SHARED = 'SHARED',
}

export const propertyCategories = {
  [PropertyCategory.ROOM]: 'Phòng trọ',
  [PropertyCategory.APARTMENT]: 'Chung cư mini',
  [PropertyCategory.HOUSE]: 'Nhà nguyên căn',
  [PropertyCategory.SHARED]: 'Ở ghép',
};

export interface Property extends BaseEntity {
  title: string;
  description: string;
  owner: User;
  category: PropertyCategory;
  city: Location;
  district: Location;
  ward: Location;
  address: string;
  latitude: string;
  longitude: string;
  minPricePerMonth: string;
  maxPricePerMonth: string;
  minArea: string;
  maxArea: string;
  images: string[];
  videos: string[];
}

export const createPropertySchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(30, { message: 'Tiêu đề phải có tối thiểu 30 ký tự' }).max(100, {
      message: 'Tiêu đề không được vượt quá 100 ký tự',
    }),
    description: z.string().min(50, { message: 'Mô tả phải có tối thiểu 50 ký tự' }).max(5000, {
      message: 'Mô tả không được vượt quá 5000 ký tự',
    }),
    minPricePerMonth: z.string().refine((value) => parseInt(value) > 0, {
      message: 'Giá thuê/tháng phải là số dương',
    }),
    maxPricePerMonth: z.string().refine((value) => parseInt(value) > 0, {
      message: 'Giá thuê/tháng phải là số dương',
    }),
    minArea: z.string().refine((value) => parseInt(value) > 0, {
      message: 'Diện tích phải là số dương',
    }),
    maxArea: z.string().refine((value) => parseInt(value) > 0, {
      message: 'Diện tích phải là số dương',
    }),
    category: z.enum(
      [
        PropertyCategory.ROOM,
        PropertyCategory.HOUSE,
        PropertyCategory.APARTMENT,
        PropertyCategory.SHARED,
      ],
      { message: 'Vui lòng chọn một chuyên mục' },
    ),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    images: z.string().optional(),
    videos: z.string().optional(),
  })
  .merge(locationFormSchema);

export type CreatePropertySchema = z.infer<typeof createPropertySchema>;

export const updatePropertySchema = createPropertySchema.partial();

export type UpdatePropertySchema = z.infer<typeof updatePropertySchema>;

export const propertySearchParamsSchema = commonSearchParamsSchema
  .extend({
    category: z
      .enum([
        PropertyCategory.APARTMENT,
        PropertyCategory.HOUSE,
        PropertyCategory.ROOM,
        PropertyCategory.SHARED,
      ])
      .optional()
      .catch(undefined),
    city: z.string().optional().catch(undefined),
    district: z.string().optional().catch(undefined),
    ward: z.string().optional().catch(undefined),
    minPricePerMonth: z.coerce.number().optional().catch(undefined),
    maxPricePerMonth: z.coerce.number().optional().catch(undefined),
    minArea: z.coerce.number().optional().catch(undefined),
    maxArea: z.coerce.number().optional().catch(undefined),
  })
  .transform((val) => {
    return Object.fromEntries(
      Object.entries(val)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, typeof value === 'number' ? value.toString() : value]),
    );
  });

export interface PropertySearchParams extends CommonSearchParams {
  category?: PropertyCategory;
  owner?: string;
  city?: string;
  district?: string;
  ward?: string;
  minPricePerMonth?: string;
  maxPricePerMonth?: string;
  minArea?: string;
  maxArea?: string;
}
