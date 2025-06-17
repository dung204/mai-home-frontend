import { envClient } from '@/base/config/env-client.config';
import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';

import {
  CreatePropertySchema,
  Property,
  PropertySearchParams,
  UpdatePropertySchema,
} from '../types';

class PropertiesService extends HttpClient {
  constructor() {
    super();
  }

  public getAllProperties(searchParams?: PropertySearchParams) {
    return this.get<SuccessResponse<Property[]>>(`/properties`, {
      params: searchParams,
    });
  }

  public getAllDeletedProperties(searchParams?: PropertySearchParams) {
    return this.get<SuccessResponse<Property[]>>(`/properties/deleted`, {
      params: searchParams,
      isPrivateRoute: true,
    });
  }

  public getPropertyById(id: string) {
    return this.get<SuccessResponse<Property>>(`/properties/${id}`, {
      baseURL: envClient.NEXT_PUBLIC_API_URL,
    });
  }

  public createProperty(payload: CreatePropertySchema) {
    return this.post<SuccessResponse<Property>>('/properties', payload, {
      isPrivateRoute: true,
    });
  }

  public updateProperty({ id, payload }: { id: string; payload: UpdatePropertySchema }) {
    return this.patch<SuccessResponse<Property>>(`/properties/${id}`, payload, {
      isPrivateRoute: true,
    });
  }

  public deleteProperty(id: string) {
    return this.delete(`/properties/${id}`, {
      isPrivateRoute: true,
    });
  }

  public restoreProperty(id: string) {
    return this.patch(`/properties/restore/${id}`, {
      isPrivateRoute: true,
    });
  }
}

export const propertiesService = new PropertiesService();
