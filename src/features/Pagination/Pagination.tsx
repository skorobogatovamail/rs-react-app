import { Link } from '../../i18n/routing';
import styles from './Pagination.module.css';
import { getPaginationRange } from './utils/getPaginationRange';

type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  baseUrl: string;
  query?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  query,
}) => {
  const range =
    totalPages != null ? getPaginationRange(currentPage, totalPages) : [];

  const getHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className={styles.contaner}>
      {currentPage > 1 && (
        <Link href={getHref(currentPage - 1)} className={styles.button}>
          {'<'}
        </Link>
      )}

      {range.map((el, i) => {
        if (el === '...') {
          return <span key={`dots-${i}`}>...</span>;
        }
        return (
          <Link
            key={el}
            href={getHref(el)}
            aria-current={currentPage === el ? 'page' : undefined}
            className={
              currentPage === el
                ? `${styles.button} ${styles.buttonCurrent}`
                : styles.button
            }
          >
            {el}
          </Link>
        );
      })}
      {totalPages != null && currentPage < totalPages && (
        <Link href={getHref(currentPage + 1)} className={styles.button}>
          {'>'}
        </Link>
      )}
    </nav>
  );
};
