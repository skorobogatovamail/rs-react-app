import cn from 'classnames';
import { useTranslations } from 'next-intl';

import type { CardType } from '../../components/Card/Card';
import { CardsList } from '../../components/CardList/CardsList';
import { Loader } from '../../components/Loader/Loader';
import styles from './Results.module.css';

type ResultsProps = {
  items: CardType[];
  isLoading?: boolean;
  error?: string | null;
};

export const Results: React.FC<ResultsProps> = ({
  items,
  isLoading,
  error,
}) => {
  const t = useTranslations('Main');

  if (isLoading) {
    return (
      <div className={cn(styles.loaderContainer, styles.container)}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Error: {error}</h3>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{t('noResults')}</h3>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('search')}</h2>
      <CardsList items={items} />
    </div>
  );
};
