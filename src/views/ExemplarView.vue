<script setup lang="ts">
import ExemplarList from '@/components/ExemplarList.vue'
import { useRentalStore } from '@/stores/rental'
import { useRoute } from 'vue-router';

const route = useRoute();

const rentalStore = useRentalStore()

</script>

<template>
    <ExemplarList />
</template>