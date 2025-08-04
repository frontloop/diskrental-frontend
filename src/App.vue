<script setup lang="ts">
import TaskList from './components/TaskList.vue'
import TaskEditor from './components/TaskEditor.vue'
import { onMounted } from 'vue'

import { useTaskStore } from '@/stores/task';

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.getAll()
})

</script>

<template>
  <div class="wrap">
    <TaskList />
  </div>
</template>

<style scoped>
.wrap {
  margin: auto;
  width: 45%;
  height: 100%;
}

</style>
