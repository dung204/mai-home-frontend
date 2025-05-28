'use client';

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import { AuthDialog } from '@/modules/auth';

type AuthDialogContextValue = {
  setMode: (mode: 'login' | 'register') => void;
  setOpen: (open: boolean) => void;
  setVersion: Dispatch<SetStateAction<number>>;
};

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function AuthDialogProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(0);

  return (
    <AuthDialogContext.Provider value={{ setOpen, setMode, setVersion }}>
      {children}
      <AuthDialog open={open} onOpenChange={setOpen} initialMode={mode} key={version} />
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);

  if (!context) {
    throw new Error('useAuthDialog must be used within an AuthDialogProvider');
  }

  return context;
}
