<script setup lang="ts">
import HomeworkHeader from '@/components/homeworkHeader.vue'
import HomeworkList from '@/components/homeworkList.vue'
import Sidebar from "@/components/sidebar.vue";
import {ref} from "vue";

const sidebarVisible = ref(false)

const key = ref(0)

function reload() {
  sidebarVisible.value = false
  key.value++
}


</script>

<template>

  <homework-header @toggle-sidebar="sidebarVisible = !sidebarVisible"></homework-header>

  <HomeworkList :key="key"></HomeworkList>

  <Sidebar :visible="sidebarVisible" @toggle="sidebarVisible = !sidebarVisible" @reload="reload"></Sidebar>

</template>

<style scoped></style>
