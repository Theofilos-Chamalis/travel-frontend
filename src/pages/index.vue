<script setup lang="ts">
/**
 * This page provides the homepage of the application.
 * It includes the hero section and the trips overview.
 */
import type { VNodeRef } from "vue";

/**
 * Use the tripsOverviewRef ref within scrollToTripsOverviewHandler to scroll to
 * the trips overview section when the hero section button is clicked.
 */
const tripsOverviewRef = ref<VNodeRef | null>(null);

const scrollToTripsOverviewHandler = () => {
  if (tripsOverviewRef.value) {
    tripsOverviewRef.value.$el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
</script>

<template>
  <main>
    <HeroSection :scroll-to-trips="scrollToTripsOverviewHandler" />
    <TripsOverview ref="tripsOverviewRef" />
  </main>
</template>
