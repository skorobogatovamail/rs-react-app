import { useEffect, useState } from 'react';

import { fetchCharacterDetails } from '../../../api/details/fetchCharacterDetails';
import type { CardType } from '../../../components/Card/Card';

export const useGetDetails = (id: string) => {
  const [item, setItem] = useState<CardType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const getItemData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const itemData: CardType = await fetchCharacterDetails(id);
        setItem(itemData);
      } catch {
        setError('Failed to fetch character');
      } finally {
        setIsLoading(false);
      }
    };

    getItemData();
  }, [id]);

  return { item, isLoading, error };
};
