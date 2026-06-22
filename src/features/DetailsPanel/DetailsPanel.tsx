'use client';

import cn from 'classnames';
import { useSearchParams } from 'next/navigation';

import type { CardType } from '../../components/Card/Card';
import { Card } from '../../components/Card/Card';
import { Loader } from '../../components/Loader/Loader';
import { Link, usePathname } from '../../i18n/routing';
import styles from './DetailsPanel.module.css';

type DetailsPanelProps = {
  item?: CardType;
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
};

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  item,
  isLoading,
  error,
  onRefresh,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getCloseHref = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');
    return `${pathname}?${params.toString()}`;
  };

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={cn(styles.loaderContainer, styles.container)}>
          <Loader />
          <Link href={getCloseHref()} className={styles.closeButton}>
            Close
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3 className={styles.title}>Error: {error}</h3>
          <Link href={getCloseHref()} className={styles.closeButton}>
            Close
          </Link>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3 className={styles.title}>No results found</h3>
          <Link href={getCloseHref()} className={styles.closeButton}>
            Close
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Details</h2>
        <Card {...item} />
        <div className={styles.actions}>
          <Link href={getCloseHref()} className={styles.closeButton}>
            Close
          </Link>
          {onRefresh && (
            <button onClick={onRefresh} className={styles.refreshButton}>
              Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
