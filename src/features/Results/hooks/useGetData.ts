import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { fetchData } from '../../../api/fetchData';

export const useGetData = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(null);
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('name') ?? '';
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { items: itemsResult, pages } = await fetchData(
          searchValue,
          page
        );
        setItems(itemsResult);
        setPages(pages);
      } catch (error) {
        setItems([]);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [searchValue, page]);

  return { items, isLoading, error, pages };
};
