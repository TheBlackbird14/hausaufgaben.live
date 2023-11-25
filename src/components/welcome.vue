<script setup lang="ts"></script>

<template>
  <header class="welcome-header">
    <img src="/src/assets/UntisHomeworkLogo.png" class="logo" alt="logo" />
    <h1>Webuntis Hausaufgaben Aloisiuskolleg</h1>
  </header>
</template>

<style scoped>
.welcome-header {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  height: fit-content;
}

.welcome-header > * {
  margin: auto;
}

.welcome-header > h1 {
  font-size: 1.9rem;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
}

.logo {
  height: 10vmin;
  pointer-events: none;
}
</style>
