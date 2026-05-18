import { Link } from 'react-router';
import { useLocation } from 'react-router';

import type { CardType } from '../Card/Card';
import { Card } from '../Card/Card';
import styles from './CardsList.module.css';

type CardsListProps = {
  items: CardType[];
};

export const CardsList: React.FC<CardsListProps> = ({ items }) => {
  const location = useLocation();
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Link
          onClick={(e) => e.stopPropagation()}
          key={item.id}
          className={styles.container}
          to={{
            pathname: `/details/${item.id}`,
            search: location.search,
          }}
        >
          <Card {...item} />
        </Link>
      ))}
    </div>
  );
};
