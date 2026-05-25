import { useLocation, useNavigate } from 'react-router';

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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItemsMap);

  const handleCardClick = (item: CardType) => {
    navigate({
      pathname: `/details/${item.id}`,
      search: location.search,
    });
  };

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.id} className={styles.itemWrapper}>
          <Card
            {...item}
            isSelected={Boolean(selectedItems[item.id])}
            onSelectChange={() => dispatch(toggleItem(item))}
            onCardClick={() => handleCardClick(item)}
          />
        </div>
      ))}
    </div>
  );
};
