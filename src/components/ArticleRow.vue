<template>
    <div class="wrap" style="cursor: pointer;" @click="goToArticleDetails()">
        <div>
            <div class="headLabel">{{ article.title }}</div>
            <p class="details">
                <div class="createDate">{{ article.type }}</div>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '@/common/types/article'
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{ article: Article }>()

async function goToArticleDetails() {
    router.push({ path: '/article/' + props.article.identificationNumber })
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
