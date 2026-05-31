import { SelectedItemsFlyout } from '../../features/SelectedItemsFlyout/SelectedItemsFlyout';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header title="Search Engine App" />
      <main className={styles.main}>{children}</main>
      <SelectedItemsFlyout />
    </div>
  );
};
