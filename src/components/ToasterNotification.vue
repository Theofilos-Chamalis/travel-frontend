<script lang="ts" setup>
const reactiveTravelStore = storeToRefs(useTravelStore());

const { notificationMessage, notificationType } = reactiveTravelStore;
</script>

<template>
  <div class="toast toast-end">
    <div
      v-if="notificationType"
      :class="{
        ' alert text-lg text-black': true,
        'alert-info': notificationType === 'info' || '',
        'alert-success': notificationType === 'success',
        'alert-error': notificationType === 'error',
      }"
    >
      <span>{{ notificationMessage }}</span>
    </div>
  </div>
</template>
