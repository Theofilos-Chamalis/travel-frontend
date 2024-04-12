import { defineStore } from "pinia";

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

export const useTravelStore = defineStore("travelStore", {
  state: (): { travels: Travel[] } => ({
    travels: [],
  }),
  actions: {
    async fetchTravels() {
      const BACKEND_URL = process.env.BACKEND_URL;

      if (!BACKEND_URL) return;

      const travels: Travel[] = await $fetch(`${BACKEND_URL}/destination`);

      const travelsWithImages = travels.map((travel, index) => ({
        ...travel,
        nameShort: travel.name.split(":")[0],
        image: `https://picsum.photos/id/${10 + index}/400`,
      }));

      this.travels = travelsWithImages;
    },
  },
});
