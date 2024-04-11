<script setup lang="ts">
import { useTravelStore } from "./stores/travels";

useSeoMeta({
  title: "Travel Frontend",
  description:
    "Travel Frontend is a travel website that helps you find the best destinations for your next vacation.",
  ogImage: "/og-image.png",
});

const travelsStore = useTravelStore();
await travelsStore.fetchTravels();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
