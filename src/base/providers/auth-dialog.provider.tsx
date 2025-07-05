'use client';

import { useRouter } from 'next/navigation';
import {
  ComponentProps,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { AuthDialog } from '@/modules/auth';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';

type AuthDialogContextValue = {
  setMode: (mode: 'login' | 'register') => void;
  setOpen: (open: boolean) => void;
  setStep: (step: number) => void;
  setDefaultValues: Dispatch<SetStateAction<Record<string, unknown>>>;
  setVersion: Dispatch<SetStateAction<number>>;
};

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function AuthDialogProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [confirmExitRegisterDialogOpen, setConfirmExitRegisterDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [version, setVersion] = useState(0);
  const [defaultValues, setDefaultValues] = useState<Record<string, unknown>>({});

  const handleOpenChange = (open: boolean) => {
    if (!open && mode === 'register' && (step === 2 || step === 2.1)) {
      setConfirmExitRegisterDialogOpen(true);
      return;
    }

    setOpen(open);
  };

  return (
    <AuthDialogContext.Provider value={{ setOpen, setMode, setVersion, setStep, setDefaultValues }}>
      {children}
      <AuthDialog
        open={open}
        onOpenChange={handleOpenChange}
        mode={mode}
        onModeChange={setMode}
        step={step}
        onStepChange={(step) => {
          setStep(step);
          router.refresh();
        }}
        defaultValues={defaultValues}
        onSuccess={() => setOpen(false)}
        key={version}
      />
      <ConfirmExitRegisterDialog
        open={confirmExitRegisterDialogOpen}
        onOpenChange={setConfirmExitRegisterDialogOpen}
        onExit={() => {
          setConfirmExitRegisterDialogOpen(false);
          setOpen(false);
          router.push(new URL('/', window.location.origin).href);
        }}
      />
    </AuthDialogContext.Provider>
  );
}

interface ConfirmExitRegisterDialogProps extends ComponentProps<typeof AlertDialog> {
  onExit?: () => void;
}

function ConfirmExitRegisterDialog({ onExit, ...props }: ConfirmExitRegisterDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc muốn thoát đăng ký?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn cần phải điền tên đầy đủ và số điện thoại để có thể đăng bài. Nếu bạn thoát, bạn có
            thể bổ sung thông thông tin trong phần Quản lý tài khoản.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tiếp tục đăng ký</AlertDialogCancel>
          <AlertDialogAction onClick={() => onExit?.()}>Thoát</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);

  if (!context) {
    throw new Error('useAuthDialog must be used within an AuthDialogProvider');
  }

  return context;
}
