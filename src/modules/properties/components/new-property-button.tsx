'use client';

import { FilePlus2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/base/components/ui/button';
import { useAuthDialog } from '@/base/providers';
import { User } from '@/modules/users';

interface NewPropertyButtonProps {
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
}

export function NewPropertyButton({ user }: NewPropertyButtonProps) {
  const { setOpen, setMode, setVersion } = useAuthDialog();
  const router = useRouter();

  const handleOpenAuthDialog = () => {
    setVersion((prev) => prev + 1);
    setMode('login');
    setOpen(true);
  };

  const handleNavigation = () => {
    router.push('/user/properties/new');
  };

  return (
    <Button
      size="lg"
      className="p-7! text-xl! font-semibold"
      onClick={!user ? handleOpenAuthDialog : handleNavigation}
    >
      <FilePlus2Icon className="size-6" />
      Đăng tin ngay
    </Button>
  );
}

export function NewPropertyButtonSkeleton() {
  return (
    <Button size="lg" className="p-7! text-xl! font-semibold">
      <FilePlus2Icon className="size-6" />
      <span>Đăng tin ngay</span>
    </Button>
  );
}
