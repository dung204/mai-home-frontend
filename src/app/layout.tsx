import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { Toaster } from '@/base/components/ui/toaster';
import { ConfirmLogoutDialogProvider, QueryProvider } from '@/base/providers';
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
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="overflow-hidden antialiased">
        <NextIntlClientProvider>
          <QueryProvider>
            <ConfirmLogoutDialogProvider>{children}</ConfirmLogoutDialogProvider>
            <Toaster position="top-right" richColors />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
