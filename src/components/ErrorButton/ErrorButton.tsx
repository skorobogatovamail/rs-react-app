import { useState } from 'react';

import { Button } from '../Button/Button';
import styles from './ErrorButton.module.css';

export const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <Button className={styles.errorButton} onClick={() => setHasError(true)}>
      Throw error
    </Button>
  );
};
