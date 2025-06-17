import { AsyncSelectProps } from '@/base/components/ui/async-select';
import { CommonSearchParams } from '@/base/types';

import { locationService } from '../services/location.service';
import { LocationSearchParams } from '../types';
import { Location } from '../types';

export function getCitiesAsyncSelectOptions(
  searchBy: Exclude<keyof LocationSearchParams, keyof CommonSearchParams | 'sorting'>,
): Omit<AsyncSelectProps<Location>, 'value' | 'onChange'> {
  return {
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: (searchTerm) =>
      !searchTerm ? ['cities', 'all'] : ['cities', 'all', { [searchBy]: searchTerm }],
    queryFn: (searchTerm, page) =>
      locationService.findAllCities({ [searchBy]: searchTerm, page, order: 'name:asc' }),
    getDisplayValue: (city) => city.name,
    getOptionValue: (location) => location.id,
    placeholder: 'Chọn Tỉnh/Thành phố',
    label: 'Tỉnh/Thành phố',
    renderOption: (location) => <div>{location.name}</div>,
    staleTime: Infinity,
  };
}

export function getDistrictsAsyncSelectOptions(
  cityId: string | undefined,
  searchBy: Exclude<keyof LocationSearchParams, keyof CommonSearchParams | 'sorting'>,
): Omit<AsyncSelectProps<Location>, 'value' | 'onChange'> {
  return {
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: (searchTerm) =>
      !searchTerm
        ? ['districts', 'all', { cityId }]
        : ['districts', 'all', { cityId, [searchBy]: searchTerm }],
    queryFn: (searchTerm, page) =>
      locationService.findAllDistricts(cityId ?? '', { [searchBy]: searchTerm, page }),
    getDisplayValue: (city) => city.name,
    getOptionValue: (location) => location.id,
    placeholder: 'Chọn Quận/Huyện',
    label: 'Quận/Huyện',
    renderOption: (location) => <div>{location.name}</div>,
    staleTime: Infinity,
    enabled: cityId !== undefined && cityId !== '',
  };
}

export function getWardsAsyncSelectOptions(
  districtId: string | undefined,
  searchBy: Exclude<keyof LocationSearchParams, keyof CommonSearchParams | 'sorting'>,
): Omit<AsyncSelectProps<Location>, 'value' | 'onChange'> {
  return {
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: (searchTerm) =>
      !searchTerm
        ? ['wards', 'all', { districtId }]
        : ['wards', 'all', { districtId, [searchBy]: searchTerm }],
    queryFn: (searchTerm, page) =>
      locationService.findAllWards(districtId ?? '', { [searchBy]: searchTerm, page }),
    getDisplayValue: (city) => city.name,
    getOptionValue: (location) => location.id,
    placeholder: 'Chọn Phường/Xã',
    label: 'Phường/Xã',
    renderOption: (location) => <div>{location.name}</div>,
    staleTime: Infinity,
    enabled: districtId !== undefined && districtId !== '',
  };
}
