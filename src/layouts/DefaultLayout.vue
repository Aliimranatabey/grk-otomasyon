<template>
  <v-app>
    <LiquidBackground />
    
    <v-app-bar app flat class="glass-card" height="64">
      <v-container class="d-flex align-center py-0">
        <v-app-bar-title class="font-weight-bold text-h5">
          <span class="text-gradient">LiquidApp</span>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" to="/" class="mr-2">Home</v-btn>
        <v-btn variant="text" to="/dashboard" class="mr-2">Dashboard</v-btn>

        <v-btn icon @click="appStore.toggleTheme">
          <v-icon>{{ appStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height align-start pt-10">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAppStore } from '@/store/appStore'
import { useTheme } from 'vuetify'
import { watch } from 'vue'
import LiquidBackground from '@/components/ui/LiquidBackground.vue'

const appStore = useAppStore()
const theme = useTheme()

// Sync theme with store
watch(() => appStore.isDark, (val) => {
  theme.global.name.value = val ? 'dark' : 'light'
}, { immediate: true })
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.text-gradient {
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
