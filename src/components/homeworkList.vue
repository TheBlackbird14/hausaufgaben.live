<script setup lang="ts">
import HomeworkListItem from '@/components/homeworkListItem.vue'
import { onBeforeMount, reactive, ref } from 'vue'
import apiService from '@/scripts/api.service'
import type { homework } from '@/scripts/types/homework.interface'

let dataIsHere = ref(false)
let old_dataisHere = ref(false)

defineExpose({ dataIsHere })

const uncompleted_homework = reactive({
  homeworkEntries: [] as homework[]
})
const completed_homework = reactive({
  homeworkEntries: [] as homework[]
})
const old_entries = reactive({
  homeworkEntries: [] as homework[]
})

let latest_uncompleted_date: Date = new Date()
let latest_completed_date: Date = new Date()

onBeforeMount(() => {
  getHomework()
})

function getHomework() {

  const old_data = localStorage.getItem('homework')

  if (old_data) {
    const jsonData = JSON.parse(old_data)

    const parsedData = jsonData.map((element: homework) => {
      return {
        id: element.id,
        dateAdded: new Date(element.dateAdded),
        dateDue: new Date(element.dateDue),
        text: element.text,
        remark: element.remark,
        teacher: element.teacher,
        subject: element.subject,
        completed: element.completed
      }
    })

    parsedData.sort((a: homework, b: homework) => {
      return +new Date(a.dateDue) - +new Date(b.dateDue)
    })

    parsedData.forEach((homework: homework) => {
      if (!homework.completed) {
        uncompleted_homework.homeworkEntries.push(homework)
      } else if (homework.dateDue > new Date()) {
        completed_homework.homeworkEntries.push(homework)
      } else {
        old_entries.homeworkEntries.push(homework)
      }
    })

    old_dataisHere.value = true
  }

  apiService.all().then((response) => {
    response.sort((a: homework, b: homework) => {
      return +new Date(a.dateDue) - +new Date(b.dateDue)
    })

    response.forEach((homework) => {

      //check if the entry is already in any of the lists
      if (
        uncompleted_homework.homeworkEntries.find((element) => element.id === homework.id) ||
        completed_homework.homeworkEntries.find((element) => element.id === homework.id) ||
        old_entries.homeworkEntries.find((element) => element.id === homework.id)
      ) {
        return
      }

      if (!homework.completed) {
        uncompleted_homework.homeworkEntries.push(homework)
      } else if (homework.dateDue > new Date()) {
        completed_homework.homeworkEntries.push(homework)
      } else {
        old_entries.homeworkEntries.push(homework)
      }
    })

    dataIsHere.value = true
  })
}

function compareDate(homeworkToCheck: homework, completed: boolean) {
  if (completed) {
    if (
      homeworkToCheck.dateDue.toISOString().split('T')[0] !==
      latest_completed_date.toISOString().split('T')[0]
    ) {
      latest_completed_date = homeworkToCheck.dateDue
      return true
    } else {
      return false
    }
  } else {
    if (
      homeworkToCheck.dateDue.toISOString().split('T')[0] !==
      latest_uncompleted_date.toISOString().split('T')[0]
    ) {
      latest_uncompleted_date = homeworkToCheck.dateDue
      return true
    } else {
      return false
    }
  }
}

function isDatePast(homeworkToCheck: homework) {
  /* remnant of a painful search for a bug */
  // if (isPast && completed) {
  //   old_entries.homeworkEntries.push(homeworkToCheck)
  // }

  return homeworkToCheck.dateDue < new Date()
}

function getWeekDay(homeworkToCheck: homework) {
  const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

  return weekdays[homeworkToCheck.dateDue.getDay()]
}

function getDaysLeftString(date: Date) {
  const today = new Date()

  const difference = date.getTime() - today.getTime()

  const calcDiff = Math.ceil(difference / (1000 * 3600 * 24))

  if (calcDiff === 1) {
    return 'Morgen'
  } else if (calcDiff === 0) {
    return 'Heute'
  } else if (calcDiff === -1) {
    return 'Gestern'
  } else if (calcDiff < -1) {
    return 'Vor ' + Math.abs(calcDiff) + ' Tagen'
  } else if (calcDiff > 7) {
    return (
      date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' }) +
      ', In ' +
      calcDiff +
      ' Tagen'
    )
  } else {
    return 'In ' + calcDiff + ' Tagen'
  }
}
/*
id: number; The id of the entry
array: number; the array it is in, uncompleted (1), completed (2) or old (3)

 */
