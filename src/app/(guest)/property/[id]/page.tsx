import { PropertyDetailsPage } from '@/modules/properties';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <PropertyDetailsPage id={id} />;
}
