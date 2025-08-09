<script setup lang="ts">
  import { useRentalStore } from '@/stores/rental'
  import { onMounted } from 'vue'

  const rentalStore = useRentalStore()

  onMounted(async () => {
    rentalStore.getAllStores()
    if (!rentalStore.customerList || !rentalStore.currentCustomer) rentalStore.getAllCustomers();
})

const customerSelectHandler = async (event: any) => {
  const userId = event.target.value
  await rentalStore.loginAsCustomer(userId)
  rentalStore.currentCustomer = rentalStore.customerList?.find((customer) => customer.userId == userId)
  rentalStore.getOpenRentalByCustomer()
}

const storeSelectHandler = (event: any) => {
  rentalStore.currentStoreNumber = event.target.value
  if (rentalStore.selectedArticleDetails) {
    rentalStore.getArticleDetails(rentalStore.selectedArticleDetails.identificationNumber)
  }
}
</script>

<template>
  <div>
    Eingeloggt als Kunde
    <select name="customers" id="customers" @change="customerSelectHandler($event)">
      <option v-for="customer in rentalStore.customerList" :value="customer.userId" :key="customer.userId">{{ customer.firstName }} {{ customer.lastName }} ({{ customer.userId }})</option>
    </select>
  </div>
  <div>
    Filiale
    <select name="itemStores" id="itemStores" @change="storeSelectHandler($event)">
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
