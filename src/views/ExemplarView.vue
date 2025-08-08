<script setup lang="ts">
import ExemplarList from '@/components/ExemplarList.vue'
import { useRentalStore } from '@/stores/rental'
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'

const route = useRoute();

const rentalStore = useRentalStore()

onMounted(() => {
  rentalStore.getAvailableExemplars(route.params.itemId.toString())
})


</script>

<template>
    <ExemplarList />
</template>