<script setup lang="ts">
import HomeworkHeader from '@/components/homeworkHeader.vue'
import CreateHomeworkForm from '@/components/createHomeworkForm.vue'
</script>

<template>
  <homework-header title="Hausaufgabe erstellen" :button="false"></homework-header>

  <CreateHomeworkForm class="mt-4"></CreateHomeworkForm>
</template>

<style scoped></style>
