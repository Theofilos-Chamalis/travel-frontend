export type Moods = {
  nature: number;
  relax: number;
  culture: number;
  history: number;
  party: number;
};

export type Travel = {
  id: string;
  name: string;
  nameShort?: string;
  slug: string;
  image?: string;
  description: string;
  startingDate: string;
  endingDate: string;
  price: number;
  moods: Moods;
};
