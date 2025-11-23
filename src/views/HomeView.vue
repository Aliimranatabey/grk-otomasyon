<template>
  <v-container fluid class="fill-height home-container">
    <v-row justify="center" align="center" class="text-center">
      <v-col cols="12" md="10" lg="8">
        <div class="hero-content">
          <div class="logo-container mb-8">
            <v-icon icon="mdi-shield-check" size="80" color="primary" class="mb-4 glow-icon"></v-icon>
          </div>
          
          <h1 class="text-h2 font-weight-black text-white mb-2 fluid-title">
            TÜRK TELEKOM
          </h1>
          <h2 class="text-h3 font-weight-bold text-primary mb-8 fluid-subtitle">
            GÜNLÜK RUTİN KONTROL OTOMASYONU
          </h2>
          
          <p class="text-h6 text-grey-lighten-1 mb-12" style="max-width: 800px; margin: 0 auto;">
            Otomatik test süreçleri, cihaz yönetimi ve performans analizi için merkezi kontrol sistemi.
          </p>

          <v-btn
            color="primary"
            size="x-large"
            rounded="xl"
            elevation="8"
            height="64"
            width="280"
            class="start-btn text-h6 font-weight-bold"
            prepend-icon="mdi-rocket-launch"
            :to="{ name: 'dailyRoutineCheck' }"
          >
            SİSTEME GİRİŞ
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No logic needed for the landing page
</script>

<style scoped lang="scss">
.home-container {
  background: radial-gradient(circle at center, rgba(10, 132, 255, 0.1) 0%, transparent 70%);
}

.hero-content {
  animation: fadeIn 1s ease-out;
}

.fluid-title {
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  letter-spacing: -0.02em;
}

.fluid-subtitle {
  background: linear-gradient(to right, #0A84FF, #5E5CE6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(10, 132, 255, 0.3);
}

.glow-icon {
  filter: drop-shadow(0 0 20px rgba(10, 132, 255, 0.5));
  animation: float 6s ease-in-out infinite;
}

.start-btn {
  background: linear-gradient(135deg, #0A84FF, #0056b3);
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(10, 132, 255, 0.4);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
