import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { CardType } from '../components/Card/Card';
import { BASE_URL } from './constants';
import type { Character, CharactersServerResponse } from './types';

const cacheTTL = import.meta.env.VITE_CACHE_TTL_SECONDS;

export type GetCharactersArgs = {
  name: string;
  page: string;
};

export type GetCharactersResult = {
  items: CardType[];
  pages: number;
};

export type GetCharactersDetailsArg = string;

const mapCharacterToCard = (el: Character): CardType => ({
  id: el.id,
  title: el.name,
  description: el.species,
  image: el.image,
  link: el.url,
});

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  keepUnusedDataFor: Number(cacheTTL) || 60,
  tagTypes: ['Character', 'Characters'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<GetCharactersResult, GetCharactersArgs>({
      query: ({ name, page }) => {
        const params = new URLSearchParams({
          name: name || '',
          page,
        }).toString();
        return `?${params}`;
      },
      transformResponse: (response: CharactersServerResponse) => ({
        items: response.results.map(mapCharacterToCard),
        pages: response.info.pages,
      }),
      providesTags: [{ type: 'Characters', id: 'LIST' }],
    }),

    getCharacterDetails: builder.query<CardType, GetCharactersDetailsArg>({
      query: (id) => id,
      transformResponse: (response: Character) => mapCharacterToCard(response),
      providesTags: (_r, _e, id) => [{ type: 'Character', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterDetailsQuery } =
  rickAndMortyApi;
