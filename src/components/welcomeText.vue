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
  margin: 0;
}

.welcome-header > h1 {
  font-size: 1.9rem;
  font-weight: bold;
  font-family: Helvetica, sans-serif;

  text-align: center;
  color: var(--text-primary-color);
}

.logo {
  width: 15%;

  pointer-events: none;
}

@media (max-width: 800px) {
  .welcome-header {
    flex-direction: column;
  }

  .welcome-header > h1 {
    margin-top: 1em;
    font-size: 1rem;
  }
}
</style>
