'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/base/components/ui/dialog';

import { ForgotPasswordForm } from './forgot-password-form';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

interface AuthDialogProps extends ComponentProps<typeof Dialog> {
  initialMode?: 'login' | 'register' | 'forgot-password';
}

export function AuthDialog({ initialMode, ...props }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(
    initialMode ?? 'login',
  );

  return (
    <Dialog {...props}>
      <DialogContent className="max-w-4xl! overflow-hidden p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{getTitle(mode)}</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <div className="flex">
          <Image src="/auth-banner.png" alt="auth banner" width={410} height={855} />
          <div className="flex grow flex-col justify-between p-8">
            <div className="flex w-full flex-col">
              <p className="text-xl font-medium">Xin chào bạn</p>
              <h2 className="text-2xl font-bold capitalize">{getTitle(mode)}</h2>
              <section className="mt-6 mb-2">{renderForm(mode, setMode)}</section>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="border-border w-full border"></div>
                  <p className="text-muted-foreground text-lg font-medium">Hoặc</p>
                  <div className="border-border w-full border"></div>
                </div>
                <Button variant="outline" size="lg" className="gap-4 py-8 text-base">
                  <Image src="/facebook-logo.svg" alt="Facebook logo" width={34} height={34} />
                  Đăng nhập với Facebook
                </Button>
                <Button variant="outline" size="lg" className="gap-4 py-8 text-base">
                  <Image src="/google-logo.svg" alt="Google logo" width={34} height={34} />
                  Đăng nhập với Google
                </Button>
                <p className="text-center text-xs">
                  Bằng việc tiếp tục, bạn đồng ý với{' '}
                  <Link href="#" className="text-primary cursor-pointer hover:underline">
                    Điều khoản sử dụng
                  </Link>
                  ,{' '}
                  <Link href="#" className="text-primary cursor-pointer hover:underline">
                    Chính sách bảo mật
                  </Link>
                  ,{' '}
                  <Link href="#" className="text-primary cursor-pointer hover:underline">
                    Quy chế
                  </Link>
                  ,{' '}
                  <Link href="#" className="text-primary cursor-pointer hover:underline">
                    Chính sách
                  </Link>{' '}
                  của chúng tôi.
                </p>
              </div>
            </div>
            <p className="text-center text-lg font-bold">
              {mode === 'login' ? (
                <>
                  Bạn chưa có tài khoản?{' '}
                  <span
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => setMode('register')}
                  >
                    Đăng ký
                  </span>
                </>
              ) : (
                <>
                  Bạn đã có tài khoản?{' '}
                  <span
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Đăng nhập
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function renderForm(
  mode: 'login' | 'register' | 'forgot-password',
  setMode: (mode: 'login' | 'register' | 'forgot-password') => void,
) {
  switch (mode) {
    case 'login':
      return <LoginForm onForgotPassword={() => setMode('forgot-password')} />;
    case 'register':
      return <RegisterForm />;
    case 'forgot-password':
      return <ForgotPasswordForm />;
    default:
      return null;
  }
}

function getTitle(mode: 'login' | 'register' | 'forgot-password') {
  switch (mode) {
    case 'login':
      return 'Đăng nhập để tiếp tục';
    case 'register':
      return 'Đăng ký tài khoản mới';
    case 'forgot-password':
      return 'Khôi phục mật khẩu';
    default:
      return '';
  }
}
