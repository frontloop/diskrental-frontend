<script setup lang="ts">
import RentalList from './components/RentalList.vue'
import { onMounted } from 'vue'

import { useRentalStore } from '@/stores/rental';

const rentalStore = useRentalStore()

onMounted(() => {
  console.log("------>>> rentalStore.getOpenRental()")
  rentalStore.getOpenRental()
})

</script>

<template>
  <div class="wrap">
    <RentalList />
  </div>
</template>

<style scoped>
.wrap {
  margin: auto;
  width: 45%;
  height: 100%;
}

</style>
