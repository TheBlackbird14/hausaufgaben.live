<script setup lang="ts">
import apiService from '@/scripts/api.service'
import FoodCarouselItem from '@/components/foodCarouselItem.vue'
import { customRef, onBeforeMount, reactive, ref } from 'vue'
import type { foodScheduleEntry } from '@/scripts/types/food-schedule.interface'
import PommesOMeter from '@/components/pommesOMeter.vue'

const foodSchedule = reactive({
  FoodScheduleItems: [] as foodScheduleEntry[]
})

let percentage = 0

let currentItem = ref(0)

onBeforeMount(() => {
  getFoodSchedule()
})

function getFoodSchedule() {
  apiService.getFood().then((response) => {
    response.forEach((foodScheduleEntry) => {
      foodSchedule.FoodScheduleItems.push(foodScheduleEntry)
    })

    const today = new Date()
    const todaysEntry = foodSchedule.FoodScheduleItems.find((entry) => {
      return entry.date.getDate() === today.getDate()
    })

    if (todaysEntry) {
      const percentages = todaysEntry.probability
      percentage = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length)
      currentItem.value = foodSchedule.FoodScheduleItems.indexOf(todaysEntry)
    }
  })
}

function colClass(date: Date) {
  if (date.getDate() === new Date().getDate()) {
    return 'col'
  } else {
    return 'col'
  }
}

const mobileWidth = ref(window.screen.width <= 767)

window.addEventListener('resize', () => {
  mobileWidth.value = window.screen.width <= 767
})

function changeItem(newItem: number) {
  if (newItem < foodSchedule.FoodScheduleItems.length && newItem >= 0) {
    currentItem.value = newItem
  }

  const percentages = foodSchedule.FoodScheduleItems[currentItem.value].probability
  percentage = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length)
}
</script>

<template>
  <div class="container">
    <div v-if="!mobileWidth" class="row">
      <div
        v-for="(foodScheduleEntry, key) in foodSchedule.FoodScheduleItems"
        :key="key"
        :class="colClass(foodScheduleEntry.date)"
      >
        <food-carousel-item
          :food-entry="foodScheduleEntry"
          @select="changeItem(key)"
          :selected="currentItem === key"
        ></food-carousel-item>
      </div>
    </div>

    <div
      v-else
      class="d-flex flex-row align-items-center justify-content-center"
      style="width: 80%; margin: auto"
    >
      <i
        class="bi bi-caret-left"
        style="font-size: 200%; cursor: pointer"
        @click="changeItem(currentItem - 1)"
        :class="{ faded: currentItem === 0 }"
      ></i>
      <food-carousel-item
        :food-entry="foodSchedule.FoodScheduleItems[currentItem]"
      ></food-carousel-item>
      <i
        class="bi bi-caret-right"
        style="font-size: 200%; cursor: pointer"
        @click="changeItem(currentItem + 1)"
        :class="{ faded: currentItem === foodSchedule.FoodScheduleItems.length - 1 }"
      ></i>
    </div>
  </div>

  <pommes-o-meter v-if="percentage" class="o-meter" :percentage="percentage"></pommes-o-meter>
</template>

<style scoped>
.container {
  margin-top: 2rem;
}

i {
  color: var(--text-primary-color);
}

.faded {
  opacity: 0.5;
}

.o-meter {
  text-align: center;
  margin-top: 2rem;
}
</style>
