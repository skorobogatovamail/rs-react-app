import '../../src/index.css';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Button } from '../../src/components/Button/Button';
import { ErrorBoundary } from '../../src/components/ErrorBoundary/ErrorBoundary';
import styles from '../../src/components/ErrorBoundary/ErrorBoundary.module.css';
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
  const t = useTranslations('NotFound');

  return (
    <ErrorBoundary
      fallback={
        <div className={styles.errorFallbackContainer}>
          <h3>Error: Something went wrong. Please try again later.</h3>
          <Button onClick={() => window.location.reload()}>
            {t('goHome')}
          </Button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
