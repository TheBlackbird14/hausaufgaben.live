<script setup lang="ts">
import HomeworkHeader from '@/components/homeworkHeader.vue'
import apiService from "@/scripts/api.service";
import type {createHomeworkDto} from "@/scripts/types/create-homework.dto";
import router from "@/router";
import {ref} from "vue";

const loading = ref(false)

const subject = ref('')
const teacher = ref('')
const assignment = ref('')
const dateDue = ref('')


async function createHomework() {


  const form = document.getElementById('needs-validation')

  let fields;

  if (form) {
    fields = form.querySelectorAll('input, textarea')
  } else {
    return
  }


  let valid = true


  fields.forEach((field) => {

    field.classList.remove('is-invalid')
    field.classList.remove('is-valid')

    if (!field.checkValidity()) {
      field.classList.add('is-invalid')
      valid = false
    } else {
      field.classList.add('is-valid')
    }
  })


  if (!valid) {
    return
  }

  loading.value = true

  const homework: createHomeworkDto = {
    subject: subject.value,
    teacher: teacher.value,
    text: assignment.value,
    dateDue: new Date(dateDue.value)
  }

  await apiService.createHomework(homework)

  await router.push('/')

}

</script>

<template>
  <homework-header title="Hausaufgabe erstellen" :button="false"></homework-header>




  <div class="body">

    <div
        v-if="loading"
        class="d-flex justify-content-center align-items-center"
        style="height: 100vh"
    >
      <div class="spinner-border spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <form v-else @submit.prevent="createHomework" id="needs-validation" novalidate>
      <div class="row">
        <div class="col mb-3">
          <label for="subject" class="form-label">Fach</label>
          <input type="text" class="form-control border-2" id="subject" placeholder="Fach" v-model="subject" required />
        </div>

        <div class="col mb-3">
          <label for="teacher" class="form-label">Lehrer</label>
          <input type="text" class="form-control border-2" id="teacher" placeholder="Lehrer" v-model="teacher" required />
        </div>
      </div>

      <div class="mb-3">
        <label for="assignment" class="form-label">Aufgabe</label>
        <textarea class="form-control border-2" id="assignment" rows="3" placeholder="Auftrag" v-model="assignment" required ></textarea>
      </div>

      <div class="mb-5">
        <label for="date" class="form-label">Abgabedatum</label>
        <input type="date" class="form-control border-2" id="date" placeholder="Abgabedatum" :min="new Date().toISOString().split('T')[0]" v-model="dateDue" required/>
      </div>

      <button type="submit" class="btn btn-primary" id="submit" >Hausaufgabe erstellen</button>
    </form>
  </div>
</template>

<style scoped>
form {
  width: 50%;
  margin: auto;
}

html,
body {
  margin: 0;
  height: 100%;
}

.body {
  width: auto;
  height: 100%;
  box-sizing: border-box;

  overflow: hidden;

  background-color: var(--background-color-primary);
}

#subject {
  width: 8rem;
}

#teacher {
  width: 10rem;
}

#date {
  width: 10rem;
}

#submit {
  margin-bottom: 100%;
}

.spinner {
  width: 5rem;
  height: 5rem;
  color: var(--text-primary-color);
}

was-validated:valid {
  border-color: green;
}

</style>
