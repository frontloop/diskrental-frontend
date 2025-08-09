<template>
  <div class="taskListContainer">
    <div class="taskList">
        <ArticleRow v-for="article in rentalStore.articleList" :article="article" />
    </div>
  </div>
  </template>

<script setup lang="ts">
import { useRentalStore } from '@/stores/rental'
import ArticleRow from './ArticleRow.vue';

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
</style>