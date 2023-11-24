<script setup lang="ts">

import {ref} from "vue";

import apiService from "@/scripts/api.service";
import storageService from "@/scripts/storage.service";

const warning_text_visible = ref(false)

const username = ref("");

const usernameAttrs = ref({
  type: "text",
  placeholder: "Benutzername",
  name: "username",
  id: "username",
  required: true,
  autocomplete: "username",
  autofocus: true
})

const password = ref("");

const passwordAttrs = ref({
  type: "password",
  placeholder: "Passwort",
  name: "password",
  id: "password",
  required: true,
  autocomplete: "current-password"
})

function login() {

  warning_text_visible.value = false

  console.log("button clicked")

  if (username.value != "" && password.value != "") {
    apiService.load(username.value, password.value)
        .then(() => {

          storageService.store_credentials(username.value, password.value)

          location.reload()

        })
        .catch((error) => {
          if (error.message === '403') {
            warning_text_visible.value = true
          }

        })
  }

}


</script>

<template>

  <div class="passwd-container">
    <p :hidden="!warning_text_visible">Benutzername oder Passwort falsch</p>
    <input v-bind="usernameAttrs" v-model="username" class="username">
    <input v-bind="passwordAttrs" v-model="password" class="password">
    <button @click="login" class="login-button">Anmelden</button>
  </div>

</template>

<style scoped>

.passwd-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.username {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 20rem;
  font-size: 1.2rem;
}

.password {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 20rem;
  font-size: 1.2rem;
}

.login-button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 20rem;
  font-size: 1.2rem;
  background-color: #ccc;
}

</style>