import { BASE_URL } from '../constants';
import type { ServerResponse } from '../types';

export const fetchCharacters = async (name?: string, page: string = '1') => {
  const params = new URLSearchParams({ name: name || '', page }).toString();
  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }

  const data: ServerResponse = await response.json();

  const items = data.results.map((el) => ({
    id: el.id,
    title: el.name,
    description: el.species,
    image: el.image,
    link: el.url,
  }));

  const { pages } = data.info;
  return { items, pages };
};
