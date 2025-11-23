<template>
  <v-container class="fill-height align-start" fluid>
    <div class="w-100 h-100">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 h-100">
            <div class="d-flex align-center mb-6">
              <div class="icon-box mr-4">
                <v-icon icon="mdi-cog" color="white" size="24"></v-icon>
              </div>
              <h2 class="text-h5 font-weight-bold text-white mb-0">Cihaz ve Test Bilgileri</h2>
            </div>
            <v-form>
              <v-row>
                <!-- Setup Selection -->
                <v-col cols="12" class="py-3">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mr-4" style="width: 120px;">Setup</label>
                    <v-select
                      v-model="appStore.selectedSetup"
                      :items="setupOptions"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.05)"
                      density="comfortable"
                      hide-details
                      class="glass-input"
                      menu-icon="mdi-chevron-down"
                    ></v-select>
                  </div>
                </v-col>

                <v-col cols="12" class="py-3">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mr-4" style="width: 120px;">Marka</label>
                    <v-combobox
                      v-model="appStore.deviceInfo.brand"
                      :items="brandOptions"
                      item-title="title"
                      item-value="value"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.05)"
                      density="comfortable"
                      hide-details
                      class="glass-input"
                      menu-icon="mdi-chevron-down"
                      @update:model-value="onBrandChange"
                    ></v-combobox>
                  </div>
                </v-col>

                <v-col cols="12" class="py-3">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mr-4" style="width: 120px;">Model</label>
                    <v-combobox
                      v-model="appStore.deviceInfo.model"
                      :items="modelOptions"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.05)"
                      density="comfortable"
                      hide-details
                      class="glass-input"
                      menu-icon="mdi-chevron-down"
                      :disabled="!appStore.deviceInfo.brand"
                    ></v-combobox>
                  </div>
                </v-col>

                <v-col cols="12" class="py-3">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mr-4" style="width: 120px;">Firmware</label>
                    <v-text-field
                      v-model="appStore.deviceInfo.firmware"
                      placeholder="Firmware Belirtiniz..."
                      variant="solo"
                      bg-color="rgba(255,255,255,0.05)"
                      density="comfortable"
                      hide-details
                      class="glass-input"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="12" class="py-3">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mr-4" style="width: 120px;">Süre (sn)</label>
                    <v-text-field
                      v-model.number="appStore.globalConfig.defaultDuration"
                      type="number"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.05)"
                      density="comfortable"
                      hide-details
                      class="glass-input"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="12" class="py-3">
                  <div class="d-flex align-center">
                    <label class="text-subtitle-1 text-grey-lighten-1 font-weight-medium mr-4" style="width: 120px;">Sunucu</label>
                    <v-select
                      v-model="appStore.deviceInfo.server"
                      :items="['GRK-1', 'GRK-2', 'GRK-3']"
                      variant="solo"
                      bg-color="rgba(255,255,255,0.05)"
                      density="comfortable"
                      hide-details
                      class="glass-input"
                      menu-icon="mdi-chevron-down"
                    ></v-select>
                  </div>
                </v-col>
              </v-row>

              <div class="d-flex flex-column align-center mt-8 gap-3">
                <v-btn
                  color="#30D158"
                  prepend-icon="mdi-plus"
                  width="240"
                  height="48"
                  class="text-capitalize font-weight-bold glass-btn"
                  rounded="xl"
                  elevation="0"
                  @click="showAddDeviceDialog = true"
                >
                  Yeni Cihaz Ekle
                </v-btn>
                
                <v-btn
                  color="#0A84FF"
                  prepend-icon="mdi-play"
                  width="240"
                  height="48"
                  class="text-capitalize mt-4 font-weight-bold glass-btn"
                  rounded="xl"
                  elevation="0"
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
          <v-card class="glass-card pa-8 h-100">
            <div class="d-flex align-center mb-6">
              <div class="icon-box mr-4" style="background: rgba(94, 92, 230, 0.2);">
                <v-icon icon="mdi-view-list" color="white" size="24"></v-icon>
              </div>
              <h2 class="text-h5 font-weight-bold text-white mb-0">Çalıştırılacak Modüller</h2>
            </div>

            <v-list bg-color="transparent" class="pa-0">
              <v-list-item class="px-0 py-3 border-bottom">
                <template v-slot:prepend>
                  <span class="text-h6 font-weight-regular text-white">Ping</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="appStore.homeTab.modules.ping"
                    color="#0A84FF"
                    hide-details
                    inset
                    class="custom-switch"
                  ></v-switch>
                </template>
              </v-list-item>

              <v-list-item class="px-0 py-3 border-bottom">
                <template v-slot:prepend>
                  <span class="text-h6 font-weight-regular text-white">Wi-Fi Analiz</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="appStore.homeTab.modules.wifi"
                    color="#0A84FF"
                    hide-details
                    inset
                    class="custom-switch"
                  ></v-switch>
                </template>
              </v-list-item>

              <v-list-item class="px-0 py-3 border-bottom">
                <template v-slot:prepend>
                  <span class="text-h6 font-weight-regular text-white">PC Kontrol</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="appStore.homeTab.modules.pc"
                    color="#0A84FF"
                    hide-details
                    inset
                    class="custom-switch"
                  ></v-switch>
                </template>
              </v-list-item>

              <v-list-item class="px-0 py-3">
                <template v-slot:prepend>
                  <span class="text-h6 font-weight-regular text-white">CPE Kontrol</span>
                </template>
                <template v-slot:append>
                  <v-switch
                    v-model="appStore.homeTab.modules.cpe"
                    color="#0A84FF"
                    hide-details
                    inset
                    class="custom-switch"
                  ></v-switch>
                </template>
              </v-list-item>
            </v-list>

            <!-- Pinia & Axios Integration Demo Section -->
            <v-divider class="my-6 border-opacity-10"></v-divider>
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
          color="white"
          variant="outlined"
          append-icon="mdi-chevron-right"
          size="large"
          class="px-6 glass-btn-outline"
          rounded="xl"
          to="/ping"
        >
          Sonraki Sekme
        </v-btn>
      </div>
    </div>

    <!-- Add Device Dialog -->
    <v-dialog v-model="showAddDeviceDialog" max-width="500px">
      <v-card class="glass-card pa-4">
        <v-card-title class="text-h5 font-weight-bold text-white">Yeni Cihaz Ekle</v-card-title>
        <v-card-text>
          <v-form ref="newDeviceForm">
            <v-text-field
              v-model="newDevice.brand"
              label="Marka Adı"
              variant="solo"
              bg-color="rgba(255,255,255,0.05)"
              class="glass-input mb-4"
              :rules="[v => !!v || 'Marka gereklidir']"
            ></v-text-field>
            <v-text-field
              v-model="newDevice.model"
              label="Model Adı"
              variant="solo"
              bg-color="rgba(255,255,255,0.05)"
              class="glass-input mb-4"
              :rules="[v => !!v || 'Model gereklidir']"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="showAddDeviceDialog = false">İptal</v-btn>
          <v-btn color="success" variant="text" @click="saveDevice" :loading="savingDevice">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useAppStore } from '../store/appStore'
