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
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
};
