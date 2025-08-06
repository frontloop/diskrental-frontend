<script setup lang="ts">
import RentalList from '@/components/RentalList.vue'
import { onMounted } from 'vue'

import { useRentalStore } from '@/stores/rental';

const rentalStore = useRentalStore()

onMounted(() => {
  rentalStore.getOpenRental()
})
</script>

<template>
    <RentalList />
</template>