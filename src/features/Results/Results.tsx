import { Component } from 'react';
import styles from './Results.module.css';
import { CardsList } from '../../components/CardList/CardsList';
import type { CardType } from '../../components/Card/Card';

type ResultsProps = {
  items: CardType[];
};

export class Results extends Component<ResultsProps> {
  render() {
    return (
      <div className={styles.container}>
        <CardsList items={this.props.items} />
      </div>
    );
  }
}
