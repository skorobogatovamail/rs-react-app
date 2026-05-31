import { Outlet } from 'react-router';

import styles from './App.module.css';
import { Button } from './components/Button/Button';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Layout } from './components/Layout/Layout';

const App: React.FC = () => {
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
        <Outlet />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
