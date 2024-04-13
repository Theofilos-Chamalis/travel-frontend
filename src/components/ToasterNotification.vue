<script lang="ts" setup>
const reactiveTravelStore = storeToRefs(useTravelStore());

const { notificationMessage, notificationType } = reactiveTravelStore;
</script>

<template>
  <div class="toast toast-center md:toast-end">
    <div
      v-if="notificationType"
      :class="{
        ' alert flex flex-col gap-2 text-lg text-black': true,
        'alert-info': notificationType === 'info' || '',
        'alert-success': notificationType === 'success',
        'alert-error': notificationType === 'error',
      }"
    >
      <h3 class="w-full text-xl font-bold text-black">
        {{ notificationMessage.split("!")[0] }}!
      </h3>
      <p>{{ notificationMessage.split("!")[1] }}</p>
    </div>
  </div>
</template>
