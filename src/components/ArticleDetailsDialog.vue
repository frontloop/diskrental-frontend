<template>
    <div class="wrap">
        <p class="fieldLabel">{{ article?.title }}</p>
        <p class="fieldLabel">{{ available }}</p>
        <p class="buttons">
            <button @click="rent">Leihen</button>
        </p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { RentalClient } from '@/api/RentalClient';
import type { Article } from '@/common/types/article';
import { ref } from 'vue';

const rentalClient: RentalClient = new RentalClient()

const route = useRoute();

const article = ref<Article>()
const available = ref<boolean>()

onMounted(() => {

    getArticle();
})

const getArticle = async () => {
    const identificationNumber = route.params.identificationNumber.toString();

    try {
        const response = await rentalClient.getArticle(identificationNumber);

        if (response) {
            article.value = response;
        }
    } catch (error) {
        return false
    }

    try {
        const response = await rentalClient.getAvailableExemplars(identificationNumber)
    if (response) {
        available.value = response.length > 0;
    }
    } catch (error) {
        return false
    }
}

const rent = async () => {
    //rentalStore.rentExemplar();
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

.fieldLabel {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #595a5c;
    margin-bottom: 2px;
}

label {
    font-family: Arial, Helvetica, sans-serif;
    color: #595a5c;
}

.buttons {
  display: flex;
  margin-left: 25%;
  margin-top: 30px;
  gap: 40px;
}

.name-input {
    width: 400px;
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