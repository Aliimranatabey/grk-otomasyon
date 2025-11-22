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
            <v-icon icon="mdi-router-wireless" color="white" size="24"></v-icon>
          </div>
          <h2 class="text-h5 font-weight-bold text-white mb-0">CPE Kontrol / Modem Otomasyonu</h2>
        </div>

      <!-- Main Content -->
      <v-row>
        <v-col cols="12">
          <v-card class="glass-card pa-8">
            <div class="d-flex align-center mb-2">
              <h2 class="text-h4 font-weight-bold text-primary mb-0">Modem Seçimi</h2>
            </div>
            <p class="text-subtitle-1 text-grey-lighten-1 mb-6">
              Lütfen test etmek istediğiniz modemi listeden seçiniz.
            </p>

            <v-list bg-color="transparent" class="modem-list">
              <v-list-item
                v-for="(modem, index) in modems"
                :key="index"
                class="glass-list-item mb-4 pa-4"
                rounded="xl"
              >
                <template v-slot:prepend>
                  <div class="d-flex align-center" style="width: 200px;">
                    <span class="text-h6 font-weight-bold text-white">{{ modem.name }}</span>
                  </div>
                </template>

                <div class="d-flex justify-center flex-grow-1">
                  <span class="text-subtitle-1 text-grey-lighten-1">{{ modem.tech }}</span>
                </div>

                <template v-slot:append>
                  <v-switch
                    v-model="selectedModem"
                    :value="modem.id"
                    color="primary"
                    hide-details
                    inset
                    class="ms-4"
                  ></v-switch>
                </template>
              </v-list-item>
            </v-list>

            <div class="d-flex justify-end mt-6">
              <v-btn
                color="primary"
                size="large"
                height="56"
                class="text-capitalize font-weight-bold glass-btn px-8"
                rounded="xl"
                elevation="0"
                @click="startSelectedModem"
                :disabled="!selectedModem"
              >
                Seçili Modemi Başlat
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Note Section -->
      <div class="mt-6">
        <v-card class="glass-card pa-6" style="background: rgba(255, 193, 7, 0.1) !important; border-color: rgba(255, 193, 7, 0.2);">
          <div class="d-flex align-center">
            <v-icon icon="mdi-information" color="warning" class="mr-3"></v-icon>
            <span class="text-subtitle-1 text-warning font-weight-medium">
              Not: Otomasyon çalışmak istediğiniz ana ekrandaki CPE ana switch'i açıkken çalışır.
            </span>
          </div>
        </v-card>
      </div>

      <!-- Footer Navigation -->
      <div class="d-flex justify-space-between align-center mt-8 px-2">
        <v-btn
          color="white"
          variant="outlined"
          prepend-icon="mdi-chevron-left"
          size="large"
          class="px-6 glass-btn-outline"
          rounded="xl"
          to="/wifi"
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
          to="/pc"
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

const selectedModem = ref(null)

const modems = [
  { id: 'vx231', name: 'TP-Link VX231', tech: 'DSL & Wi-Fi 6' },
  { id: 'ex220v', name: 'TP-Link EX220V', tech: 'FIBER & Wi-Fi 6' },
  { id: 'vc220', name: 'TP-Link VC220', tech: 'DSL & Wi-Fi 5' },
  { id: 'h3600', name: 'ZTE H3600', tech: 'FIBER & Wi-Fi 6' }
]

const startSelectedModem = () => {
  if (selectedModem.value) {
    console.log('Starting modem automation for:', selectedModem.value)
    // Add automation logic here
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

.glass-list-item {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    border-color: rgba(255, 255, 255, 0.1);
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

/* Custom switch color */
:deep(.v-switch .v-selection-control__input input) {
  opacity: 0;
}
</style>
