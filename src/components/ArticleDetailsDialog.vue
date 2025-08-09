<template>
    <div class="wrap">
        <div>
        <p class="field title">{{ rentalStore.selectedArticleDetails?.title }}</p>
        <p class="field available" v-if="rentalStore.selectedArticleAvailable">Exemplar ist verfügbar!</p>
        <p class="field notAvailable" v-else>Momentan sind alle Exemplare vergeben</p>
        <p v-if="rentalStore.selectedArticleAvailable" class="center">
            <button @click="rent">Leihen</button>
        </p>

        <p class="center">
            <button @click="router.push({path: '/available-exemplars/' + identificationNumber})">Exemplare verwalten</button>
        </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useRentalStore } from '@/stores/rental'

const rentalStore = useRentalStore()

const router = useRouter();
const route = useRoute();

const identificationNumber = route.params.identificationNumber.toString();

onMounted(() => {
    rentalStore.getArticleDetails(identificationNumber);
})



const rent = async () => {
    await rentalStore.rentExemplar(identificationNumber);
    await rentalStore.getOpenRentalByCustomer();
    router.push({ path: '/return' })
}
</script>

<style scoped>
.wrap {
    background-color: #d0dce6;
    border-radius: 15px;
    border: 2px solid #ececec;
    padding: 20px;
}

.wrap div {
    color: rgb(51, 53, 55);
}

.center {
  margin-left: 40%;
}

.field {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #595a5c;
}

.title {
    font-size: large;
}

.available {
    color: #2ba22f;
}

.notAvailable {
    color: #87371c;
}

button {
  background-color: #5b7891; /* Green */
  border: none;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>