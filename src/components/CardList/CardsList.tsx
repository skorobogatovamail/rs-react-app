'use client';

import { useSearchParams } from 'next/navigation';

import { Link, usePathname } from '../../i18n/routing';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem } from '../../store/selectedItemsSlice';
import { selectSelectedItemsMap } from '../../store/selectors';
import type { CardType } from '../Card/Card';
import { Card } from '../Card/Card';
import styles from './CardsList.module.css';

type CardsListProps = {
  items: CardType[];
};

export const CardsList: React.FC<CardsListProps> = ({ items }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItemsMap);

  const getCardHref = (item: CardType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', item.id.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.id} className={styles.itemWrapper}>
          <Link href={getCardHref(item)} className={styles.cardLink}>
            <Card
              {...item}
              isSelected={Boolean(selectedItems[item.id])}
              onSelectChange={() => dispatch(toggleItem(item))}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
