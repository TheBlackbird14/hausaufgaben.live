<script setup lang="ts">
import { ref } from 'vue'

import apiService from '@/scripts/api.service'
import storageService from '@/scripts/storage.service'

const password_visible = ref(false)
const remember = ref(true)

const iconClass = ref('visible-icon bi bi-eye')
const passwordType = ref('password')
function togglePassword() {
  password_visible.value = !password_visible.value
  if (password_visible.value) {
    passwordType.value = 'text'
    iconClass.value = 'visible-icon bi bi-eye-slash'
  } else {
    passwordType.value = 'password'
    iconClass.value = 'visible-icon bi bi-eye'
  }
}

const username = ref('')

const password = ref('')

const usernameClass = ref('form-control')
const passwordClass = ref('form-control')

function login() {
  usernameClass.value = 'form-control'
  passwordClass.value = 'form-control'

  if (username.value === '') {
    usernameClass.value = 'form-control is-invalid'
    if (password.value === '') {
      passwordClass.value = 'form-control is-invalid'
    }
    return
  }
  if (password.value === '') {
    passwordClass.value = 'form-control is-invalid'
    return
  }

  console.log('button clicked')

  if (username.value != '' && password.value != '') {
    apiService
      .load(username.value, password.value)
      .then(() => {
        console.log('login successful')

        storageService.store_credentials(username.value, password.value, remember.value)

        location.reload()
      })
      .catch((error) => {
        if (error.message === '403') {
          usernameClass.value = 'form-control is-invalid'
          passwordClass.value = 'form-control is-invalid'
        }
      })
  }
}
</script>

<template>
  <form class="text-center">
    <div class="form-floating mb-3">
      <input
        v-model="username"
        type="text"
        :class="usernameClass"
        id="floatingUsername"
        placeholder="username"
        @keyup.enter="login"
      />
      <label for="floatingUsername">Benutzername</label>
    </div>
    <div class="input-group mb-3">
      <div class="form-floating flex-grow-1">
        <input
          v-model="password"
          :type="passwordType"
          :class="passwordClass"
          id="floatingPassword"
          placeholder="password"
          @keyup.enter="login"
        />
        <label for="floatingPassword" class="user-select-none">Passwort</label>
      </div>
      <span class="input-group-text" :class="iconClass" @click="togglePassword"></span>
    </div>

    <div class="form-check text-start my-3">
      <input
        class="form-check-input"
        type="checkbox"
        value="remember-me"
        id="flexCheckDefault"
        v-model="remember"
      />
      <label class="form-check-label" for="flexCheckDefault"> Angemeldet bleiben </label>
    </div>

    <button type="button" class="btn btn-primary login-button btn-lg mt-4" @click="login">
      Login
    </button>

    <div class="mt-3">
      <router-link to="/About" class="text-decoration-none">Info</router-link>
    </div>
  </form>
</template>

<style scoped>
.visible-icon {
  cursor: pointer;
}

label {
  color: var(--text-primary-color);
}

.login-button {
  width: 80%;
}
</style>
