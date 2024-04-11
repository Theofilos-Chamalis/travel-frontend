<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onBeforeMount(async () => {
  await Promise.resolve(setTimeout(() => {}, 3000));

  if (route.params["travelslug"] === "salala") {
    await navigateTo("/", { redirectCode: 404 });
  }
});

console.log(route.params);
</script>

<template>
  <div>
    <p>
      This is the travel page for the travel with slug:
      {{ $route.params.travelslug }}
    </p>
  </div>
</template>

<style></style>
