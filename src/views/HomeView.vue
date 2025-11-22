<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h2 font-weight-bold mb-4 text-gradient">
          Welcome to LiquidApp
        </h1>
        <p class="text-h5 mb-8 text-medium-emphasis">
          A modern Vue 3 starter with a beautiful Apple-inspired liquid design.
        </p>
        <v-btn
          color="primary"
          size="x-large"
          rounded="pill"
          to="/dailyRoutineCheck"
          class="mb-12"
          elevation="4"
        >
          Get Started
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-8">
      <v-col cols="12" md="4">
        <v-card class="glass-card pa-6 h-100" elevation="0">
          <v-icon icon="mdi-speedometer" color="primary" size="48" class="mb-4"></v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">Fast Performance</h3>
          <p class="text-body-1">
            Built with Vite for lightning-fast HMR and optimized production builds.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="glass-card pa-6 h-100" elevation="0">
          <v-icon icon="mdi-palette" color="secondary" size="48" class="mb-4"></v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">Beautiful Design</h3>
          <p class="text-body-1">
            Featuring a stunning liquid background and glassmorphism UI elements.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="glass-card pa-6 h-100" elevation="0">
          <v-icon icon="mdi-code-tags" color="accent" size="48" class="mb-4"></v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">Modern Stack</h3>
          <p class="text-body-1">
            Vue 3, Vuetify, Pinia, and Axios pre-configured and ready to go.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Home view logic
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(45deg, #007AFF, #5856D6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
