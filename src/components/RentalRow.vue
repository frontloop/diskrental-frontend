<template>
    <div class="wrap">
        <div>
            <div class="headLabel">{{ rental.exemplar.article.title }}</div>
            <p class="details">
                <div class="createDate">Geliehen am: {{ displayDate(rental.rentStartDate, true) }}</div>
            </p>
            <div class="actionButtons">
                <img src="/return-button.png" @click="returnExemplar(rental.exemplar.identificationNumber)" class="returnButton">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Rental } from '@/common/types/rental'
import { useRentalStore } from '@/stores/rental'

const rentalStore = useRentalStore()

const props = defineProps<{ rental: Rental }>()

const returnExemplar = (exemplarIdentificationNumber: string) => {
    rentalStore.returnExemplar(exemplarIdentificationNumber);
}

const displayDate = (created: string, showTime: boolean) => {
    const date = new Date(created).toLocaleDateString();
    const time = new Date(created).toLocaleTimeString();
    let returnString: string = date;
    if (showTime) returnString += ' um ' + time
    return returnString;
}

</script>

<style scoped>

.headLabel {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    color: #46494e;
}

.details div {
    float: left;
    margin-right: 10px;
    padding: 10px;
    border-radius: 6px;
    color: #e0e5e7;
    font-family: Arial, Helvetica, sans-serif;
}

.returnButton {
    margin-top: -3px;
    cursor: pointer;
    height: 45px;
    width: 45px;
}

.createDate {
    background-color: #5f6d82;
}

button {
  background-color: #5b7891; /* Green */
  border: none;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  padding: 4px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
