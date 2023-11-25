<script setup lang="ts">
import type {PropType} from "vue";
import type {homework} from "@/scripts/api.service";
import {computed} from "vue";

const props = defineProps({
  homeworkEntry: {
    type: Object as PropType<homework>,
    required: true
  }
})

const divClass = computed(() => {
  if (props.homeworkEntry.completed) {
    return "completed"
  } else {
    if (props.homeworkEntry.dateDue.getDate() === new Date().getDate()) {
      return "dueTomorrow"
    } else if (props.homeworkEntry.dateDue < new Date()) {
      return "dueInPast"
    } else {
      return "dueInFuture"
    }
  }
})

</script>

<template>

  <div class="wrapper" :class="divClass">

    <h1 class="subject">{{homeworkEntry.subject}}</h1>

    <h3 class="teacher">{{homeworkEntry.teacher}}</h3>

    <p class="description">{{homeworkEntry.text}}</p>

  </div>

</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr .8fr 4fr 1.5fr .5fr .2fr;
  grid-template-rows: 0.5fr;
  grid-column-gap: 5vw;
  align-items: center;
  border: 1px solid lightgray;
  padding: 4vh;
  margin: .8vw;
}

* {
  font-family: "Helvetica Neue", serif;
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
