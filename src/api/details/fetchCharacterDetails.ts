import { BASE_URL } from '../constants';
import type { ServerItem } from '../types';

export const fetchCharacterDetails = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('failed to fetch charachter data');
  }

  const data: ServerItem = await response.json();

  const item = {
    id: data.id,
    title: data.name,
    description: data.species,
    image: data.image,
    link: data.url,
  };

  return item;
};
