import { AllNewsPage } from '@/modules/home';
import { NewsSearchParams, newsSearchParams } from '@/modules/home/types';

interface PageProps {
  searchParams: Promise<NewsSearchParams>;
}

export default async function Page({ searchParams }: PageProps) {
  const validatedSearchParams = newsSearchParams.parse(await searchParams);

  return <AllNewsPage searchParams={validatedSearchParams} />;
}
