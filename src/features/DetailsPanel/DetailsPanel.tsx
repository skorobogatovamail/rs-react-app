import cn from 'classnames';
import { useParams } from 'react-router';

import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Loader } from '../../components/Loader/Loader';
import styles from './DetailsPanel.module.css';
import { useCloseDetails } from './hooks/useCloseDetails';
import { useGetDetails } from './hooks/useGetDetails';

export const DetailsPanel = () => {
  const { id } = useParams();

  const handleCloseDetails = useCloseDetails();

  const { item, isLoading, error } = useGetDetails(id ?? '');

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={cn(styles.loaderContainer, styles.container)}>
          <Loader />
          <Button aria-label="Close details" onClick={handleCloseDetails}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3 className={styles.title}>Error: {error}</h3>
          <Button aria-label="Close details" onClick={handleCloseDetails}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3 className={styles.title}>No results found</h3>
          <Button aria-label="Close details" onClick={handleCloseDetails}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Details</h2>
        <Card {...item} />
        <Button aria-label="Close details" onClick={handleCloseDetails}>
          Close
        </Button>
      </div>
    </div>
  );
};
