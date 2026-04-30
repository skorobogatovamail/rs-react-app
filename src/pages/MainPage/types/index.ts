import type { CardType } from '../../../components/Card/Card';

export type MainPageState = {
  searchValue: string;
  lastSubmittedValue: string;
  isLoading: boolean;
  error: string | null;
  items: CardType[];
};

type ServerItem = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  url: string;
};

export type ServerResponse = {
  results: ServerItem[];
};

export type MainPageProps = object;
