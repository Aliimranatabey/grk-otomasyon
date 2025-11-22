<template>
  <v-app>
    <LiquidBackground />
    
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      class="glass-drawer"
      width="280"
      color="transparent"
    >
      <div class="d-flex align-center pa-6 mb-4">
        <div class="logo-circle mr-3">
          <v-icon icon="mdi-cube-outline" color="white" size="24"></v-icon>
        </div>
        <span class="text-h6 font-weight-bold text-white">GRK Otomasyon</span>
      </div>

      <v-list class="px-4" nav>
        <v-list-item
          v-for="(item, i) in mainMenuItems"
          :key="i"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          class="mb-2 glass-list-item"
          active-class="active-glass-item"
          color="primary"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4">
          <v-divider class="mb-4 border-opacity-25"></v-divider>
          <v-list nav class="pa-0">
            <v-list-item
              prepend-icon="mdi-cog"
              title="Ayarlar"
              to="/settings"
              rounded="lg"
              class="glass-list-item mb-2"
            ></v-list-item>
            
            <v-list-item
              prepend-icon="mdi-logout"
              title="Çıkış Yap"
              @click="handleLogout"
              rounded="lg"
              class="glass-list-item logout-item"
            ></v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app flat class="glass-app-bar" height="70">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="text-white ml-2"></v-app-bar-nav-icon>
      
      <v-spacer></v-spacer>

      <div class="d-flex align-center mr-4">
        <v-avatar size="40" class="glass-avatar cursor-pointer">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg" alt="User"></v-img>
        </v-avatar>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid class="fill-height align-start pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import LiquidBackground from '@/components/ui/LiquidBackground.vue'
import { mainMenuItems } from '@/router/menu'

const drawer = ref(true)
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logoutUser()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.glass-drawer {
  background: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-app-bar {
  background: rgba(0, 0, 0, 0.05) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-list-item {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white !important;
  }
}

.active-glass-item {
  background: rgba(10, 132, 255, 0.15) !important;
  color: #0A84FF !important;
  border: 1px solid rgba(10, 132, 255, 0.2);
  box-shadow: 0 0 15px rgba(10, 132, 255, 0.1);
  
  :deep(.v-icon) {
    color: #0A84FF !important;
  }
}

.logout-item {
  &:hover {
    background: rgba(255, 59, 48, 0.1);
    color: #FF3B30 !important;
    
    :deep(.v-icon) {
      color: #FF3B30 !important;
    }
  }
}

.logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0A84FF, #5E5CE6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(10, 132, 255, 0.3);
}

.glass-avatar {
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
