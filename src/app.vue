<script setup lang="ts">
/**
 * This is the main application file. It populates the store by providing the travels/destinations data.
 */
import { useTravelStore } from "./stores/travels";

useSeoMeta({
  title: "Travel Frontend",
  description:
    "Travel Frontend is a travel website that helps you find the best destinations for your next vacation.",
  ogImage: "og-image.png",
  applicationName: "Travel Frontend",
});

await useTravelStore().fetchTravelsAction();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
