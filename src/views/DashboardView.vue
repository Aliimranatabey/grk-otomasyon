<template>
  <v-container class="fill-height align-start" fluid>
    <div class="w-100">
      <!-- Header Section -->
      <div class="d-flex justify-space-between align-center mb-4">
        <h1 class="text-h4 font-weight-bold text-white">GÜNLÜK RUTİN KONTROL</h1>
        <span class="text-h6 text-grey-lighten-1">Hoş geldin, {{ userInitials }}</span>
      </div>

      <!-- Navigation Tabs -->
      <div class="d-flex justify-center mb-8">
        <v-tabs
          v-model="activeTab"
          bg-color="rgba(255, 255, 255, 0.1)"
          slider-color="primary"
          class="rounded-lg glass-tabs"
          density="comfortable"
        >
          <v-tab value="home" class="text-capitalize">Ana Sayfa</v-tab>
          <v-tab value="ping" class="text-capitalize">Ping</v-tab>
          <v-tab value="wifi" class="text-capitalize">Wi-Fi Analiz</v-tab>
          <v-tab value="cpe" class="text-capitalize">CPE Kontrol</v-tab>
          <v-tab value="pc" class="text-capitalize">PC Kontrol</v-tab>
        </v-tabs>
      </div>

      <!-- Main Content Grid -->
      <v-row>
        <!-- Left Card: Device and Test Information -->
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-6 h-100">
            <div class="d-flex align-center mb-6">
              <v-icon icon="mdi-cog" color="white" class="mr-3"></v-icon>
              <h2 class="text-h5 font-weight-bold text-white mb-0">Cihaz ve Test Bilgileri</h2>
            </div>
            
            <v-form>
              <v-row>
                <v-col cols="12" class="py-2">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-2 text-blue font-weight-bold mr-4" style="width: 100px;">Marka</label>
                    <v-select
                      v-model="deviceInfo.brand"
                      :items="['TP-Link', 'Huawei', 'ZTE']"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.1)"
                      density="compact"
                      hide-details
                      class="glass-input"
                    ></v-select>
                  </div>
                </v-col>

                <v-col cols="12" class="py-2">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-2 text-blue font-weight-bold mr-4" style="width: 100px;">Model</label>
                    <v-select
                      v-model="deviceInfo.model"
                      :items="['ARCHER-C5V1', 'HG255s', 'H298A']"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.1)"
                      density="compact"
                      hide-details
                      class="glass-input"
                    ></v-select>
                  </div>
                </v-col>

                <v-col cols="12" class="py-2">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-2 text-blue font-weight-bold mr-4" style="width: 100px;">Firmware</label>
                    <v-text-field
                      v-model="deviceInfo.firmware"
                      placeholder="Firmware Belirtiniz..."
                      variant="solo"
                      bg-color="rgba(255,255,255,0.1)"
                      density="compact"
                      hide-details
                      class="glass-input"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="12" class="py-2">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-2 text-blue font-weight-bold mr-4" style="width: 100px;">Süre (sn)</label>
                    <v-text-field
                      v-model="deviceInfo.duration"
                      type="number"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.1)"
                      density="compact"
                      hide-details
                      class="glass-input"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="12" class="py-2">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-2 text-blue font-weight-bold mr-4" style="width: 100px;">Sunucu</label>
                    <v-select
                      v-model="deviceInfo.server"
                      :items="['GRK-1', 'GRK-2', 'GRK-3']"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.1)"
                      density="compact"
                      hide-details
                      class="glass-input"
                    ></v-select>
                  </div>
                </v-col>
              </v-row>

              <div class="d-flex flex-column align-center mt-6 gap-3">
                <v-btn
                  color="success"
                  prepend-icon="mdi-plus"
                  width="200"
                  class="text-capitalize"
                >
                  Yeni Cihaz Ekle
                </v-btn>
                
                <v-btn
                  color="primary"
                  prepend-icon="mdi-play"
                  width="200"
                  class="text-capitalize mt-3"
                  @click="startAll"
                >
                  Tümünü Başlat
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>

        <!-- Right Card: Modules to Run -->
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-6 h-100">
            <div class="d-flex align-center mb-6">
              <v-icon icon="mdi-view-list" color="white" class="mr-3"></v-icon>
              <h2 class="text-h5 font-weight-bold text-white mb-0">Çalıştırılacak Modüller</h2>
            </div>

            <v-list bg-color="transparent" class="pa-0">
              <v-list-item class="px-0 py-2">
                <template v-slot:prepend>
                  <span class="text-subtitle-1 font-weight-bold text-blue">Ping</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="modules.ping"
                    color="blue"
                    hide-details
                    inset
                  ></v-switch>
                </template>
              </v-list-item>

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend>
                  <span class="text-subtitle-1 font-weight-bold text-blue">Wi-Fi Analiz</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="modules.wifi"
                    color="blue"
                    hide-details
                    inset
                  ></v-switch>
                </template>
              </v-list-item>

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend>
                  <span class="text-subtitle-1 font-weight-bold text-blue">PC Kontrol</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="modules.pc"
                    color="blue"
                    hide-details
                    inset
                  ></v-switch>
                </template>
              </v-list-item>

              <v-list-item class="px-0 py-2">
                <template v-slot:prepend>
                  <span class="text-subtitle-1 font-weight-bold text-blue">CPE Kontrol</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="modules.cpe"
                    color="blue"
                    hide-details
                    inset
                  ></v-switch>
                </template>
              </v-list-item>
            </v-list>

            <!-- Pinia & Axios Integration Demo Section -->
            <v-divider class="my-4 border-opacity-25"></v-divider>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption text-grey">Last Server Check (Pinia):</span>
                <span class="text-caption text-white">{{ appStore.lastServerCheck || 'Never' }}</span>
              </div>
              
              <v-btn
                variant="text"
                size="small"
                color="blue-lighten-2"
                prepend-icon="mdi-api"
                :loading="loadingData"
                @click="fetchProtectedData"
                class="align-self-start px-0"
              >
                Test API Connection
              </v-btn>
              
              <v-alert
                v-if="apiResponse"
                type="info"
                variant="tonal"
                density="compact"
                class="mt-2 text-caption"
                closable
              >
                {{ apiResponse }}
              </v-alert>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Footer Navigation -->
      <div class="position-absolute bottom-0 right-0 pa-6">
        <v-btn
          color="primary"
          append-icon="mdi-chevron-right"
          size="large"
          class="px-6"
        >
          Sonraki Sekme
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'

