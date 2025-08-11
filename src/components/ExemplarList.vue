<template>
  <div class="itemListContainer">
    <div class="itemList">
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
</style>