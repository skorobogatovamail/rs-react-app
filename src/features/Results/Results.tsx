import classNames from 'classnames';
import { Component } from 'react';

import type { CardType } from '../../components/Card/Card';
import { CardsList } from '../../components/CardList/CardsList';
import { Loader } from '../../components/Loader/Loader';
import styles from './Results.module.css';

type ResultsProps = {
  items: CardType[];
  isLoading: boolean;
  error: string | null;
};

export class Results extends Component<ResultsProps> {
  render() {
    const { items, isLoading, error } = this.props;

    if (isLoading) {
      return (
        <div className={classNames(styles.loaderContainer, styles.container)}>
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
          <h3 className={styles.title}>No results found</h3>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Results</h2>
        <CardsList items={items} />
      </div>
    );
  }
}
