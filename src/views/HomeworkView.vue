<script setup lang="ts">
import HomeworkHeader from '@/components/homeworkHeader.vue'
import HomeworkList from '@/components/homeworkList.vue'
import { ref } from 'vue'

const key = ref(0)
</script>

<template>
  <homework-header title="Hausaufgaben" @reload="key++"></homework-header>

  <HomeworkList :key="key"></HomeworkList>
</template>

<style scoped></style>
