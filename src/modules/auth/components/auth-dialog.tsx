'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps, useState } from 'react';

import { Button } from '@/base/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/base/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent } from '@/base/components/ui/drawer';
import { useIsMobile } from '@/base/hooks';

import { AuthUtils } from '../utils/auth.utils';
import { ForgotPasswordForm } from './forgot-password-form';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

interface AuthDialogProps extends ComponentProps<typeof Dialog> {
  mode?: 'login' | 'register' | 'forgot-password';
  onModeChange?: (mode: 'login' | 'register') => void;
  step?: number;
  onStepChange?: (step: number) => void;
  defaultValues?: Record<string, unknown>;
  onSuccess?: () => void;
}

export function AuthDialog({
  mode: initialMode,
  step: initialStep,
  onStepChange,
  onModeChange,
  defaultValues,
  onSuccess,
  ...props
}: AuthDialogProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(
    initialMode ?? 'login',
  );
  const [step, setStep] = useState(initialStep ?? 1);

  if (isMobile) {
    return (
      <Drawer open={props.open} onOpenChange={props.onOpenChange}>
        <DrawerContent className="h-[100dvh] pb-8">
          <div className="flex grow flex-col justify-between p-8 pb-4">
            <div className="flex w-full flex-col">
              <p className="text-xl font-medium">Xin chào bạn</p>
              <h2 className="text-2xl font-bold capitalize">{getTitle(mode, step)}</h2>
              <section className="mt-6 mb-2">
                {(() => {
                  switch (mode) {
                    case 'login':
                      return (
                        <LoginForm
                          onForgotPassword={() => setMode('forgot-password')}
                          onLoginSuccess={() => {
                            onSuccess?.();
                            router.replace(
                              new URL(window.location.pathname, window.location.origin).href,
                            );
                          }}
                          defaultValues={defaultValues}
                        />
                      );
                    case 'register':
                      return (
                        <RegisterForm
                          onRegisterSuccess={() => {
                            onSuccess?.();
                            router.replace(
                              new URL(window.location.pathname, window.location.origin).href,
                            );
                          }}
                          step={step}
                          onStepChange={(step) => {
                            setStep(step);
                            onStepChange?.(step);
                          }}
                          defaultValues={defaultValues}
                        />
                      );
                    case 'forgot-password':
                      return <ForgotPasswordForm />;
                    default:
                      return null;
                  }
                })()}
              </section>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="border-border w-full border"></div>
                  <p className="text-muted-foreground text-lg font-medium">Hoặc</p>
                  <div className="border-border w-full border"></div>
                </div>
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
                    onClick={() => {
                      setMode('register');
                      onModeChange?.('register');
                    }}
                  >
                    Đăng ký
                  </span>
                </>
              ) : (
                <>
                  Bạn đã có tài khoản?{' '}
                  <span
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => {
                      setMode('login');
                      onModeChange?.('login');
                    }}
                  >
                    Đăng nhập
                  </span>
                </>
              )}
            </p>
          </div>
          <DrawerClose className="px-8">
            <Button className="w-full">Đóng</Button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog {...props}>
      <DialogContent className="max-w-4xl! overflow-hidden p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{getTitle(mode, step)}</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <div className="flex">
          <Image src="/auth-banner.png" alt="auth banner" width={410} height={855} />
          <div className="flex grow flex-col justify-between p-8">
            <div className="flex w-full flex-col">
              <p className="text-xl font-medium">Xin chào bạn</p>
              <h2 className="text-2xl font-bold capitalize">{getTitle(mode, step)}</h2>
              <section className="mt-6 mb-2">
                {(() => {
                  switch (mode) {
                    case 'login':
                      return (
                        <LoginForm
                          onForgotPassword={() => setMode('forgot-password')}
                          onLoginSuccess={() => {
                            onSuccess?.();
                            window.location.replace(
                              new URL(window.location.pathname, window.location.origin).href,
                            );
                          }}
                          defaultValues={defaultValues}
                        />
                      );
                    case 'register':
                      return (
                        <RegisterForm
                          onRegisterSuccess={() => {
                            onSuccess?.();
                            window.location.replace(
                              new URL(window.location.pathname, window.location.origin).href,
                            );
                          }}
                          step={step}
                          onStepChange={(step) => {
                            setStep(step);
                            onStepChange?.(step);
                          }}
                          defaultValues={defaultValues}
                        />
                      );
                    case 'forgot-password':
                      return <ForgotPasswordForm />;
                    default:
                      return null;
                  }
                })()}
              </section>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="border-border w-full border"></div>
                  <p className="text-muted-foreground text-lg font-medium">Hoặc</p>
                  <div className="border-border w-full border"></div>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-4 py-8 text-base"
                  onClick={() => AuthUtils.redirectToGoogleLoginPage()}
                >
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
                    onClick={() => {
                      setMode('register');
                      onModeChange?.('register');
                    }}
                  >
                    Đăng ký
                  </span>
                </>
              ) : (
                <>
                  Bạn đã có tài khoản?{' '}
                  <span
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => {
                      setMode('login');
                      onModeChange?.('login');
                    }}
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

function getTitle(mode: 'login' | 'register' | 'forgot-password', step: number) {
  switch (mode) {
    case 'login':
      return 'Đăng nhập để tiếp tục';
    case 'register':
      if (step === 1) {
        return 'Đăng ký tài khoản mới';
      }
      return 'Hoàn tất thông tin để tiếp tục';
    case 'forgot-password':
      return 'Khôi phục mật khẩu';
    default:
      return '';
  }
}
