import { Component } from 'react';
import { Search } from '../../features/Search/Search';
import { Results } from '../../features/Results/Results';
import styles from './MainPage.module.css';

export class MainPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <section className={styles.searchSection}>
          <Search />
        </section>
        <section className={styles.resultsSection}>
          <Results />
        </section>
      </div>
    );
  }
}
