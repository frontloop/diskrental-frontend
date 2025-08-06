<template>
  <div class="taskListContainer">
    <div class="taskList">
        <ExemplarRow v-for="exemplar in rentalStore.exemplarList" :exemplar="exemplar" />
    </div>
  </div>
  </template>

<script setup lang="ts">
import { useRentalStore } from '@/stores/rental'
import ExemplarRow from './ExemplarRow.vue';

const rentalStore = useRentalStore()

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