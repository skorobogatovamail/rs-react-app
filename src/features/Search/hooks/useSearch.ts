import { useState } from 'react';
import { useSearchParams } from 'react-router';

import {
  SEARCH_VALUE_KEY,
  useLocalStorage,
} from '../../../hooks/useLocalStorage';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { read, write, remove } = useLocalStorage(SEARCH_VALUE_KEY);
  const savedSearchValue = searchParams.get('name') || read() || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSubmit = () => {
    const trimmedValue = searchValue.trim();
    const newSearchParams = new URLSearchParams(searchParams);

    if (trimmedValue) {
      write(trimmedValue);
      newSearchParams.set('name', trimmedValue || '');
    } else {
      remove();
      newSearchParams.delete('name');
    }

    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  return { searchValue, handleSearchChange, handleSubmit };
};
