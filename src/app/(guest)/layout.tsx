import { HeadsetIcon } from 'lucide-react';
import Image from 'next/image';
import { PropsWithChildren, Suspense } from 'react';

import { Footer } from '@/base/components/layout/footer';
import { DehydratedHeader, Header } from '@/base/components/layout/header';
import { Card, CardContent } from '@/base/components/ui/card';
import { ScrollArea } from '@/base/components/ui/scroll-area';
import { ScrollToTopButton } from '@/base/components/ui/scroll-to-top-button';
import { AuthDialogProvider } from '@/base/providers';

// eslint-disable-next-line camelcase
export const experimental_ppr = true;

export default async function GuestLayout({ children }: PropsWithChildren) {
  return (
    <AuthDialogProvider>
      <div className="flex h-screen flex-col">
        <Suspense fallback={<DehydratedHeader />}>
          <Header />
        </Suspense>
        <ScrollArea className="app-scroll-area grow">
          <main className="absolute inset-0">
            <div className="bg-primary/10 flex flex-col gap-16">
              {children}
              <div className="container m-auto flex flex-col gap-16 pb-16 xl:max-w-6xl!">
                <Card>
                  <CardContent className="flex items-center justify-center xl:gap-10">
                    <picture>
                      <source srcSet="about:blank" media="(max-width: 1024px)" />
                      <Image
                        src="/contact-banner.png"
                        alt="contact banner"
                        width={376}
                        height={458}
                        className="max-lg:hidden"
                      />
                    </picture>
                    <div className="flex size-full flex-col items-center justify-center gap-8">
                      <HeadsetIcon className="size-16" />
                      <h2 className="text-2xl font-semibold">Hỗ Trợ Chủ Nhà Đăng Tin</h2>
                      <p>Nếu bạn cần hỗ trợ đăng tin, vui lòng liên hệ số điện thoại bên dưới:</p>
                      <div className="flex w-full justify-center gap-10 max-sm:flex-col">
                        <div className="bg-primary h-14 rounded-xl sm:w-1/3"></div>
                        <div className="h-14 rounded-xl bg-[#2175BE] sm:w-1/3"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="bg-primary/55">
              <div className="container m-auto xl:max-w-6xl!">
                <Footer />
              </div>
            </div>
          </main>
          <ScrollToTopButton />
        </ScrollArea>
      </div>
    </AuthDialogProvider>
  );
}
