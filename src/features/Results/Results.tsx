import { Component } from 'react';

import type { CardType } from '../../components/Card/Card';
import { CardsList } from '../../components/CardList/CardsList';
import styles from './Results.module.css';

type ResultsProps = {
  items: CardType[];
};

export class Results extends Component<ResultsProps> {
  render() {
    return (
      <div className={styles.container}>
        <CardsList items={this.props.items} title="Results" />
      </div>
    );
  }
}
