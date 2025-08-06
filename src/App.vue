<script setup lang="ts">
  import { useRentalStore } from '@/stores/rental'
  import type { ItemStore } from './common/types/itemStore';
  import { onMounted } from 'vue'

  const rentalStore = useRentalStore()

  onMounted(() => {
    rentalStore.getAllStores()
})

const selectHandler = (event) => {
  rentalStore.currentStoreNumber = event.target.value
}
</script>

<template>
  <div>
    Filiale
    <select name="itemStores" id="itemStores" @change="selectHandler($event)">
      <option v-for="itemStore in rentalStore.storeList" :value="itemStore.storeNumber" :key="itemStore.storeNumber">{{ itemStore.name }}</option>
    </select>
  </div>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.wrap {
  margin: auto;
  width: 45%;
  height: 100%;
}

</style>
