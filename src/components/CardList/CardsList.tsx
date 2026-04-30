import { Component } from 'react';

import type { CardType } from '../Card/Card';
import { Card } from '../Card/Card';
import styles from './CardsList.module.css';

type CardsListProps = {
  items: CardType[];
  title: string;
};

export class CardsList extends Component<CardsListProps> {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{this.props.title}</h2>
        <div className={styles.list}>
          {this.props.items.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    );
  }
}
