<template>
    <div class="wrap">
        <div @click="goToArticleDetails()">
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
import { useRentalStore } from '@/stores/rental'

const router = useRouter();

const props = defineProps<{ article: Article }>()

function goToArticleDetails() {
    router.push({ path: '/article/' + props.article.identificationNumber })
}

</script>

<style scoped>
.wrap {
    background-color: rgba(249, 251, 255, 0.9);
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 8px;
    width: 500px;
    height: 110px;
    margin-top: 5px;
}

.deleteDialog {
    margin-left: 35%;
    padding-top: 10px;
}

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

.doneIcon {
    height: 22px;
    width: 22px;
}

.progressIcon {
    margin-top: -6px;
    margin-left: -6px;
    height: 28px;
    width: 28px;
}

.actionButtons {
    margin-left: 30px;
    float: left;
}

.editButton {
    margin-top: -3px;
    cursor: pointer;
    height: 45px;
    width: 45px;
}

.deleteButton {
    padding-bottom: 5px;
    cursor: pointer;
    height: 35px;
    width: 35px;
}

.createDate {
    background-color: #5f6d82;
}

.priorityField {
    text-align: center;
    width: 70px;
}

.priorityLow {
    background-color: #9fa79f;
}

.priorityNormal {
    background-color: #6b84b1;
}

.priorityUrgent {
    background-color: #b47869;
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
