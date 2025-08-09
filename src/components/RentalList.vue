<template>
  <div class="articleListContainer">
    <div class="articleList">
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
    .articleListContainer {
        width: 750px;
        background-color: rgba(182, 194, 204, 0.9);
        padding-top: 20px;
        padding-bottom: 20%;
        border-left: 5px dotted rgba(255, 255, 255, 0.6);
        border-right: 5px dotted rgba(255, 255, 255, 0.6);
    }

    .field {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #595a5c;
}

    .center-block {
        display: block;
        margin:auto;
    }

    .articleList {
        width: 520px;
        margin: auto;
    }
</style>