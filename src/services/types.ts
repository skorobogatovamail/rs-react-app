export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  url: string;
};

export type CharactersServerResponse = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
};
