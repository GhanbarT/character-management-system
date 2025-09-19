import { AppHeader } from '@/components/app-header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { VazirmatnFont } from '@/font';
import { getDirection } from '@/i18n/direction';
import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import type React from 'react';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'سامانه مدیریت شخصیت‌های ایرانی | Persian Characters Management System',
  description:
    'سیستم جامع مدیریت اطلاعات شاعران، نویسندگان و منجمان ایرانی | Comprehensive management system for Persian poets, writers, and astronomers',
  generator: 'v0.app',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={getDirection(locale)}
      suppressHydrationWarning
    >
      <body
        className={`font-sans ${VazirmatnFont.className} ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <AppHeader />
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
