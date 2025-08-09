<script setup lang="ts">
import { onMounted } from 'vue'
import ArticleList from '@/components/ArticleList.vue'
import { useRentalStore } from '@/stores/rental';
import { ref } from 'vue'

const rentalStore = useRentalStore()

onMounted(() => {
  rentalStore.getArticles()
})
</script>

<template>
    <ArticleList class="center" />
</template>

<style>
.center {
    margin-left: auto;
    margin-right: auto;
}

</style>