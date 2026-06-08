import { useState } from 'react';
import { useSearchParams } from 'react-router';

import {
  SEARCH_VALUE_KEY,
  useLocalStorage,
} from '../../../hooks/useLocalStorage';
import { rickAndMortyApi } from '../../../services/rickAndMorty';
import { useAppDispatch } from '../../../store/hooks';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { read, write, remove } = useLocalStorage(SEARCH_VALUE_KEY);
  const savedSearchValue = searchParams.get('name') || read() || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);

  const dispatch = useAppDispatch();

  const handleSearchChange = (value: string | number) => {
    setSearchValue(String(value));
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

  function handleRefresh() {
    dispatch(
      rickAndMortyApi.util.invalidateTags([{ type: 'Characters', id: 'LIST' }])
    );
  }

  return { searchValue, handleSearchChange, handleSubmit, handleRefresh };
};
