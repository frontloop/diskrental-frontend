<script setup lang="ts">
  import { useRentalStore } from '@/stores/rental'
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue'

  const rentalStore = useRentalStore()

  const router = useRouter();

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
  <div id="app">
    <div>
    <span class="selectLabel">Eingeloggt als Kunde</span>
    <select name="customers" id="customers" @change="customerSelectHandler($event)">
      <option v-for="customer in rentalStore.customerList" :value="customer.userId" :key="customer.userId">{{ customer.firstName }} {{ customer.lastName }} ({{ customer.userId }})</option>
    </select>
  </div>
  <div>
    <span class="selectLabel">Filiale</span>
    <select name="itemStores" id="itemStores" @change="storeSelectHandler($event)">
      <option v-for="itemStore in rentalStore.storeList" :value="itemStore.storeNumber" :key="itemStore.storeNumber">{{ itemStore.name }}</option>
    </select>
  </div>
  <div style="margin-left: 38%;">
    <button @click="router.push({ path: '/' })">Artikel Auswählen</button> <button @click="router.push({ path: '/return' })">Geliehene Artikel/Rückgabe</button>
  </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  margin: auto;
  width: 45%;
  height: 100%;
}

button {
  margin-right: 20px;
}

.selectLabel {
  font-family: Arial, Helvetica, sans-serif;
  font-size: medium;
  color: rgb(49, 61, 63);
  margin-right: 5px;
}

</style>
