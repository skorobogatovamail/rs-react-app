import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const savedSearchValue =
    searchParams.get('name') || localStorage.getItem('searchValue') || '';
  const [searchValue, setSearchValue] = useState(savedSearchValue);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSubmit = () => {
    const trimmedValue = searchValue.trim();
    const newSearchParams = new URLSearchParams(searchParams);

    if (trimmedValue) {
      localStorage.setItem('searchValue', trimmedValue);
      newSearchParams.set('name', trimmedValue || '');
    } else {
      localStorage.removeItem('searchValue');
      newSearchParams.delete('name');
    }

    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  return { searchValue, handleSearchChange, handleSubmit };
};
