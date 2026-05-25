import { Link } from 'react-router';

import { Button } from '../../components/Button/Button';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <p className={styles.code}>404</p>
      <h2 className={styles.title}>Page not found</h2>
      <p className={styles.message}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.homeLink}>
        <Button type="button">Return to Main Page</Button>
      </Link>
    </section>
  );
};
