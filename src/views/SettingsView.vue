<script setup lang="ts">
import HomeworkHeader from '@/components/homeworkHeader.vue'
import storageService from '@/scripts/storage.service'

import { ref } from 'vue'

let localHomeworkStorage = ref(storageService.get_setting('localHomeworkStorage'))

const toggleFunction = () => {
  storageService.set_setting('localHomeworkStorage', localHomeworkStorage.value)

  if (!localHomeworkStorage.value) {
    localStorage.removeItem('homework')
  }
}
</script>

<template>
  <homework-header title="Einstellungen" :button="false" />

  <div class="container mt-5">
    <div class="card">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div style="margin-right: 5rem">
          <h5 class="card-title mb-0">
            Hausaufgaben lokal Zwischenspeichern <i style="opacity: 0.6">(experimental)</i>
          </h5>
          <br />
          <p class="card-text">
            Die Hausaufgaben werden lokal im Browser gespeichert, damit die Liste beim nächsten
            Besuch direkt geladen ist. Kann unerwartetes Verhalten erzeugen.
          </p>
        </div>
        <div class="form-check form-switch">
          <input
            type="checkbox"
            class="form-check-input"
            role="switch"
            id="customSwitch1"
            v-model="localHomeworkStorage"
            @change="toggleFunction"
          />
          <label class="custom-control-label" for="customSwitch1"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
}

.form-check-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e");
}
</style>
