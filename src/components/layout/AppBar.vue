<template>
  <v-app-bar elevation="0" class="glass-app-bar">
    <v-app-bar-title class="font-weight-bold text-h6">
      GRK OTOMASYON
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn
        :icon="appStore.isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="appStore.toggleTheme()"
        variant="text"
        color="primary"
      ></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAppStore } from '@/store/appStore'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
.glass-app-bar {
  background: rgba(255, 255, 255, 0.01) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  :deep(.v-toolbar__content) {
    padding: 0 16px;
  }
}

// Dark mode specific overrides if needed, though Vuetify handles most
.v-theme--light {
  .glass-app-bar {
    background: rgba(255, 255, 255, 0.7) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
