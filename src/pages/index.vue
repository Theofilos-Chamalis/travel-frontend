<script setup lang="ts">
import { ref, type VNodeRef } from "vue";

const tripsOverviewRef = ref<VNodeRef | null>(null);

const scrollToTripsOverview = () => {
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
    <HeroSection :scroll-to-trips="scrollToTripsOverview" />
    <TripsOverview ref="tripsOverviewRef" />
  </main>
</template>
