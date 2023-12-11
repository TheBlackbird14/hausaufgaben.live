<script setup lang="ts">
const emit = defineEmits(['toggleSidebar'])
</script>

<template>
  <header class="d-flex justify-content-between align-items-center text-center">
    <div class="p-2 col-sm-2">
      <img
        src="/src/assets/UntisHomeworkLogo.png"
        alt="logo"
        class="rounded-3 img-fluid"
        width="100"
      />
    </div>
    <div class="p-2 flex-lg-grow-1">
      <h1>Hausaufgaben</h1>
    </div>
    <div class="p-2 col-sm-2">
      <button class="btn btn-success btn-lg">
        <router-link to="/new">Hausaufgabe erstellen</router-link>
      </button>
    </div>

    <div class="p-2 me-1">
      <i class="bi bi-list icon" @click="emit('toggleSidebar')"></i>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);

  position: sticky;
  top: 0;
}

.icon {
  cursor: pointer;
  font-size: 250%;
}

a {
  text-decoration: none;
  color: white;
}
</style>
