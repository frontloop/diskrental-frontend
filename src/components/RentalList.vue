<template>
  <div class="itemListContainer">
    <div class="itemList">
        <RentalRow v-for="rental in rentalStore.rentalList" :rental="rental" />
    </div>
  </div>
  </template>

<script setup lang="ts">
import { useRentalStore } from '@/stores/rental'
import RentalRow from './RentalRow.vue';
import { onMounted } from 'vue';

const rentalStore = useRentalStore()

onMounted(() => {
    if (rentalStore.currentCustomer) {
        rentalStore.getOpenRentalByCustomer()
    }
})

</script>

<style scoped>
    .field {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #595a5c;
}

    .center-block {
        display: block;
        margin:auto;
    }

    .itemList {
        width: 520px;
        margin: auto;
    }
</style>