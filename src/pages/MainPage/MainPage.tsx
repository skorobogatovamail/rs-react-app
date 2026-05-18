import { ErrorButton } from '../../components/ErrorButton/ErrorButton';
import { usePagination } from '../../features/Pagination/hooks/usePagination';
import { Pagination } from '../../features/Pagination/Pagination';
import { useGetData } from '../../features/Results/hooks/useGetData';
import { Results } from '../../features/Results/Results';
import { useSearch } from '../../features/Search/hooks/useSearch';
import { Search } from '../../features/Search/Search';
import styles from './MainPage.module.css';

export const MainPage: React.FC = () => {
  const { searchValue, handleSearchChange, handleSubmit } = useSearch();
  const { currentPage, onPageChange } = usePagination();
  const { items, isLoading, error, pages } = useGetData();

  return (
    <div className={styles.container}>
      <div className={styles.errorButtonContainer}>
        <ErrorButton />
      </div>

      <section className={styles.searchSection}>
        <Search
          value={searchValue}
          onChange={handleSearchChange}
          onSubmit={handleSubmit}
        />
      </section>
      <section className={styles.resultsSection}>
        <Results items={items} isLoading={isLoading} error={error} />
      </section>

      {!isLoading && !error && items.length > 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={pages ?? undefined}
        />
      )}
    </div>
  );
};
