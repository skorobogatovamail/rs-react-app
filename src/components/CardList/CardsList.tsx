import { Component } from 'react';
import type { CardType } from '../Card/Card';
import { Card } from '../Card/Card';

import styles from './CardsList.module.css';

type CardsListProps = {
  items: CardType[];
};

export class CardsList extends Component<CardsListProps> {
  render() {
    return (
      <div className={styles.container}>
        {this.props.items.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    );
  }
}
