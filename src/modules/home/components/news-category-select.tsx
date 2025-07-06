'use client';

import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/base/components/ui/button';
import { Card, CardContent, CardHeader } from '@/base/components/ui/card';

import { NewsCategory, newsCategory } from '../types';

interface NewsCategorySelectProps {
  category?: NewsCategory;
}

export function NewsCategorySelect({ category }: NewsCategorySelectProps) {
  const router = useRouter();

  const handleCategoryClick = (category: NewsCategory) => {
    const params = new URLSearchParams(window.location.search);
    params.set('category', category);
    router.push(`/news/all?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Chuyên mục</h2>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button
          variant={category === NewsCategory.NEWS ? 'danger' : 'outline'}
          onClick={() => handleCategoryClick(NewsCategory.NEWS)}
        >
          {category === NewsCategory.NEWS && <CheckIcon />}
          {newsCategory[NewsCategory.NEWS]}
        </Button>
        <Button
          variant={category === NewsCategory.HANDBOOK ? 'success' : 'outline'}
          onClick={() => handleCategoryClick(NewsCategory.HANDBOOK)}
        >
          {category === NewsCategory.HANDBOOK && <CheckIcon />}
          {newsCategory[NewsCategory.HANDBOOK]}
        </Button>
        <Button
          variant={category === NewsCategory.GUIDE ? 'warning' : 'outline'}
          onClick={() => handleCategoryClick(NewsCategory.GUIDE)}
        >
          {category === NewsCategory.GUIDE && <CheckIcon />}
          {newsCategory[NewsCategory.GUIDE]}
        </Button>
      </CardContent>
    </Card>
  );
}
