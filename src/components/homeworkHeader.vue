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
          class="rounded-3 img-fluid"
          width="80"
        />
      </router-link>
    </div>
    <div class="p-2 flex-lg-grow-1">
      <h1>{{ props.title }}</h1>
    </div>
    <div v-if="props.button" class="p-2 col-sm-2">
      <button class="btn btn-success btn-lg">
        <router-link to="/new">Hausaufgabe erstellen</router-link>
      </button>
    </div>

    <div class="p-2 me-1">
      <i class="bi bi-list icon" @click="sidebarVisible = !sidebarVisible"></i>
    </div>
  </header>

  <Sidebar
    :visible="sidebarVisible"
    @toggle="sidebarVisible = !sidebarVisible"
    @reload="reload"
  ></Sidebar>
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
</style>
