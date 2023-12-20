<script setup lang="ts">
import themeButton from '@/components/themeButton.vue'
import storageService from '@/scripts/storage.service'

defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle', 'reload'])

async function logout() {
  await storageService.logout()

  location.reload()
}
</script>

<template>
  <body v-if="visible">
    <div class="shader" @click="emit('toggle')"></div>

    <div class="sidebar">
      <header class="d-flex justify-content-evenly align-items-center text-center">
        <div class="p-2 col-sm-2">
          <i
            class="bi bi-arrow-clockwise"
            @click="emit('reload')"
            style="font-size: 250%; cursor: pointer"
          ></i>
        </div>

        <div class="p-2 col-xl-5">
          <img
            class="logo rounded-3"
            src="/src/assets/UntisHomeworkLogo.png"
            alt="logo"
            height="80"
          />
        </div>

        <div class="p-2 col-sm-2">
          <i
            class="bi bi-x icon"
            @click="emit('toggle')"
            style="cursor: pointer; font-size: 300%"
          ></i>
        </div>
      </header>

      <div class="d-flex flex-column text-center mt-4">
        <router-link to="/" style="text-decoration: none" @click="emit('toggle')">
          <div class="menu-item p-2 d-flex flex-row text-center align-items-center">
            <i class="bi bi-pencil"></i>
            <h2>Hausaufgaben</h2>
          </div>
        </router-link>

        <router-link to="/stundenplan" style="text-decoration: none" @click="emit('toggle')">
          <div class="menu-item p-2 d-flex flex-row text-center align-items-center">
            <i class="bi bi-calendar3"></i>
            <h2>Stundenplan</h2>
          </div>
        </router-link>

        <router-link to="/mensa" style="text-decoration: none" @click="emit('toggle')">
          <div class="menu-item p-2 d-flex flex-row text-center align-items-center">
            <i class="bi bi-cup-hot"></i>
            <h2>Mensaplan</h2>
          </div>
        </router-link>

        <br />
        <br />

        <div class="menu-item p-2 d-flex flex-row text-center align-items-center">
          <i class="bi bi-moon"></i>
          <h2 class="flex-grow-1 text-start">Erscheinung</h2>
          <theme-button></theme-button>
        </div>

        <router-link to="/settings" style="text-decoration: none" @click="emit('toggle')">
          <div class="menu-item p-2 d-flex flex-row text-center align-items-center">
            <i class="bi bi-gear"></i>
            <h2>Einstellungen</h2>
          </div>
        </router-link>
      </div>

      <div
        class="menu-item p-2 d-flex flex-row text-center mb-0 logout"
        @click="logout"
        style="cursor: pointer"
      >
        <i class="bi bi-box-arrow-right"></i>
        <h2 @click="logout">Logout</h2>
      </div>
    </div>
  </body>
</template>

<style scoped>
.sidebar {
  height: 100%;
  min-width: 30rem;

  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 5;

  background-color: var(--background-color-primary);
}

@media screen and (width: 480px) {
  .sidebar {
    width: 100%;
  }
}

header {
  background-color: var(--background-color-secondary);
}

.logo {
  border-radius: 1rem;
}

.menu-item {
  background-color: var(--background-color-secondary);

  margin: 1rem;

  border-radius: 0.5rem;
}

i {
  font-size: 1.9rem;
  padding-left: 1rem;

  color: var(--text-primary-color);
}

h2,
h3 {
  color: var(--text-primary-color);

  margin: 0;
  padding-left: 2rem;
}

h3 {
  color: var(--text-primary-color);

  padding-left: 1rem;
}

.logout {
  position: relative;
  bottom: 0;
}

.shader {
  height: 100%;
  width: 100%;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 4;

  background-color: rgba(0, 0, 0, 0.5);
}
</style>
