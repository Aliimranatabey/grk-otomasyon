<template>
  <v-container class="fill-height align-start" fluid>
    <div class="w-100">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100">
            <div class="d-flex align-center mb-6">
              <div class="icon-box mr-4">
                <v-icon icon="mdi-ip-network" color="white" size="24"></v-icon>
              </div>
              <h2 class="text-h5 font-weight-bold text-white mb-0">IP Adresleri</h2>
            </div>

            <v-form>
              <div class="d-flex mb-2">
                <v-col cols="5" class="pb-0 pl-0">
                  <span class="text-subtitle-2 text-grey-lighten-1">IPv4</span>
                </v-col>
                <v-col cols="5" class="pb-0">
                  <span class="text-subtitle-2 text-grey-lighten-1">IPv6</span>
                </v-col>
                <v-col cols="2" class="pb-0">
                </v-col>
              </div>

              <div v-for="(ip, index) in store.pingTab.pingList" :key="index" class="d-flex align-center mb-3">
                <v-col cols="5" class="pa-0 pr-2">
                  <v-text-field
                    v-model="ip.ipv4"
                    placeholder="IPv4 Address"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                    :disabled="!store.pingTab.useIPv4"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="pa-0 pr-2">
                  <v-text-field
                    v-model="ip.ipv6"
                    placeholder="IPv6 Address"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="compact"
                    hide-details
                    class="glass-input"
                    :disabled="!store.pingTab.useIPv6"
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="pa-0 d-flex justify-end">
                  <v-btn
                    icon="mdi-minus"
                    size="small"
                    color="error"
                    variant="text"
                    @click="removeIpRow(index)"
                    class="glass-btn-icon"
                  ></v-btn>
                </v-col>
              </div>

              <div class="d-flex justify-center mt-6">
                <v-btn
                  color="primary"
                  prepend-icon="mdi-plus"
                  variant="text"
                  class="text-capitalize font-weight-bold"
                  @click="addIpRow"
                >
                  Yeni Satır
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>

        <!-- Right Card: Ping Test Settings -->
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100 position-relative">
            <div class="position-absolute top-0 right-0 ma-8">
               <v-btn
                color="error"
                variant="text"
                size="small"
                class="text-capitalize"
                @click="clearSettings"
              >
                Temizle
              </v-btn>
            </div>

            <div class="d-flex align-center mb-6">
              <div class="icon-box mr-4" style="background: rgba(255, 149, 0, 0.2);">
                <v-icon icon="mdi-cog-outline" color="white" size="24"></v-icon>
              </div>
              <h2 class="text-h5 font-weight-bold text-white mb-0">Ping Test Ayarları</h2>
            </div>

            <div class="mb-6">
               <p class="text-body-1 text-white font-weight-medium">
                 {{ deviceInfoText }}
               </p>
            </div>

            <v-form>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    v-model="store.pingTab.useIPv4"
                    label="IPv4 kullan"
                    color="primary"
                    hide-details
                    class="text-white"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    v-model="store.pingTab.useIPv6"
                    label="IPv6 kullan"
                    color="primary"
                    hide-details
                    class="text-white"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <div class="mt-4">
                <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Ping adedi (Süre)</label>
                <v-text-field
                  v-model.number="displayDuration"
                  type="number"
                  variant="solo"
                  bg-color="rgba(255,255,255,0.05)"
                  density="comfortable"
                  hide-details
                  class="glass-input"
                  :placeholder="store.globalConfig.defaultDuration.toString()"
                ></v-text-field>
                <div class="text-caption text-grey-lighten-1 mt-1">
                  Default: {{ store.globalConfig.defaultDuration }}ms
                </div>
              </div>

              <div class="mt-6">
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-subtitle-1 text-grey-lighten-1 font-weight-medium">Ping durumu</span>
                  <span class="text-subtitle-1 text-white font-weight-bold">{{ pingProgress }}%</span>
                </div>
                <v-progress-linear
                  v-model="pingProgress"
                  color="primary"
                  height="8"
                  rounded
                  bg-color="rgba(255,255,255,0.1)"
                ></v-progress-linear>
              </div>

              <div class="d-flex justify-center mt-8">
                <v-btn
                  color="primary"
                  size="large"
                  width="100%"
                  height="56"
                  class="text-capitalize font-weight-bold glass-btn"
                  rounded="xl"
                  elevation="0"
                  @click="handleStartPing"
                  :loading="loading"
                >
                  Pingi Başlat
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <!-- Footer Navigation -->
      <div class="d-flex justify-space-between align-center mt-6 px-2">
        <v-btn
          color="white"
          variant="outlined"
          prepend-icon="mdi-chevron-left"
          size="large"
          class="px-6 glass-btn-outline"
          rounded="xl"
          to="/dailyRoutineCheck"
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
          to="/wifi" 
        >
          Sonraki Sekme
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/store/appStore'
import { startPingTest } from '@/services/api'

const store = useAppStore()
const pingProgress = ref(0)
const loading = ref(false)

// Initialize store data if empty
onMounted(() => {
  // Store is already initialized with defaults
})

const deviceInfoText = computed(() => {
  const { brand, model, firmware } = store.deviceInfo
  if (brand || model) {
    return `${brand} / ${model} / ${firmware || 'No Firmware'}`
  }
  return 'Cihaz Seçilmedi (Home View)'
})

const displayDuration = computed({
  get: () => store.pingTab.pingDuration ?? store.globalConfig.defaultDuration,
  set: (val) => {
    store.setPingDuration(val)
  }
})

const addIpRow = () => {
  store.pingTab.pingList.push({ ipv4: '', ipv6: '' })
}

const removeIpRow = (index) => {
  store.pingTab.pingList.splice(index, 1)
}

const clearSettings = () => {
  store.pingTab.pingList = [{ ipv4: '', ipv6: '' }]
  store.setPingDuration(null)
  store.pingTab.useIPv4 = true
  store.pingTab.useIPv6 = false
  pingProgress.value = 0
}

const handleStartPing = async () => {
  loading.value = true
  try {
    const config = {
      ips: store.pingTab.pingList,
      duration: displayDuration.value,
      useIPv4: store.pingTab.useIPv4,
      useIPv6: store.pingTab.useIPv6,
      device: store.deviceInfo
    }
    await startPingTest(config)
    
    // Simulate progress
    pingProgress.value = 0
    const interval = setInterval(() => {
      if (pingProgress.value >= 100) {
        clearInterval(interval)
        loading.value = false
      } else {
        pingProgress.value += 10
      }
    }, 200)
  } catch (error) {
    console.error(error)
    loading.value = false
  }
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

.glass-btn-icon {
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>
