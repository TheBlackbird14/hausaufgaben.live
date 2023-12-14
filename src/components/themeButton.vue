<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => {
  const initUserTheme = getTheme() || getMediaPreference()
  setTheme(initUserTheme)
})

const userTheme = ref('light-theme')

function toggleTheme() {
  const activeTheme = localStorage.getItem('user-theme')
  if (activeTheme === 'light-theme') {
    setTheme('dark-theme')
  } else {
    setTheme('light-theme')
  }
}
function getTheme() {
  return localStorage.getItem('user-theme')
}

function setTheme(theme: string) {
  localStorage.setItem('user-theme', theme)
  userTheme.value = theme
  document.documentElement.className = theme
}

function getMediaPreference() {
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (hasDarkPreference) {
    return 'dark-theme'
  } else {
    return 'light-theme'
  }
}
</script>

<template>
  <div>
    <input @change="toggleTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
    <label for="checkbox" class="switch-label">
      <span></span>
      <span>️</span>
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></div>
    </label>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.switch-checkbox {
  display: none;
}

.switch-label {
  align-items: center;
  background: var(--text-primary-color);
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  border-radius: var(--element-size);
  cursor: pointer;
  display: flex;
  font-size: calc(var(--element-size) * 0.3);
  height: calc(var(--element-size) * 0.6);
  position: relative;
  padding: calc(var(--element-size) * 0.1);
  transition: background 0.5s ease;
  justify-content: space-between;
  width: calc(var(--element-size) * 1.2);
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.07);
  left: calc(var(--element-size) * 0.07);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  transform: translateX(0);
  transition:
    transform 0.3s ease,
    background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.6)) !important;
}
</style>
