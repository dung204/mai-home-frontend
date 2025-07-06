import { ComponentProps } from 'react';

import { Badge } from '@/base/components/ui/badge';

import { NewsCategory, newsCategory } from '../types';

interface NewsCategoryBadgeProps {
  category: NewsCategory;
}

export function NewsCategoryBadge({ category }: NewsCategoryBadgeProps) {
  let variant: ComponentProps<typeof Badge>['variant'];

  switch (category) {
    case NewsCategory.NEWS:
      variant = 'danger';
      break;
    case NewsCategory.HANDBOOK:
      variant = 'success';
      break;
    case NewsCategory.GUIDE:
      variant = 'warning';
      break;
    default:
      variant = 'default';
  }

  return <Badge variant={variant}>{newsCategory[category]}</Badge>;
}
