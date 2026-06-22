import '../../src/index.css';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { ErrorBoundary } from '../../src/components/ErrorBoundary/ErrorBoundary';
import { ErrorFallback } from '../../src/components/ErrorBoundary/ErrorFallback';
import StoreProvider from '../../src/components/StoreProvider';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { routing } from '../../src/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ru')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <StoreProvider>
            <ThemeProvider>
              <LayoutContent>{children}</LayoutContent>
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>;
}
