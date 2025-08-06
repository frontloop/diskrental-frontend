import { defineStore } from 'pinia'
import { ref } from 'vue'

import { RentalClient } from '@/api/RentalClient'

import type { Rental } from '@/common/types/rental'
import type { Item } from '@/common/types/item'
import type { RentalPost } from '@/common/types/rentalPost'
import type { ReturnExemplar } from '@/common/types/returnExemplar'
import type { ItemStore } from '@/common/types/itemStore'
import type { Exemplar } from '@/common/types/exemplar'

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
    const itemList = ref<Array<Item>>([])
    const exemplarList = ref<Array<Exemplar>>([])
    const storeList = ref<Array<ItemStore>>([])
    const rentalClient: RentalClient = new RentalClient()
    const filterByUserId = ref<string>('')
    const currentStoreNumber = ref<number>()

    const getAllStores = async () => {
        try {
            const response = await rentalClient.getAllItemStores()
            if (response) {
                storeList.value = response
                currentStoreNumber.value = response[0].storeNumber
            }
        } catch (error) {
            return false
        }
    }

    const rentExemplar = async () => {
        try {
            const response = await rentalClient.rentExemplar(rentalForm.value)
            if (!response || response == null) throw new Error('Etwas ist schief gelaufen')
                return true
        } catch (error) {
            return false
        }
    }

    const returnExemplar = async (exemplarIdentificationNumber: string) => {
        try {
            const response = await rentalClient.returnExemplar({ exemplarIdentificationNumber: exemplarIdentificationNumber, storeNumber: currentStoreNumber.value == undefined ? 0 : currentStoreNumber.value })
            if (!response || response == null) throw new Error('Etwas ist schief gelaufen')
                getOpenRentalByCustomer()
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

    async function getOpenRentalByCustomer() {
        if (filterByUserId.value && filterByUserId.value.length >= 3) {
            try {
            const response = await rentalClient.getOpenRentalByCustomer(Number(filterByUserId.value))
            if (response) {
                rentalList.value = response;
            }
            } catch (error) {
                return false
            }
        } else if (filterByUserId.value.length == 0) {

            getOpenRental();
        }
    }

    async function getItems() {
        try {
        const response = await rentalClient.getItems()
        if (response) {
            itemList.value = response;
        }
        } catch (error) {
            return false
        }
    }

    async function getAvailableExemplars(itemId: string) {
        try {
        const response = await rentalClient.getAvailableExemplars(itemId)
        if (response) {
            exemplarList.value = response;
        }
        } catch (error) {
            return false
        }
    }

    return {
        rentalForm,
        returnForm,
        rentalList,
        itemList,
        exemplarList,
        filterByUserId,
        storeList,
        currentStoreNumber,
        getOpenRentalByCustomer,
        getOpenRental,
        rentExemplar,
        returnExemplar,
        getAvailableExemplars,
        getItems,
        getAllStores
    }
})