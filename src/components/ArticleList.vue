<template>
  <div class="itemListContainer">
    <div class="itemList">
        <ArticleRow v-for="article in rentalStore.articleList" :article="article" />
    </div>
  </div>
  </template>

<script setup lang="ts">
import { useRentalStore } from '@/stores/rental'
import ArticleRow from './ArticleRow.vue';

const rentalStore = useRentalStore()

</script>