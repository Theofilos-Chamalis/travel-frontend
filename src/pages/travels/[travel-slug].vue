<script lang="ts" setup>
import { useRoute } from "vue-router";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const travelsStore = useTravelStore();

const travelsFromStore = travelsStore.travels;
const { travelslug } = route.params;
const { BACKEND_URL } = runtimeConfig.public;

// Fetch the travel data from the backend
const { data, pending, error } = await useFetch<Travel[]>(
  `${BACKEND_URL}/destination/${travelslug}`,
);
const tripDataArray = data.value;
const isDataEmpty =
  !pending.value && (!tripDataArray || tripDataArray.length === 0);

if (error.value || isDataEmpty) {
  await navigateTo("/", { redirectCode: 404 });
}

const tripData =
  tripDataArray && tripDataArray.length > 0 ? tripDataArray[0] : null;
const imageUrl =
  travelsFromStore.find((travel) => travel.slug === travelslug)?.image || "";
const moodsToDisplay = Object.fromEntries(
  Object.entries(tripData?.moods || {}).filter(([, value]) => value > 49),
);
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <img :src="imageUrl" class="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-pretty pt-4 text-5xl font-bold text-white md:pt-8">
          {{ tripData?.name }}
        </h1>
        <p class="text-pretty py-6">
          {{ tripData?.description }}
        </p>
        <div class="flex flex-col justify-between pb-8 md:flex-row">
          <div class="flex gap-4">
            <div class="badge badge-outline p-4 text-green-400">
              Price: ${{ tripData?.price }}
            </div>
            <div class="badge badge-outline p-4 text-secondary">
              {{ tripData?.startingDate }} to {{ tripData?.endingDate }}
            </div>
          </div>
          <div class="flex gap-4 pt-6 md:pt-0">
            <div v-for="(value, key, index) in moodsToDisplay" :key="index">
              <div class="badge badge-outline p-4 text-primary">
                {{ key }}
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary w-full text-white">Add to cart</button>
      </div>
    </div>
  </div>
</template>

<style></style>
