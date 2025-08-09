<script setup lang="ts">
import RentalList from '@/components/RentalList.vue'
import { onMounted } from 'vue'

import { useRentalStore } from '@/stores/rental';

const rentalStore = useRentalStore()

onMounted(async () => {
  await rentalStore.getOpenRentalByCustomer()
})
</script>

<template>
    <RentalList class="center" />
</template>

<style>

.center {
    margin-left: auto;
    margin-right: auto;
    display: block;
}

</style>