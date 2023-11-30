<script setup lang="ts">
import welcome from '../components/welcome.vue'
import enterLogin from '../components/enterLogin.vue'
</script>

<template>
  <div class="container">
    <welcome></welcome>
    <enterLogin></enterLogin>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;

  justify-content: space-between;
  align-items: center;

  margin: auto;
  height: 100vh;
  width: 80vw;
}

@media (max-aspect-ratio: 4/3) {
  .container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

</style>
