import { Component } from 'react';
import styles from './Results.module.css';
import { CardsList } from '../../components/CardList/CardsList';

export class Results extends Component {
  state = {
    items: [],
  };

  render() {
    return (
      <div className={styles.container}>
        <CardsList items={this.state.items} />
      </div>
    );
  }
}
