<script setup lang="ts">
import type { PropType } from 'vue'
import type { foodScheduleEntry } from '@/scripts/types/food-schedule.interface'
import { computed, reactive } from 'vue'

const props = defineProps({
  foodEntry: {
    type: Object as PropType<foodScheduleEntry>,
    required: true
  }
})

function getWeekDay(date: Date) {
  const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

  return weekdays[date.getDay()]
}

// function to convert date object to string in format "dd.mm.yyyy"
function dateToString(date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

const cardClass = computed(() => {
  /*
   * sorry for the wierd if statement
   * basically it just checks if either
   *
   * */
  if (
    (props.foodEntry?.date.getDate() === new Date().getDate() &&
      props.foodEntry.date > new Date()) ||
    (props.foodEntry?.date.getDate() === new Date().getDate() + 1 &&
      props.foodEntry.date.getHours() + 1 < new Date().getHours())
  ) {
    return 'card card-active'
  } else {
    return 'card'
  }
})
</script>

<template>
  <div :class="cardClass">
    <div class="card-header">
      <h2 class="card-title text-center">{{ getWeekDay(props.foodEntry.date) }}</h2>
      <h4 class="card-subtitle mb-2 text-center">{{ dateToString(props.foodEntry.date) }}</h4>
    </div>

    <div class="card-body">
      <p class="card-text">{{ props.foodEntry.text }}</p>
    </div>
  </div>
</template>

<style scoped>
h2,
h4,
p {
  color: var(--text-primary-color);
}

p {
  font-size: 110%;
}

.card {
  background-color: var(--background-color-secondary);
  height: 100%;
}

.card-active {
  background-color: var(--background-color-primary);
}
</style>
