<script setup lang="ts">
import apiService from '@/scripts/api.service'
import FoodCarouselItem from '@/components/foodCarouselItem.vue'
import { onBeforeMount, reactive } from 'vue'
import type { foodScheduleEntry } from '@/scripts/types/food-schedule.interface'

const foodSchedule = reactive({
  FoodScheduleItems: [] as foodScheduleEntry[]
})

onBeforeMount(() => {
  getFoodSchedule()
})

function getFoodSchedule() {
  apiService.getFood().then((response) => {
    response.forEach((foodScheduleEntry) => {
      foodSchedule.FoodScheduleItems.push(foodScheduleEntry)
    })
  })
}

function colClass(date: Date) {
  if (date.getDate() === new Date().getDate()) {
    return 'col'
  } else {
    return 'col'
  }
}
</script>

<template>
  <div class="container mt-lg-5">
    <div class="row">
      <div
        v-for="(foodScheduleEntry, key) in foodSchedule.FoodScheduleItems"
        :key="key"
        :class="colClass(foodScheduleEntry.date)"
      >
        <food-carousel-item :food-entry="foodScheduleEntry"></food-carousel-item>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
