<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive include="Dashboard">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>