<script setup lang="ts">
import HomeworkListItem from '@/components/homeworkListItem.vue'
import {onBeforeMount, ref} from 'vue'
import apiService from '@/scripts/api.service'
import type {homework} from '@/scripts/api.service'

const uncompleted_homework: homework[] = []
const completed_homework: homework[] = []
const old_entries: homework[] = []

let latest_uncompleted_date: Date = new Date();
let latest_completed_date: Date = new Date();

let dataIsHere = ref(false)

function logout() {
  localStorage.removeItem('credentials')
  localStorage.removeItem('username')
}

onBeforeMount(() => {

  apiService.all().then((response) => {


    response.sort((a: homework, b: homework) => {
      return +new Date(a.dateDue) - +new Date(b.dateDue)
    })

    response.forEach((homework) => {
      if (homework.completed) {
        completed_homework.push(homework)
      } else {
        uncompleted_homework.push(homework)
      }
    })


    dataIsHere.value = true

  })

})

function compareDate(homeworkToCheck: homework, completed: boolean) {
  if (completed) {
    if (homeworkToCheck.dateDue.getDate() !== latest_completed_date.getDate()) {
      latest_completed_date = homeworkToCheck.dateDue
      return true
    } else {
      return false
    }
  } else {
    if (homeworkToCheck.dateDue.getDate() !== latest_uncompleted_date.getDate()) {
      latest_uncompleted_date = homeworkToCheck.dateDue
      return true
    } else {
      return false
    }
  }
}

function isDatePast(homeworkToCheck: homework, completed: boolean) {
  const isPast = homeworkToCheck.dateDue < new Date()

  if (isPast && completed) {
    old_entries.push(homeworkToCheck)
  }

  return isPast
}

function getWeekDay(homeworkToCheck: homework) {
  const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]

  return weekdays[homeworkToCheck.dateDue.getDay()]
}

</script>

<template>

  <!-- Spinner using bootstrap-->
  <div v-if="!dataIsHere" class="d-flex justify-content-center align-items-center" style="height: 80vh">
    <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>

    <div class="uncompleted">

      <h1>Unabgeschlossen</h1>

      <div v-for="(homeworkEntry, key) in uncompleted_homework" :key="key">
        <h2 v-if="compareDate(homeworkEntry, false)" class="day-title">{{ getWeekDay(homeworkEntry) }}</h2>
        <HomeworkListItem :homework-entry="homeworkEntry"></HomeworkListItem>
      </div>

    </div>

    <div class="completed">

      <h1>Abgeschlossen</h1>

      <div v-for="(homeworkEntry, key) in completed_homework" :key="key">
        <div v-if="!isDatePast(homeworkEntry, true)">
          <h2 v-if="compareDate(homeworkEntry, true)" class="day-title">{{ getWeekDay(homeworkEntry) }}</h2>
          <HomeworkListItem :homework-entry="homeworkEntry"></HomeworkListItem>
        </div>
      </div>

      <h2 v-if="old_entries.length" class="day-title">Alte Einträge</h2>

      <div v-for="(homeworkEntry, key) in old_entries" :key="key">
        <HomeworkListItem :homework-entry="homeworkEntry"></HomeworkListItem>
      </div>

    </div>

  </div>

  <button class="btn btn-danger" @click="logout">Logout</button>

</template>

<style scoped>

h1 {
  margin: 3vh 1vw 1vw;
  font-family: "Helvetica Neue", serif;
}

.day-title {
  font-size: 130%;
  font-weight: normal;
  margin: 4vh 1.5vh 1.5vh;
  border-top: solid 1px darkgray;
}

h1 {
  margin: 3vh 1vw 1vw;
}

</style>
