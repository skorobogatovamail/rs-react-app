import { Button } from '../../components/Button/Button';
import styles from './Pagination.module.css';
import { getPaginationRange } from './utils/getPaginationRange';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const range =
    totalPages != null ? getPaginationRange(currentPage, totalPages) : [];

  return (
    <nav aria-label="Pagination" className={styles.contaner}>
      {currentPage > 1 && (
        <Button onClick={() => onPageChange(currentPage - 1)}>{'<'}</Button>
      )}

      {range.map((el, i) => {
        if (el === '...') {
          return <span key={`dots-${i}`}>...</span>;
        }
        return (
          <Button
            key={el}
            onClick={() => onPageChange(el)}
            aria-current="page"
            className={currentPage === el ? styles.buttonCurrent : undefined}
          >
            {el}
          </Button>
        );
      })}
      {totalPages != null && currentPage < totalPages && (
        <Button onClick={() => onPageChange(currentPage + 1)}>{'>'}</Button>
      )}
    </nav>
  );
};
