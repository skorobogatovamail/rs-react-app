import { useGetCharacterDetailsQuery } from '../../../services/rickAndMorty';
import { getErrorMessage } from '../../../services/utils/getErrorMessage';

export const useGetDetails = (id: string) => {
  const {
    data: item,
    error,
    isLoading,
    isFetching,
  } = useGetCharacterDetailsQuery(id, { skip: !id });

  const errorMessage = getErrorMessage(error, 'Failed to fetch character');

  return {
    item: item ?? null,
    isLoading: isLoading || isFetching,
    error: errorMessage,
  };
};
