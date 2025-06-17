import type { Order } from './order.type';
import type { Pagination } from './pagination.type';

export type SuccessResponse<T> = T extends unknown[]
  ? {
      data: T;
      metadata: {
        pagination: Pagination;
        order: Order[];
        filters: Record<string, unknown>;
      };
    }
  : { data: T };
