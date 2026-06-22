import { CardType } from '../components/Card/Card';
import { BASE_URL } from './constants';
import { Character, CharactersServerResponse } from './types';

const mapCharacterToCard = (el: Character): CardType => ({
  id: el.id,
  title: el.name,
  description: el.species,
  image: el.image,
  link: el.url,
});

export async function getCharacters(name: string = '', page: string = '1') {
  const params = new URLSearchParams({
    name,
    page,
  }).toString();

  const res = await fetch(`${BASE_URL}?${params}`);

  if (!res.ok) {
    if (res.status === 404) {
      return { items: [], pages: 0 };
    }
    throw new Error('Failed to fetch characters');
  }

  const data: CharactersServerResponse = await res.json();

  return {
    items: data.results.map(mapCharacterToCard),
    pages: data.info.pages,
  };
}

export async function getCharacterDetails(id: string) {
  const res = await fetch(`${BASE_URL}${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch character details');
  }

  const data: Character = await res.json();

  return mapCharacterToCard(data);
}
