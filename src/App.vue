<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

import LoginView from '@/views/LoginView.vue'
import HomeworkView from "@/views/HomeworkView.vue";
import storageService from "@/scripts/storage.service";

let logged_in: ref<boolean>;

try {
  const credentials = storageService.retrieve_credentials()

  if (credentials) {
    logged_in = ref(true)
  } else {
    logged_in = ref(false)
  }



} catch (e) {
  console.error(e)
}

</script>

<template>

  <LoginView v-if="!logged_in"></LoginView>
  <HomeworkView v-else></HomeworkView>

</template>

<style scoped></style>
