import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

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
  return (
    <html lang="vi">
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
            <Toaster
              position="top-right"
              offset={{ top: '6.5rem' }}
              mobileOffset={{ top: '6.5rem' }}
              richColors
            />
          </QueryProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
