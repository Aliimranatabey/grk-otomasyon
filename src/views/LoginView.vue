<template>
  <div class="login-container">
    <!-- Liquid Background Elements -->
    <div class="liquid-shape shape-1"></div>
    <div class="liquid-shape shape-2"></div>
    <div class="liquid-shape shape-3"></div>

    <v-card class="login-card glass-effect" elevation="0">
      <div class="text-center mb-8">
        <h1 class="text-h4 font-weight-bold mb-2 app-title">GRK OTOMASYON</h1>
        <p class="text-subtitle-1 text-grey-lighten-1 welcome-text">
          HOS GELDIN <span class="wave-emoji">👋🏻</span>
        </p>
      </div>

      <!-- Toggle Switch -->
      <div class="d-flex justify-center mb-8">
        <div class="toggle-container glass-effect-light pa-1">
          <v-btn
            variant="text"
            density="comfortable"
            class="toggle-btn"
            :class="{ active: !isRegister }"
            @click="isRegister = false"
            rounded="lg"
            :ripple="false"
          >
            GIRIS
          </v-btn>
          <v-btn
            variant="text"
            density="comfortable"
            class="toggle-btn"
            :class="{ active: isRegister }"
            @click="isRegister = true"
            rounded="lg"
            :ripple="false"
          >
            KAYIT OL
          </v-btn>
        </div>
      </div>

      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="username"
          placeholder="Kullanıcı adı"
          prepend-inner-icon="mdi-account"
          variant="solo"
          bg-color="rgba(255, 255, 255, 0.1)"
          color="white"
          theme="dark"
          hide-details
          class="glass-input mb-4"
          rounded="lg"
        ></v-text-field>

        <v-text-field
          v-if="isRegister"
          v-model="email"
          placeholder="E-posta adresi"
          prepend-inner-icon="mdi-email"
          variant="solo"
          bg-color="rgba(255, 255, 255, 0.1)"
          color="white"
          theme="dark"
          hide-details
          class="glass-input mb-4"
          rounded="lg"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Şifre"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="showPassword = !showPassword"
          variant="solo"
          bg-color="rgba(255, 255, 255, 0.1)"
          color="white"
          theme="dark"
          hide-details
          class="glass-input mb-6"
          rounded="lg"
        ></v-text-field>

        <v-text-field
          v-if="isRegister"
          v-model="passwordConfirm"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Şifre (tekrar)"
          prepend-inner-icon="mdi-lock-check"
          variant="solo"
          bg-color="rgba(255, 255, 255, 0.1)"
          color="white"
          theme="dark"
          hide-details
          class="glass-input mb-6"
          rounded="lg"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          color="primary"
          size="large"
          rounded="lg"
          :loading="authStore.loading"
          class="login-btn mb-4"
          elevation="4"
        >
          {{ isRegister ? 'Hesap Oluştur' : 'Giriş Yap' }}
        </v-btn>

        <div class="text-center">
          <v-btn
            variant="text"
            density="compact"
            class="text-caption text-grey-lighten-1 hover-link"
            :ripple="false"
          >
            {{ isRegister ? 'Giriş yap' : 'Şifremi unuttum' }}
          </v-btn>
        </div>

        <v-alert
          v-if="authStore.error"
          type="error"
          variant="tonal"
          class="mt-4"
          closable
          density="compact"
        >
          {{ authStore.error }}
        </v-alert>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const isRegister = ref(false)

const handleSubmit = async () => {
  if (!username.value || !password.value) return
  
  if (isRegister.value) {
    if (password.value !== passwordConfirm.value) {
      authStore.error = "Şifreler eşleşmiyor!"
      return
    }
    
    const success = await authStore.register({
      username: username.value,
      email: email.value,
      password: password.value
    })
    
    if (success) {
       router.push('/dashboard')
    }
  } else {
    const success = await authStore.login({
      username: username.value,
      password: password.value
    })

    if (success) {
      router.push('/dashboard')
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 64px); /* Adjust for AppBar height */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #050511; /* Default Dark */
  color: white;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.5s ease, color 0.5s ease;
}

/* Liquid Shapes */
.liquid-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
  animation: float 10s infinite ease-in-out;
  transition: opacity 0.5s ease;
}

.shape-1 {
  top: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #007AFF, #00000000);
  animation-delay: 0s;
}

.shape-2 {
  bottom: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #5856D6, #00000000);
  animation-delay: -3s;
}

.shape-3 {
  top: 40%;
  left: 40%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #34C759, #00000000);
  opacity: 0.3;
  animation-delay: -6s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

/* Glassmorphism Card */
.login-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px !important; /* More organic shape */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
}

.glass-effect-light {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: inline-flex;
  transition: all 0.5s ease;
}

/* Toggle Buttons */
.toggle-container {
  .toggle-btn {
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: none;
    letter-spacing: 0.5px;
    height: 36px !important;

    &.active {
      background: rgba(0, 122, 255, 0.8) !important;
      color: white !important;
      box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
    }

    &:hover:not(.active) {
      color: white;
      background: rgba(255,255,255,0.1);
    }
  }
}

/* Inputs */
.glass-input {
  :deep(.v-field) {
    border-radius: 12px !important;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    
    &.v-field--focused {
      border-color: rgba(0, 122, 255, 0.5);
      box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
    }
  }
  
  :deep(input) {
    color: white !important;
  }
}

.login-btn {
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39) !important;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}

.hover-link {
  transition: color 0.2s;
  text-transform: none !important;
  font-weight: 400;
  
  &:hover {
    color: #007AFF !important;
  }
}

.wave-emoji {
  display: inline-block;
  animation: wave 2.5s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>
