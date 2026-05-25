import styles from './AboutPage.module.css';

const RS_SCHOOL_REACT_URL = 'https://rs.school/courses/reactru';
const GITHUB_URL = 'https://github.com/skorobogatovamail';

export const AboutPage = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About</h2>

      <div className={styles.card}>
        <h3 className={styles.subtitle}>Author</h3>
        <p className={styles.text}>
          <span className={styles.label}>Name:</span> Elena Skorobogatova
        </p>
        <p className={styles.text}>
          <span className={styles.label}>GitHub:</span>{' '}
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
          <span className={styles.label}>Course:</span>{' '}
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

      <p className={styles.description}>
        This application searches characters from the Rick and Morty API and
        displays results with pagination and a details panel.
      </p>
    </section>
  );
};
