import { useSearchParams } from 'react-router';

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const setCurrentPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    onPageChange,
  };
};
