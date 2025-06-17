import { z } from 'zod';

export const commonSearchParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1).catch(1).optional(),
  pageSize: z.coerce.number().int().positive().default(10).catch(10).optional(),
  order: z.string().optional(),
});

export type CommonSearchParams = z.infer<typeof commonSearchParamsSchema>;
