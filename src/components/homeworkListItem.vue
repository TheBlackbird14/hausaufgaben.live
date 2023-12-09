<script setup lang="ts">
import type {PropType} from "vue";
import type { homework } from "@/scripts/types/homework.interface";
import {computed} from "vue";
import apiService from "@/scripts/api.service";

const props = defineProps({
  homeworkEntry: {
    type: Object as PropType<homework>,
    required: true
  }
})

const divClass = computed(() => {

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (props.homeworkEntry.completed) {
    return "completed"
  } else {
    if (props.homeworkEntry.dateDue.getDate() === tomorrow.getDate()) {
      return "dueTomorrow"
    } else if (props.homeworkEntry.dateDue <= new Date()) {
      return "dueInPast"
    } else {
      return "dueInFuture"
    }
  }
})

const buttonClass = computed(() => {
  if (props.homeworkEntry.completed) {
    return "btn-danger"
  } else {
    return "btn-success"
  }
})

const buttonText = computed(() => {
  if (props.homeworkEntry.completed) {
    return "Nicht abschließen"
  } else {
    return "Abschließen"
  }
})

function complete() {

  apiService.updateHomework(props.homeworkEntry?.id, !props.homeworkEntry?.completed)

}

</script>

<template>

  <div class="d-flex justify-content-between align-items-center mb-3 align-middle list-item" :class="divClass" >

    <div class="p-2 col-sm-2">
      <h1>{{ homeworkEntry.subject }}</h1>
    </div>
    <div class="p-2 col-sm-2">
      <h2>{{ homeworkEntry.teacher }}</h2>
    </div>
    <div class="p-2 flex-lg-grow-1">
      <p class="fs-6">{{ homeworkEntry.text }}</p>
    </div>
    <div class="p-2 col-sm-2">
      <button class="btn btn-lg" :class="buttonClass" @click="complete">{{ buttonText }}</button>
    </div>

  </div>

</template>

<style scoped>

.list-item {
  border-radius: 10px;
  margin: 2vh 1vw;
  padding: 1vw;
}

.list-item > div > *{
  margin: 0;
}

.dueInFuture {
  background-color: rgba(252, 202, 100, 0.7);
}

.dueTomorrow {
  background-color: rgba(252, 100, 100, 0.7);
}

.dueInPast {
  background-color: rgba(136, 136, 136, 0.7);
}

.completed {
  background-color: rgba(100, 252, 100, 0.7);
}

</style>
