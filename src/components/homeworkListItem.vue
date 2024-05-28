<script setup lang="ts">
import {type PropType, ref} from 'vue'
import type { homework } from '@/scripts/types/homework.interface'
import { computed } from 'vue'
import apiService from '@/scripts/api.service'

const props = defineProps({
  homeworkEntry: {
    type: Object as PropType<homework>,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

const mobileWidth = ref(window.screen.width <= 700)

const divClass = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (props.homeworkEntry.completed) {
    return 'completed'
  } else {
    if (props.homeworkEntry.dateDue.getDate() === tomorrow.getDate()) {
      return 'dueTomorrow'
    } else if (props.homeworkEntry.dateDue <= new Date()) {
      return 'dueInPast'
    } else {
      return 'dueInFuture'
    }
  }
})

const buttonClass = computed(() => {
  if (props.homeworkEntry.completed) {
    return 'btn-danger'
  } else {
    return 'btn-success'
  }
})

const buttonText = computed(() => {
  if (props.homeworkEntry.completed) {
    return 'Nicht abschließen'
  } else {
    return 'Abschließen'
  }
})

function complete() {
  apiService.updateHomework(props.homeworkEntry?.id, !props.homeworkEntry?.completed)

  let array: number

  if (!props.homeworkEntry.completed) {
    array = 1
  } else if (props.homeworkEntry.completed && props.homeworkEntry?.dateDue > new Date()) {
    array = 2
  } else {
    array = 3
  }

  console.log(array)

  emit('update', props.homeworkEntry?.id, array)
}

function deleteHomework() {
  apiService.deleteHomework(props.homeworkEntry?.id)

  let array: number

  if (!props.homeworkEntry.completed) {
    array = 1
  } else if (props.homeworkEntry.completed && props.homeworkEntry?.dateDue > new Date()) {
    array = 2
  } else {
    array = 3
  }

  emit('delete', props.homeworkEntry?.id, array)
}
</script>

<template>
  <div
    class="d-flex justify-content-between align-items-center mb-3 align-middle list-item"
    :class="[ divClass, {'flex-column': mobileWidth}]"
  >
    <div v-if="mobileWidth" class="d-flex flex-row justify-content-between align-items-center align-middle">
      <div class="p-2 col-sm-2">
        <h1>{{ homeworkEntry.subject }}</h1>
      </div>
      <div class="p-2 col-sm-2">
        <h1>{{ homeworkEntry.teacher }}</h1>
      </div>
    </div>

    <div v-if="!mobileWidth" class="p-2 col-sm-2">
      <h1>{{ homeworkEntry.subject }}</h1>
    </div>
    <div v-if="!mobileWidth" class="p-2 col-sm-2">
      <h2>{{ homeworkEntry.teacher }}</h2>
    </div>

    <div class="p-2 flex-lg-grow-1">
      <p class="fs-6">{{ homeworkEntry.text }}</p>
    </div>
    <div class="p-2 col-sm-2 text-center">
      <button class="btn btn-lg" :class="buttonClass" @click="complete">{{ buttonText }}</button>
    </div>
    <div class="p-2 text-center" :class="{ hidden: props.homeworkEntry?.id > 0 }">
      <i class="bi bi-trash3 delete" @click="deleteHomework"></i>
    </div>
  </div>
</template>

<style scoped>
.list-item {
  border-radius: 10px;
  margin: 2vh 1vw;
  padding: 1vw;
}

.list-item > div > * {
  margin: 0;
}

h1,
h2,
p {
  color: var(--bs-body-color);
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

.hidden {
  visibility: hidden;
}

.delete {
  font-size: 1.5rem;
  cursor: pointer;
  color: darkred;
}
</style>
