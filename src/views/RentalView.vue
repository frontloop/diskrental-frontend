<script setup lang="ts">
import { onMounted } from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { useRentalStore } from '@/stores/rental';

const rentalStore = useRentalStore()

onMounted(() => {
  rentalStore.getArticles()
})
</script>

<template>
    <ArticleList />
</template>