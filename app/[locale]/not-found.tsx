import { useTranslations } from 'next-intl';

import { Button } from '../../src/components/Button/Button';
import { Layout } from '../../src/components/Layout/Layout';
import { Link } from '../../src/i18n/routing';
import styles from '../../src/pages/NotFoundPage/NotFoundPage.module.css';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <Layout>
      <section className={styles.container}>
        <p className={styles.code}>404</p>
        <h2 className={styles.title}>{t('title')}</h2>
        <Link href="/" className={styles.homeLink}>
          <Button type="button">{t('goHome')}</Button>
        </Link>
      </section>
    </Layout>
  );
}
