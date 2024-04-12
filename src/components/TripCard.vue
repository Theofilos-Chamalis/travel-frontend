<script lang="ts" setup>
import type { Travel } from "../stores/travels";
const props = defineProps<{ travel: Travel }>();
const {
  slug: travelSlug,
  nameShort: travelName,
  description: travelDescription,
  moods: travelMoods,
  image: travelImage,
} = props.travel;
</script>

<template>
  <NuxtLink :to="`/travels/${travelSlug}`">
    <div
      class="shadow-xlt card w-96 cursor-pointer border bg-base-100 hover:border hover:border-primary"
    >
      <figure>
        <img :src="travelImage" alt="Travel Card" />
      </figure>
      <div class="card-body">
        <h2 class="card-title line-clamp-1 flex text-white">
          {{ travelName }}
          <div class="badge badge-secondary">NEW</div>
        </h2>
        <p class="line-clamp-3">{{ travelDescription }}</p>
        <div class="card-actions justify-end pt-2">
          <div v-for="(value, key, index) in travelMoods" :key="index">
            <div v-if="value > 49" class="badge badge-outline text-primary">
              {{ key }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style></style>
