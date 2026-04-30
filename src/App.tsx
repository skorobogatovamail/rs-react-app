import { Component } from 'react';

import styles from './App.module.css';
import { Button } from './components/Button/Button';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Layout } from './components/Layout/Layout';
import { MainPage } from './pages/MainPage/MainPage';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary
        fallback={
          <div className={styles.errorFallbackContainer}>
            <h3>Error: Something went wrong. Please try again later.</h3>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        }
      >
        <Layout>
          <MainPage />
        </Layout>
      </ErrorBoundary>
    );
  }
}
