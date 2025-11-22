<template>
  <div class="liquid-background">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
    <div class="overlay"></div>
  </div>
</template>

<script setup>
// No script needed for this visual component
</script>

<style scoped lang="scss">
.liquid-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  background: #f0f4f8;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s infinite ease-in-out alternate;
}

.blob-1 {
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: linear-gradient(135deg, #BEE3F8, #C3DAFE);
  animation-duration: 25s;
}

.blob-2 {
  bottom: -10%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: linear-gradient(135deg, #E9D8FD, #BEE3F8);
  animation-duration: 30s;
  animation-delay: -5s;
}

.blob-3 {
  top: 40%;
  left: 40%;
  width: 40vw;
  height: 40vw;
  background: linear-gradient(135deg, #FED7D7, #FEEBC8);
  animation-duration: 22s;
  animation-delay: -10s;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(60px); /* Global blur to smooth everything out */
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(50px, 50px) rotate(20deg);
  }
}

// Dark mode adjustments
:global(.v-theme--dark) .liquid-background {
  background: #000000;
}

:global(.v-theme--dark) .overlay {
  background: rgba(0, 0, 0, 0.4);
}
</style>
