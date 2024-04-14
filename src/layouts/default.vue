<script lang="ts" setup>
/**
 * This layout provides the default layout for the application.
 * It includes the header, the main content (pages) in the form of the slot, and the notification toaster.
 */
</script>

<template>
  <div>
    <AppHeader />
    <slot></slot>
    <ToasterNotification />
  </div>
</template>
