<template>
  <v-app class="app-background">
    <LiquidBackground />
    
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </component>
  </v-app>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import LiquidBackground from '@/components/ui/LiquidBackground.vue' // İçe aktarmayı unutma

const route = useRoute()

const layout = computed(() => {
  const layoutName = route.meta.layout || 'DefaultLayout'
  return defineAsyncComponent(() => import(`@/layouts/${layoutName}.vue`))
})
</script>

<style>
/* Vuetify'ın varsayılan arkaplanını şeffaf yapıyoruz ki alttaki Liquid görünsün */
.v-application {
  background: transparent !important;
}
</style>