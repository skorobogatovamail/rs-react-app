import { Component } from 'react';

import { Results } from '../../features/Results/Results';
import { Search } from '../../features/Search/Search';
import styles from './MainPage.module.css';
import type { MainPageProps, MainPageState, ServerResponse } from './types';

export class MainPage extends Component<MainPageProps, MainPageState> {
  state = {
    items: [],
    searchValue: '',
    lastSubmittedValue: '',
    isLoading: false,
    error: null,
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

    this.loadItems(trimmedValue);
  };

  loadItems = async (searchValue: string) => {
    this.setState({
      isLoading: true,
      error: null,
    });

    const params = new URLSearchParams({ page: '1' });

    if (searchValue) {
      params.set('name', searchValue);
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }

      const data: ServerResponse = await response.json();

      const items = data.results.map((el) => ({
        id: el.id,
        title: el.name,
        description: el.species,
        image: el.image,
        link: el.url,
      }));

      this.setState({
        items,
        error: null,
      });
    } catch (error) {
      this.setState({
        items: [],
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    const savedSearchValue = localStorage.getItem('searchValue') || '';
    this.setState({
      searchValue: savedSearchValue,
      lastSubmittedValue: savedSearchValue,
    });
    this.loadItems(savedSearchValue);
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
          <Results
            items={this.state.items}
            isLoading={this.state.isLoading}
            error={this.state.error}
          />
        </section>
      </div>
    );
  }
}
