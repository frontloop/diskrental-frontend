import { defineStore } from 'pinia'
import { ref } from 'vue'

import { RentalClient } from '@/api/RentalClient'

import type { Rental } from '@/common/types/rental'
import type { RentalPost } from '@/common/types/rentalPost'
import type { ReturnExemplar } from '@/common/types/returnExemplar'

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

    async function getOpenRental() {
        try {
        const response = await rentalClient.getOpenRental()
        if (response) {
            rentalList.value = response;
        }
        } catch (error) {
            return false
        }
    }

    return {
        rentalForm,
        returnForm,
        rentalList,
        getOpenRental,
        rentExemplar,
        returnExemplar
    }
})