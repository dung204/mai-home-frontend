import { HttpClient } from '@/base/lib';
import { SuccessResponse } from '@/base/types';

import { Location, LocationSearchParams } from '../types';

class LocationService extends HttpClient {
  constructor() {
    super();
  }

  findAllCities(searchParams?: LocationSearchParams) {
    return this.get<SuccessResponse<Location[]>>('/location/cities', {
      params: searchParams,
    });
  }

  findAllDistricts(cityId: string, searchParams?: LocationSearchParams) {
    return this.get<SuccessResponse<Location[]>>(`/location/districts/${cityId}`, {
      params: searchParams,
    });
  }

  findAllWards(districtId: string, searchParams?: LocationSearchParams) {
    return this.get<SuccessResponse<Location[]>>(`/location/wards/${districtId}`, {
      params: searchParams,
    });
  }
}

export const locationService = new LocationService();
