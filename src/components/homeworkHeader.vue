<script setup lang="ts">
import Sidebar from '@/components/sidebarComponent.vue'

import { ref } from 'vue'

const emit = defineEmits(['reload'])

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button: {
    type: Boolean,
    required: false,
    default: true
  }
})

const sidebarVisible = ref(false)
const mobileWidth = ref(window.screen.width <= 700)

function reload() {
  sidebarVisible.value = false
  emit('reload')
}
</script>

<template>
  <header class="d-flex justify-content-between align-items-center text-center">
    <div class="p-2 col-sm-2">
      <router-link to="/">
        <img
          src="/src/assets/UntisHomeworkLogo.png"
          alt="logo"
          class="rounded-3 img-fluid logo"
          width="80"
        />
      </router-link>
    </div>
    <div class="p-2 flex-lg-grow-1">
      <h1>{{ props.title }}</h1>
    </div>
    <div v-if="props.button" class="p-2 col-sm-2">
      <button v-if="!mobileWidth" class="btn btn-success btn-lg">
        <router-link to="/new">Hausaufgabe erstellen</router-link>
      </button>
      <button v-else class="btn btn-success btn-lg">
        <router-link to="/new">+</router-link>
      </button>
    </div>

    <div class="p-2 me-1">
      <i class="bi bi-list icon" data-bs-toggle="offcanvas" data-bs-target="#sidebar"></i>
    </div>
  </header>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="sidebar"
    aria-labelledby="sidebar"
    :class="{ show: sidebarVisible }"
    data-bs-backdrop="true"
    data-bs-scroll="true"
  >
    <Sidebar @toggle="sidebarVisible = !sidebarVisible" @reload="reload"></Sidebar>
  </div>
</template>

<style scoped>
header {
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);

  position: sticky;
  top: 0;

  z-index: 5;
}

.icon {
  cursor: pointer;
  font-size: 250%;
}

a {
  text-decoration: none;
  color: white;
}

.offcanvas {
  background-color: var(--background-color-primary);
}

@media screen and (max-width: 542px) {
  .offcanvas {
    width: 100%;
  }
}

@media screen and (max-width: 370px) {
  .logo {
    visibility: hidden;
  }
}
</style>
