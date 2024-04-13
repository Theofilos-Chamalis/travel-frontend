<script lang="ts" setup>
const props = defineProps<{
  scrollToTrips: () => void;
}>();
</script>

<template>
  <div>
    <div
      class="hero min-h-screen"
      style="background-image: url(https://i.ibb.co/Ssp7N2J/hero-image.jpg)"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold text-white">
            Welcome to Travel Destinations
          </h1>
          <p class="mb-16 text-white">
            Find the best travel destinations across Europe, Asia, and the
            Americas and plan your next adventure with us!
          </p>
          <button
            class="btn btn-primary btn-wide text-xl text-white"
            @click="props.scrollToTrips"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
