import { Component } from 'react';
import { Search } from '../../features/Search/Search';
import { Results } from '../../features/Results/Results';
import styles from './MainPage.module.css';

export class MainPage extends Component {
  state = {
    items: [],
    searchValue: '',
    lastSubmittedValue: '',
  };

  handleSearchChange = (value: string) => {
    this.setState({
      searchValue: value,
    });
  };

  handleSubmit = () => {
    const trimmedValue = this.state.searchValue.trim();
    if (trimmedValue === this.state.lastSubmittedValue) {
      return;
    }

    localStorage.setItem('searchValue', trimmedValue);

    this.setState({
      searchValue: trimmedValue,
      lastSubmittedValue: trimmedValue,
    });
  };

  componentDidMount() {
    this.setState({
      searchValue: localStorage.getItem('searchValue') || '',
      lastSubmittedValue: localStorage.getItem('searchValue') || '',
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <section className={styles.searchSection}>
          <Search
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            onSubmit={this.handleSubmit}
          />
        </section>
        <section className={styles.resultsSection}>
          <Results items={this.state.items} />
        </section>
      </div>
    );
  }
}