import { useAppStore } from '../store/appStore'
import api from '../services/api'

const authStore = useAuthStore()
const appStore = useAppStore()
const activeTab = ref('home')

const deviceInfo = ref({
  brand: 'TP-Link',
  model: 'ARCHER-C5V1',
  firmware: '',
  duration: 70000,
  server: 'GRK-1'
})

const modules = ref({
  ping: false,
  wifi: false,
  pc: false,
  cpe: false
})

const loadingData = ref(false)
const apiResponse = ref(null)

const startAll = () => {
  console.log('Starting all modules:', modules.value)
  console.log('Device Info:', deviceInfo.value)
}

const fetchProtectedData = async () => {
  loadingData.value = true
  apiResponse.value = null
  try {
    const response = await api.get('https://jsonplaceholder.typicode.com/posts/1')
    apiResponse.value = "API Success: " + response.data.title.substring(0, 20) + "..."
    // Update Pinia store example
    appStore.lastServerCheck = new Date().toLocaleString()
  } catch (error) {
    console.error('API Error:', error)
    apiResponse.value = "API Failed"
  } finally {
    loadingData.value = false
  }
}

const userInitials = computed(() => {
  if (authStore.user && authStore.user.name) {
    return authStore.user.name
  }
  return 'test' // Default fallback as per screenshot
})
</script>

<style scoped lang="scss">
.glass-tabs {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-card {
  background: rgba(30, 30, 30, 0.6) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* Light mode overrides if needed, handled by global theme or specific classes */
</style>
