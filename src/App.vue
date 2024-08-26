<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

import LoginView from '@/views/LoginView.vue'
import storageService from '@/scripts/storage.service'
import ThemeButton from '@/components/themeButton.vue'

let logged_in = ref(false)

try {


  if (storageService.retrieve_username()) {
    logged_in = ref(true)
  } else {
    logged_in = ref(false)
  }
} catch (e) {
  console.error(e)
}
</script>

<template>
  <LoginView v-if="!logged_in && $route.fullPath != '/About'"></LoginView>

  <router-view v-else></router-view>

  <!--  Only here because it has onMount functions that declare styles  -->
  <theme-button v-show="false"></theme-button>
</template>

<style scoped></style>
