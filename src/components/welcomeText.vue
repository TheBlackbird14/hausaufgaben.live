<script setup lang="ts"></script>

<template>
  <div class="body">
    <header class="welcome-header">
      <img src="/src/assets/UntisHomeworkLogo.png" class="logo" alt="logo" />
      <h1>Webuntis Hausaufgaben</h1>
    </header>

    <p>
      Hier kannst du deine Hausaufgaben von Webuntis ansehen und abhaken/erledigen. Du kannst auch
      selber welche hinzufügen und dir den Mensaplan ansehen. Melde dich einfach nur mit deinen
      Webuntis Anmeldedaten hier an (Momentan nur verfügbar für Webuntis Aloisiuskolleg)
    </p>
  </div>
</template>

<style scoped>
* {
  color: var(--text-primary-color);
}

.body {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

.welcome-header {
  display: flex;
  flex-direction: row;

  justify-content: space-evenly;
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
</style>
