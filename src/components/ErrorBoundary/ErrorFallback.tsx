'use client';

import { useTranslations } from 'next-intl';

import { Button } from '../Button/Button';
import styles from './ErrorBoundary.module.css';

export const ErrorFallback: React.FC = () => {
  const t = useTranslations('NotFound');

  return (
    <div className={styles.errorFallbackContainer}>
      <h3>Error: Something went wrong. Please try again later.</h3>
      <Button onClick={() => window.location.reload()}>{t('goHome')}</Button>
    </div>
  );
};