import api, { getBrands, saveNewDevice } from '../services/api'

const authStore = useAuthStore()
const appStore = useAppStore()

// Data
const setupOptions = ['GRK1', 'GRK2', 'GRK3', 'GRK4', 'GRK5', 'GRK6', 'GRK7', 'GRK8']
const brandsData = ref([])
const showAddDeviceDialog = ref(false)
const savingDevice = ref(false)
const newDevice = ref({ brand: '', model: '' })
const loadingData = ref(false)
const apiResponse = ref(null)

// Computed
const brandOptions = computed(() => brandsData.value.map(b => b.title))
const modelOptions = computed(() => {
  const selectedBrand = brandsData.value.find(b => b.title === appStore.deviceInfo.brand)
  return selectedBrand ? selectedBrand.models : []
})

// Methods
const onBrandChange = () => {
  appStore.deviceInfo.model = '' // Reset model when brand changes
}

const saveDevice = async () => {
  if (!newDevice.value.brand || !newDevice.value.model) return
  
  savingDevice.value = true
  try {
    await saveNewDevice(newDevice.value.brand, newDevice.value.model)
    // Refresh brands or add to local list
    brandsData.value.push({
      title: newDevice.value.brand,
      value: newDevice.value.brand,
      models: [newDevice.value.model]
    })
    showAddDeviceDialog.value = false
    newDevice.value = { brand: '', model: '' }
  } catch (error) {
    console.error('Failed to save device', error)
  } finally {
    savingDevice.value = false
  }
}

const startAll = () => {
  console.log('Starting all modules:', appStore.homeTab.modules)
  console.log('Device Info:', appStore.deviceInfo)
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

// Lifecycle
onMounted(async () => {
  try {
    brandsData.value = await getBrands()
  } catch (error) {
    console.error('Failed to load brands', error)
  }
})
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

  :deep(.v-select__selection-text) {
    color: white !important;
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

.border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.custom-switch {
  :deep(.v-switch__track) {
    background-color: rgba(255, 255, 255, 0.2) !important;
    opacity: 1 !important;
  }
}
</style>
