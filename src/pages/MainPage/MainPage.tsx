import cn from 'classnames';
import { Outlet, useMatch } from 'react-router';

import { useCloseDetails } from '../../features/DetailsPanel/hooks/useCloseDetails';
import { usePagination } from '../../features/Pagination/hooks/usePagination';
import { Pagination } from '../../features/Pagination/Pagination';
import { Results } from '../../features/Results/Results';
import { useSearch } from '../../features/Search/hooks/useSearch';
import { Search } from '../../features/Search/Search';
import { useGetCharacters } from './hooks/useGetCharacters';
import styles from './MainPage.module.css';

export const MainPage: React.FC = () => {
  const { searchValue, handleSearchChange, handleSubmit } = useSearch();
  const { currentPage, onPageChange } = usePagination();
  const { items, isLoading, error, pages } = useGetCharacters();

  const handleCloseDetails = useCloseDetails();
  const detailsMatch = useMatch('/details/:id');

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <Search
          value={searchValue}
          onChange={handleSearchChange}
          onSubmit={handleSubmit}
        />
      </section>
      <section
        className={cn(
          styles.resultsSection,
          detailsMatch && styles.resultsSectionWithDetails
        )}
      >
        <Results
          items={items}
          isLoading={isLoading}
          error={error}
          onClick={(e) => {
            e.stopPropagation();
            if (detailsMatch) handleCloseDetails();
          }}
        />
        {detailsMatch && (
          <aside className={styles.detailsAside}>
            <Outlet />
          </aside>
        )}
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
