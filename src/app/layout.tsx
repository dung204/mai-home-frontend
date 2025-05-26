import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { ScrollArea } from '@/base/components/ui/scroll-area';
import { ScrollToTopButton } from '@/base/components/ui/scroll-to-top-button';
import { Toaster } from '@/base/components/ui/toaster';
import { QueryProvider } from '@/base/providers';
import '@/base/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Mai Home',
    default: 'Mai Home',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <QueryProvider>
            <ScrollArea className="app-scroll-area h-screen">
              {children}
              <ScrollToTopButton />
            </ScrollArea>
            <Toaster position="top-right" richColors />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
