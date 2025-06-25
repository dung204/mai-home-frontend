import { StringUtils } from '@/base/utils';

import { Property } from '../types';

export class PropertiesUtils {
  static getPricePerMonth(property: Property) {
    if (property.minPricePerMonth === property.maxPricePerMonth) {
      return StringUtils.formatCurrency(property.minPricePerMonth);
    }

    return `Từ ${StringUtils.formatCurrency(property.minPricePerMonth)} đến ${StringUtils.formatCurrency(property.maxPricePerMonth)}`;
  }

  static getArea(property: Property) {
    if (property.minArea === property.maxArea) {
      return `${property.minArea} m²`;
    }

    return `Từ ${property.minArea} m² đến ${property.maxArea} m²`;
  }

  static getFullAddress(property: Property) {
    return `${property.address}, ${property.ward.name}, ${property.district.name}, ${property.city.name}`;
  }

  static getCreateTimestampInDaysOffset(property: Property) {
    return new Intl.RelativeTimeFormat('vi-VN', { numeric: 'auto' })
      .format(
        Math.round((new Date(property.createTimestamp).getTime() - Date.now()) / 86400000),
        'days',
      )
      .toLocaleLowerCase('vi-VN');
  }
}
