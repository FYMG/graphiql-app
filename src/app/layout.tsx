import './globals.css';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Header } from '@shared/components/Header';
import { Footer } from '@shared/components/Footer';

import { Inter as FontSans } from 'next/font/google';
import { cn } from '@shared/shadcn/utils';
import { ThemeProvider } from '@shared/components/ThemeProvider';
import { Toaster } from '@shared/shadcn/ui/toaster';
import { AuthProvider } from '@auth/providers/AuthProvider';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { app } from '@shared/configs';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const session = cookies().get(app.SESSION_COOKIE_NAME);

  const siteTranslations = messages.site as {
    description: string;
    title: string;
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>{siteTranslations.title}</title>
        <meta name="description" content={siteTranslations.description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider
              initialData={{
                isAuth: !!session?.value,
              }}
            >
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer className="mt-auto" />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
