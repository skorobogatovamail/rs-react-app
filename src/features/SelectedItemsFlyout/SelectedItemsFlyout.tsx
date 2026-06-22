'use client';

import { useTranslations } from 'next-intl';

import { Button } from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAll } from '../../store/selectedItemsSlice';
import {
  selectSelectedCount,
  selectSelectedItemsList,
} from '../../store/selectors';
import styles from './SelectedItemsFlyout.module.css';

export const SelectedItemsFlyout: React.FC = () => {
  const t = useTranslations('Main');
  const dispatch = useAppDispatch();
  const selectedCount = useAppSelector(selectSelectedCount);
  const selectedItems = useAppSelector(selectSelectedItemsList);

  if (selectedCount === 0) {
    return null;
  }

  const handleDownload = async () => {
    const response = await fetch('/api/csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: selectedItems }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'characters.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const handleClearAll = () => {
    dispatch(clearAll());
  };

  return (
    <aside className={styles.flyout} aria-label="Selected items summary">
      <p className={styles.count}>
        {t('itemsSelected', { count: selectedCount })}
      </p>
      <div className={styles.actions}>
        <Button onClick={handleClearAll}>{t('unselectAll')}</Button>
        <Button onClick={handleDownload}>{t('export')}</Button>
      </div>
    </aside>
  );
};
