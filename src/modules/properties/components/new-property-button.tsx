'use client';

import { FilePlus2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/base/components/ui/button';
import { useAuthDialog } from '@/base/providers';
import { useUser } from '@/modules/users';

export function NewPropertyButton() {
  const { data, error, isLoading } = useUser();
  const { setOpen, setMode, setVersion } = useAuthDialog();
  const router = useRouter();

  if (isLoading) {
    return <NewPropertyButtonSkeleton />;
  }

  const handleOpenAuthDialog = () => {
    if (isLoading) return;

    setVersion((prev) => prev + 1);
    setMode('login');
    setOpen(true);
  };

  const handleNavigation = () => {
    if (isLoading) return;

    router.push('/user/properties/new');
  };

  return (
    <Button
      size="lg"
      className="p-7! text-xl! font-semibold"
      onClick={error || !data || !data.data ? handleOpenAuthDialog : handleNavigation}
    >
      <FilePlus2Icon className="size-6" />
      Đăng tin ngay
    </Button>
  );
}

function NewPropertyButtonSkeleton() {
  return (
    <Button size="lg" className="p-7! text-xl! font-semibold">
      <FilePlus2Icon className="size-6" />
      <span className="animate-pulse">Đăng tin ngay</span>
    </Button>
  );
}
