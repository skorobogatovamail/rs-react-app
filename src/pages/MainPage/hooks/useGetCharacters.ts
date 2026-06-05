import { useSearchParams } from 'react-router';

import { useGetCharactersQuery } from '../../../services/rickAndMorty';
import { getErrorMessage } from '../../../services/utils/getErrorMessage';

export const useGetCharacters = () => {
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('name') ?? '';
  const page = searchParams.get('page') || '1';

  const { data, error, isLoading, isFetching } = useGetCharactersQuery({
    name: searchValue,
    page,
  });

  const errorMessage = getErrorMessage(error);

  return {
    items: data?.items ?? [],
    pages: data?.pages ?? null,
    isLoading: isLoading || isFetching,
    error: errorMessage,
  };
};
