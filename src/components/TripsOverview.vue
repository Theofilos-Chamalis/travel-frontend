<script lang="ts" setup>
import { useTravelStore } from "../stores/travels";
const travelsStore = useTravelStore();
const travels = travelsStore.travels;
</script>

<template>
  <div
    v-if="travels && travels.length > 0"
    class="flex flex-col items-center py-16"
  >
    <h1 class="px-2 pb-14 text-center text-5xl font-bold text-white">
      Check our latest trips out!
    </h1>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="travel in travelsStore.travels" :key="travel.id">
        <TripCard :travel="travel" />
      </div>
    </div>
  </div>
  <div
    v-else
    class="hero min-h-screen"
    style="
      background-image: url(https://st2.depositphotos.com/3837271/5477/i/950/depositphotos_54776043-stock-photo-see-you-soon-wooden-sign.jpg);
    "
  >
    <div class="hero-overlay bg-opacity-80"></div>
    <div class="flex h-screen items-center justify-center">
      <div class="max-w-md">
        <h1 class="text-center text-5xl font-bold text-white">Oops!</h1>
        <h1 class="mb-5 text-center text-5xl font-bold text-white">
          No available trips 😭
        </h1>
        <p class="mb-16 text-center text-white">
          There are no available trips at the moment! Please check us out in the
          near future for some new exciting destinations for your next
          adventure!
        </p>
      </div>
    </div>
  </div>
</template>
