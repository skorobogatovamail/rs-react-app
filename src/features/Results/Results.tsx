import cn from 'classnames';

import type { CardType } from '../../components/Card/Card';
import { CardsList } from '../../components/CardList/CardsList';
import { Loader } from '../../components/Loader/Loader';
import styles from './Results.module.css';

type ResultsProps = {
  items: CardType[];
  isLoading: boolean;
  error: string | null;
  onClick?: (e: React.MouseEvent) => void;
};

export const Results: React.FC<ResultsProps> = ({
  items,
  isLoading,
  error,
  onClick,
}) => {
  if (isLoading) {
    return (
      <div
        onClick={onClick}
        className={cn(styles.loaderContainer, styles.container)}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div onClick={onClick} className={styles.container}>
        <h3 className={styles.title}>Error: {error}</h3>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div onClick={onClick} className={styles.container}>
        <h3 className={styles.title}>No results found</h3>
      </div>
    );
  }

  return (
    <div onClick={onClick} className={styles.container}>
      <h2 className={styles.title}>Search Results</h2>
      <CardsList items={items} />
    </div>
  );
};
