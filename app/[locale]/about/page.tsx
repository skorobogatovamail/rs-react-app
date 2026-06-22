import { useTranslations } from 'next-intl';

import { Layout } from '../../../src/components/Layout/Layout';
import styles from '../../../src/styles/AboutPage.module.css';

const RS_SCHOOL_REACT_URL = 'https://rs.school/courses/reactru';
const GITHUB_URL = 'https://github.com/skorobogatovamail';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <Layout>
      <section className={styles.container}>
        <h2 className={styles.title}>{t('title')}</h2>

        <div className={styles.card}>
          <h3 className={styles.subtitle}>{t('author')}</h3>
          <p className={styles.text}>
            <span className={styles.label}>{t('name')}:</span> Elena
            Skorobogatova
          </p>
          <p className={styles.text}>
            <span className={styles.label}>{t('github')}:</span>{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              skorobogatovamail
            </a>
          </p>
          <p className={styles.text}>
            <span className={styles.label}>{t('course')}:</span>{' '}
            <a
              href={RS_SCHOOL_REACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              RS School — React course
            </a>
          </p>
        </div>

        <p className={styles.description}>{t('description')}</p>
      </section>
    </Layout>
  );
}
