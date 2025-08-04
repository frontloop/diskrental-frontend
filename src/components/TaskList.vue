<template>
  <div class="taskListContainer">
    <div class="taskList">
      <NewTaskButton class="newtaskbutton" @click="taskStore.taskEditorOpen = true" />
        <TaskRow v-for="task in taskStore.taskList" :task="task" />
    </div>
    <div v-if="taskStore.taskEditorOpen" class="editorBackground"></div>
    <TaskEditor v-if="taskStore.taskEditorOpen" @ontasksaved="taskStore.taskEditorOpen = false" class="editor"/>
  </div>
  </template>

<script setup lang="ts">
import TaskRow from '@/components/TaskRow.vue'
import NewTaskButton from '@/components/NewTaskButton.vue'
import TaskEditor from '@/components/TaskEditor.vue'
import { useTaskStore } from '@/stores/task';

const taskStore = useTaskStore()

</script>

<style scoped>
  .taskListContainer {
    width: 750px;
    background-color: rgba(182, 194, 204, 0.9);
    padding-top: 20px;
    padding-bottom: 20%;
    border-left: 5px dotted rgba(255, 255, 255, 0.6);
    border-right: 5px dotted rgba(255, 255, 255, 0.6);
  }

  .taskList {
    width: 520px;
    margin: auto;
  }

  .editor {
    position: fixed;
    margin-left: 100px;
    top: 250px;
    width: 500px;
    filter: drop-shadow(2px -2px 14px #404040);
}

.editorBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(222, 228, 232, 0.6);
}
</style>