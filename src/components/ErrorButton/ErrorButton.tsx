'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '../Button/Button';
import styles from './ErrorButton.module.css';

export const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const t = useTranslations('Main');

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <Button className={styles.errorButton} onClick={() => setHasError(true)}>
      {t('throwError')}
    </Button>
  );
};
