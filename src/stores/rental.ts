import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Rental } from '@/common/types/rental'
import { RentalClient } from '@/api/RentalClient'
import { RentalPost } from '@/common/types/rentalPost'
import { ReturnExemplar } from '@/common/types/returnExemplar'

export const useRentalStore = defineStore('rental', () => {

    const getEmptyRentalForm = () => {
            return {userId: -1, exemplarIdentificationNumber: '', rentalDuration: -1}
        }

    const getEmptyReturnForm = () => {
            return {exemplarIdentificationNumber: '', storeNumber: -1}
        }
    
    const rentalForm = ref<RentalPost>(getEmptyRentalForm())
    const returnForm = ref<ReturnExemplar>(getEmptyReturnForm())
    const rentalList = ref<Array<Rental>>([])
    const rentalClient: RentalClient = new RentalClient()

    const rentExemplar = async () => {
        try {
            const response = await rentalClient.rentExemplar(rentalForm.value)
            if (!response || response == null) throw new Error('Etwas ist schief gelaufen')
                return true
        } catch (error) {
            return false
        }
    }

    const returnExemplar = async () => {
        try {
            const response = await rentalClient.returnExemplar(returnForm.value)
            if (!response || response == null) throw new Error('Etwas ist schief gelaufen')
                return true
        } catch (error) {
            return false
        }
    }

    return {
        rentalForm,
        returnForm,
        rentalList,
        rentExemplar,
        returnExemplar
    }
})