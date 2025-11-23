<template>
  <v-container class="fill-height align-start" fluid>
    <div class="w-100 h-100">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100">
            <div class="d-flex align-center mb-6">
              <h2 class="text-h5 font-weight-bold text-white mb-0">Wi-Fi Analiz</h2>
            </div>

            <v-form>
              <div class="mb-6">
                <label class="text-subtitle-1 text-grey-lighten-1 font-weight-small mb-2 d-block">Süre (sn)</label>
                <v-text-field
                  v-model="wifiDuration"
                  type="number"
                  variant="solo"
                  bg-color="rgba(255,255,255,0.05)"
                  density="comfortable"
                  hide-details
                  class="glass-input"
                ></v-text-field>
              </div>

              <div class="mb-6">
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-subtitle-1 text-grey-lighten-1 font-weight-medium">Wi-Fi durumu</span>
                  <span class="text-subtitle-1 text-white font-weight-bold">{{ wifiProgress }}%</span>
                </div>
                <v-progress-linear
                  v-model="wifiProgress"
                  color="primary"
                  height="8"
                  rounded
                  bg-color="rgba(255,255,255,0.1)"
                ></v-progress-linear>
              </div>

              <div class="d-flex justify-center mt-auto">
                <v-btn
                  color="primary"
                  size="large"
                  width="100%"
                  height="50"
                  class="text-capitalize font-weight-bold glass-btn"
                  rounded="xl"
                  elevation="0"
                  @click="startWifiAnalysis"
                >
                  Wi-Fi Analizi Başlat
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>

        <!-- Right Card: Hız Testi -->
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100 position-relative">
            <div class="position-absolute top-0 right-0 ma-8">
               <v-btn
                color="error"
                variant="text"
                size="small"
                class="text-capitalize"
                @click="clearSpeedTestSettings"
              >
                Temizle
              </v-btn>
            </div>

            <div class="d-flex align-center mb-6">
              <h2 class="text-h5 font-weight-bold text-white mb-0">Hız Testi</h2>
            </div>

            <v-form>
              <v-row>
                <v-col cols="12" sm="6">
                  <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Marka</label>
                  <v-text-field
                    v-model="store.wifiTab.speedTestSettings.brand"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Model</label>
                  <v-text-field
                    v-model="store.wifiTab.speedTestSettings.model"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6">
                  <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Periyot (dk)</label>
                  <v-text-field
                    v-model="store.wifiTab.speedTestSettings.period"
                    type="number"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Test adedi</label>
                  <v-text-field
                    v-model="store.wifiTab.speedTestSettings.count"
                    type="number"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                   <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Firmware</label>
                   <v-text-field
                    v-model="store.wifiTab.speedTestSettings.firmware"
                    placeholder="Firmware Belirtiniz..."
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                   <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Server ID</label>
                   <v-text-field
                    v-model="store.wifiTab.speedTestSettings.serverId"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                  ></v-text-field>
                </v-col>
              </v-row>

              <div class="mt-6 mb-6">
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-subtitle-1 text-grey-lighten-1 font-weight-medium">Speed test durumu</span>
                  <span class="text-subtitle-1 text-white font-weight-bold">{{ speedTestProgress }}%</span>
                </div>
                <v-progress-linear
                  v-model="speedTestProgress"
                  color="primary"
                  height="8"
                  rounded
                  bg-color="rgba(255,255,255,0.1)"
                ></v-progress-linear>
              </div>

              <div class="d-flex justify-center">
                <v-btn
                  color="primary"
                  size="large"
                  width="100%"
                  height="50"
                  class="text-capitalize font-weight-bold glass-btn"
                  rounded="xl"
                  elevation="0"
                  @click="startSpeedTest"
                >
                  Hız Testini Başlat
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <!-- Combined Action Button -->
      <div class="d-flex justify-center mt-8 mb-4">
        <v-btn
          color="primary"
          size="x-large"
          width="100%"
          max-width="600"
          height="55"
          class="text-capitalize font-weight-bold glass-btn text-h6"
          rounded="xl"
          elevation="0"
          @click="startBoth"
        >
          BİRLİKTE BAŞLAT
        </v-btn>
      </div>

      <!-- Footer Navigation -->
      <div class="d-flex justify-space-between align-center  px-2">
        <v-btn
          color="white"
          variant="outlined"
          prepend-icon="mdi-chevron-left"
          size="large"
          class="px-6 glass-btn-outline"
          rounded="xl"
          to="/ping"
        >
          Önceki Sekme
        </v-btn>

        <v-btn
          color="white"
          variant="outlined"
          append-icon="mdi-chevron-right"
          size="large"
          class="px-6 glass-btn-outline"
          rounded="xl"
          to="/cpe" 
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
import { useAppStore } from '@/store/appStore'

const authStore = useAuthStore()
const store = useAppStore()

const userInitials = computed(() => {
  if (authStore.user && authStore.user.name) {
    return authStore.user.name
  }
  return 'Kullanıcı'
})

// Wi-Fi Analysis Settings
const wifiDuration = computed({
  get: () => store.wifiTab.wifiDuration ?? store.globalConfig.defaultDuration,
  set: (val) => store.setWifiDuration(val)
})
const wifiProgress = ref(0)

// Speed Test Settings
// Using store.wifiTab.speedTestSettings directly in template

const speedTestProgress = ref(0)

const clearSpeedTestSettings = () => {
  store.wifiTab.speedTestSettings = {
    brand: 'TP-Link',
    model: 'ARCHER-C5V1',
    period: 30,
    count: 38,
    firmware: '',
    serverId: 4667
  }
  speedTestProgress.value = 0
}

const startWifiAnalysis = () => {
  console.log('Starting Wi-Fi Analysis with duration:', wifiDuration.value)
  wifiProgress.value = 0
  const interval = setInterval(() => {
    if (wifiProgress.value >= 100) {
      clearInterval(interval)
    } else {
      wifiProgress.value += 5
    }
  }, 200)
}

const startSpeedTest = () => {
  console.log('Starting Speed Test with settings:', store.wifiTab.speedTestSettings)
  speedTestProgress.value = 0
  const interval = setInterval(() => {
    if (speedTestProgress.value >= 100) {
      clearInterval(interval)
    } else {
      speedTestProgress.value += 5
    }
  }, 200)
}

const startBoth = () => {
  startWifiAnalysis()
  startSpeedTest()
}
</script>

<style scoped lang="scss">
.glass-card {
  background: rgba(20, 20, 20, 0.6) !important;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.glass-input {
  :deep(.v-field) {
    border-radius: 12px !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    color: white;
    
    &.v-field--focused {
      border-color: rgba(10, 132, 255, 0.5);
      box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.1);
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  :deep(input) {
    color: white !important;
    font-weight: 500;
  }
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: rgba(10, 132, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-btn {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
  transition: transform 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
}

.glass-btn-outline {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
  }
}
</style>
