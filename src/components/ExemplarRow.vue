<template>
    <div class="wrap">
        <div>
            <div class="headLabel">Nummer: {{ exemplar.identificationNumber }}</div>
            <div class="headLabel">Zustand: {{ exemplar.condition }}</div>
            <div class="headLabel">Invinarisiert am: {{ exemplar.inventoriedDate }}</div>
            <div class="headLabel" v-if="exemplar.available">Filiale: {{ exemplar.currentStore.storeNumber }}</div>
            <div class="headLabel notAvailable" v-else><b>Nicht verfügbar</b></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Exemplar } from '@/common/types/exemplar'

const props = defineProps<{ exemplar: Exemplar }>()

</script>

<style scoped>
.notAvailable {
    color: rgb(187, 76, 25);
}
</style>
