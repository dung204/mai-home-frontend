'use client';

import { FilePlus2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

import { Button } from '@/base/components/ui/button';
import { useAuthDialog } from '@/base/providers';
import { User } from '@/modules/users';

interface NewPropertyButtonProps {
  user: Omit<User, 'createTimestamp' | 'updateTimestamp' | 'deleteTimestamp'> | undefined;
  onClick?: ComponentProps<typeof Button>['onClick'];
}

export function NewPropertyButton({ user, onClick }: NewPropertyButtonProps) {
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
      onClick={(e) => {
        if (!user) {
          handleOpenAuthDialog();
          onClick?.(e);
          return;
        }

        handleNavigation();
        onClick?.(e);
      }}
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
