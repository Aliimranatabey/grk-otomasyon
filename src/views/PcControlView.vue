<template>
  <v-container class="fill-height align-start" fluid>
    <div class="w-100">
      <!-- Header Section -->
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="text-h4 font-weight-bold text-white">GÜNLÜK RUTİN KONTROL</h1>
        <span class="text-h6 text-grey-lighten-1">Hoş geldin, {{ userInitials }}</span>
      </div>

      <!-- Module Title -->
       <div class="d-flex align-center mb-6">
          <div class="icon-box mr-4">
            <v-icon icon="mdi-monitor" color="white" size="24"></v-icon>
          </div>
          <h2 class="text-h5 font-weight-bold text-white mb-0">PC Kontrol Modülü</h2>
        </div>

      <!-- Main Content Grid -->
      <v-row>
        <!-- Left Card: YouTube & Torrent -->
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100">
            <div class="d-flex align-center mb-6">
              <h2 class="text-h5 font-weight-bold text-white mb-0">YouTube & Torrent</h2>
            </div>

            <v-form>
              <!-- YouTube Section -->
              <div class="mb-8">
                <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">YouTube Linki</label>
                <div class="d-flex gap-4">
                  <v-text-field
                    v-model="youtubeLink"
                    placeholder="https://youtube.com/RNVNLJSUFdE"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="comfortable"
                    hide-details
                    class="glass-input flex-grow-1"
                  ></v-text-field>
                  <v-btn
                    color="primary"
                    height="48"
                    class="text-capitalize font-weight-bold glass-btn px-6"
                    rounded="xl"
                    elevation="0"
                    @click="startYoutube"
                  >
                    YouTube Başlat
                  </v-btn>
                </div>
              </div>

              <!-- Torrent Section -->
              <div class="mb-6">
                <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Torrent Magnet</label>
                <div class="d-flex gap-4 align-start">
                  <v-text-field
                    v-model="torrentMagnet"
                    placeholder="magnet:?xt=urn:btih:592124D..."
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="comfortable"
                    hide-details
                    class="glass-input flex-grow-1"
                  ></v-text-field>
                </div>
                <div class="d-flex justify-end gap-4 mt-4">
                   <v-btn
                    color="secondary"
                    height="48"
                    class="text-capitalize font-weight-bold glass-btn px-6"
                    rounded="xl"
                    elevation="0"
                    @click="selectFile"
                  >
                    Dosya Seç
                  </v-btn>
                  <v-btn
                    color="primary"
                    height="48"
                    class="text-capitalize font-weight-bold glass-btn px-6"
                    rounded="xl"
                    elevation="0"
                    @click="startTorrent"
                  >
                    Torrent Başlat
                  </v-btn>
                </div>
              </div>
            </v-form>
          </v-card>
        </v-col>

        <!-- Right Card: Serial İzleme -->
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100">
            <div class="d-flex align-center mb-6">
              <h2 class="text-h5 font-weight-bold text-white mb-0">Serial İzleme</h2>
            </div>

            <v-form>
              <div class="mb-6">
                <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mb-2 d-block">Hız (Baud Rate)</label>
                <div class="d-flex align-center">
                   <span class="text-h6 text-white mr-4 font-weight-bold">COM!</span>
                   <v-text-field
                    v-model="baudRate"
                    type="number"
                    variant="solo"
                    bg-color="rgba(255,255,255,0.05)"
                    density="comfortable"
                    hide-details
                    class="glass-input flex-grow-1"
                  ></v-text-field>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-subtitle-1 text-grey-lighten-1 font-weight-medium">Serial durum</span>
                  <span class="text-subtitle-1 text-white font-weight-bold">{{ serialProgress }}%</span>
                </div>
                <v-progress-linear
                  v-model="serialProgress"
                  color="primary"
                  height="8"
                  rounded
                  bg-color="rgba(255,255,255,0.1)"
                ></v-progress-linear>
              </div>

              <div class="d-flex justify-center mt-auto pt-8">
                <v-btn
                  color="primary"
                  size="large"
                  width="100%"
                  height="56"
                  class="text-capitalize font-weight-bold glass-btn"
                  rounded="xl"
                  elevation="0"
                  @click="startSerial"
                >
                  Serial İzle
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
          @click="$router.go(-1)"
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
          to="/modul1" 
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

const authStore = useAuthStore()

const userInitials = computed(() => {
  if (authStore.user && authStore.user.name) {
    return authStore.user.name
  }
  return 'Kullanıcı'
})

// YouTube & Torrent Settings
const youtubeLink = ref('')
const torrentMagnet = ref('')

const startYoutube = () => {
  console.log('Starting YouTube with link:', youtubeLink.value)
}

const selectFile = () => {
  console.log('Selecting file for Torrent')
}

const startTorrent = () => {
  console.log('Starting Torrent with magnet:', torrentMagnet.value)
}

// Serial Settings
const baudRate = ref(115200)
const serialProgress = ref(0)

const startSerial = () => {
  console.log('Starting Serial Monitoring with Baud Rate:', baudRate.value)
  serialProgress.value = 0
  const interval = setInterval(() => {
    if (serialProgress.value >= 100) {
      clearInterval(interval)
    } else {
      serialProgress.value += 5
    }
  }, 200)
}
</script>

<style scoped lang="scss">
.gap-4 {
  gap: 16px;
}

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
