import { useTranslations } from 'next-intl';

import { SelectedItemsFlyout } from '../../features/SelectedItemsFlyout/SelectedItemsFlyout';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const t = useTranslations('Header');

  return (
    <div className={styles.container}>
      <Header title={t('title')} />
      <main className={styles.main}>{children}</main>
      <SelectedItemsFlyout />
    </div>
  );
};
