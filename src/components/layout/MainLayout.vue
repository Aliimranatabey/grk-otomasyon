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
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
