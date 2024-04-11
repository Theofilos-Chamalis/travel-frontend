import { defineStore } from "pinia";

export const useTravelStore = defineStore("travelStore", {
  state: () => ({
    travels: [] as { id: number; name: string }[],
  }),
  actions: {
    async fetchTravels() {
      // const travels = await $fetch("https://api.nuxt.com/modules/pinia");
      const travels = [
        { id: 1, name: "Paris" },
        { id: 2, name: "London" },
      ];
      this.travels = travels;
    },
  },
});
