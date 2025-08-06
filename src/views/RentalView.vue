<script setup lang="ts">
import { onMounted } from 'vue'
import ItemList from '@/components/ItemList.vue'
import { useRentalStore } from '@/stores/rental';

const rentalStore = useRentalStore()

onMounted(() => {
  rentalStore.getItems()
})
</script>

<template>
    <ItemList />
</template>