function onChange(id: number, array: number) {
  let index: number
  let homeworkEntry: homework

  switch (array) {
    case 1: //uncompleted
      index = uncompleted_homework.homeworkEntries.findIndex((homework) => homework.id === id)
      homeworkEntry = uncompleted_homework.homeworkEntries[index]

      uncompleted_homework.homeworkEntries.splice(index, 1)

      homeworkEntry.completed = true

      if (!isDatePast(homeworkEntry)) {
        completed_homework.homeworkEntries.push(homeworkEntry)

        completed_homework.homeworkEntries.sort((a: homework, b: homework) => {
          return +new Date(a.dateDue) - +new Date(b.dateDue)
        })
      } else {
        old_entries.homeworkEntries.push(homeworkEntry)

        old_entries.homeworkEntries.sort((a: homework, b: homework) => {
          return +new Date(a.dateDue) - +new Date(b.dateDue)
        })
      }

      break

    case 2: //completed
      index = completed_homework.homeworkEntries.findIndex((homework) => homework.id === id)
      homeworkEntry = completed_homework.homeworkEntries[index]

      completed_homework.homeworkEntries.splice(index, 1)

      homeworkEntry.completed = false

      uncompleted_homework.homeworkEntries.push(homeworkEntry)

      uncompleted_homework.homeworkEntries.sort((a: homework, b: homework) => {
        return +new Date(a.dateDue) - +new Date(b.dateDue)
      })

      break

    case 3: //old
      index = old_entries.homeworkEntries.findIndex((homework) => homework.id === id)
      homeworkEntry = old_entries.homeworkEntries[index]

      old_entries.homeworkEntries.splice(index, 1)

      homeworkEntry.completed = false

      uncompleted_homework.homeworkEntries.push(homeworkEntry)

      uncompleted_homework.homeworkEntries.sort((a: homework, b: homework) => {
        return +new Date(a.dateDue) - +new Date(b.dateDue)
      })

      break
  }
}

function onDelete(id: number, array: number) {
  let index: number

  switch (array) {
    case 1: //uncompleted
      index = uncompleted_homework.homeworkEntries.findIndex((homework) => homework.id === id)

      uncompleted_homework.homeworkEntries.splice(index, 1)

      break

    case 2: //completed
      index = completed_homework.homeworkEntries.findIndex((homework) => homework.id === id)

      completed_homework.homeworkEntries.splice(index, 1)

      break

    case 3: //old
      index = old_entries.homeworkEntries.findIndex((homework) => homework.id === id)

      old_entries.homeworkEntries.splice(index, 1)

      break
  }
}
</script>

<template>
  <div class="body">
    <!-- Spinner using bootstrap-->
    <div
      v-if="!dataIsHere && !old_dataisHere"
      class="d-flex justify-content-center align-items-center"
      style="height: 8vh"
    >
      <div class="spinner-border spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="old_dataisHere || dataIsHere">
      <div class="uncompleted">

        <div class="d-flex justify-content-between align-items-center">
          <h1 class="mb-0">Unabgeschlossen</h1>

          <div v-if="old_dataisHere && !dataIsHere" class="spinner-border spinner-small" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

        </div>

        <div v-if="uncompleted_homework.homeworkEntries.length">
          <div v-for="(homeworkEntry, key) in uncompleted_homework.homeworkEntries" :key="key">
            <h2 v-if="compareDate(homeworkEntry, false)" class="day-title">
              {{
                getWeekDay(homeworkEntry) + ' (' + getDaysLeftString(homeworkEntry.dateDue) + ')'
              }}
            </h2>
            <HomeworkListItem
              :homework-entry="homeworkEntry"
              @update="onChange"
              @delete="onDelete"
            ></HomeworkListItem>
          </div>
        </div>
        <div v-else>
          <h2 class="text-center h-100">Keine Hausaufgaben mehr!! 🎉🎉🎉</h2>
        </div>
      </div>

      <div class="completed">
        <h1 v-if="completed_homework.homeworkEntries.length">Abgeschlossen</h1>

        <div v-for="(homeworkEntry, key) in completed_homework.homeworkEntries" :key="key">
          <div v-if="!isDatePast(homeworkEntry)">
            <h2 v-if="compareDate(homeworkEntry, true)" class="day-title">
              {{
                getWeekDay(homeworkEntry) + ' (' + getDaysLeftString(homeworkEntry.dateDue) + ')'
              }}
            </h2>
            <HomeworkListItem
              :homework-entry="homeworkEntry"
              @update="onChange"
              @delete="onDelete"
            ></HomeworkListItem>
          </div>
        </div>

        <h2 v-if="old_entries.homeworkEntries.length" class="day-title">Alte Einträge</h2>

        <div v-for="(homeworkEntry, key) in old_entries.homeworkEntries" :key="key">
          <HomeworkListItem
            :homework-entry="homeworkEntry"
            @update="onChange"
            @delete="onDelete"
          ></HomeworkListItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background-color: var(--background-color-primary);
}

h1,
h2 {
  color: var(--text-primary-color);

  margin: 0 1vw 1vw;
  font-family: 'Helvetica Neue', serif;
}

.spinner {
  width: 5rem;
  height: 5rem;
  color: var(--text-primary-color);
}

.spinner-small {
  width: 2rem;
  height: 2rem;
  color: var(--text-primary-color);
  margin-right: 3rem;
}

.day-title {
  font-size: 130%;
  font-weight: normal;
  margin: 4vh 1.5vh 1.5vh;
  border-top: solid 1px darkgray;
}
</style>
