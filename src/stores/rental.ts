import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Rental } from '@/common/types/rental'
import { RentalClient } from '@/api/RentalClient'

export const useRentalStore = defineStore('rental', () => {
    
    const rentalList = ref<Array<Rental>>([])
    const rentalClient: RentalClient = new RentalClient()

    const returnExemplar = async () => {
        try {
            const response = await rentalClient.save(editedDask.value)
            if (!response || response == null) throw new Error('Task konnte nicht gespeichert werden')
                getAll();
                resetEditedTask()
                return true
        } catch (error) {
            return false
        }
    }

    const rentExemplar = async () => {
        try {
            const response = await taskClient.create(editedDask.value)
            if (!response || response == null) throw new Error('Task konnte nicht angelegt werden')
                getAll();
                resetEditedTask()
                return true
        } catch (error) {
            return false
        }
    }

    return {
        rentalList,
        create,
        save,
        setEditTask,
    }
})