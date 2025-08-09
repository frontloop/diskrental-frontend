import { defineStore } from 'pinia'
import { ref } from 'vue'

import { RentalClient } from '@/api/RentalClient'

import type { Customer } from '@/common/types/customer'
import type { Rental } from '@/common/types/rental'
import type { Article } from '@/common/types/article'

import type { ArticleStore } from '@/common/types/articleStore'
import type { Exemplar } from '@/common/types/exemplar'

export const useRentalStore = defineStore('rental', () => {
    
    const rentalList = ref<Array<Rental>>([])
    const articleList = ref<Array<Article>>([])
    const exemplarList = ref<Array<Exemplar>>([])
    const storeList = ref<Array<ArticleStore>>([])
    const rentalClient: RentalClient = new RentalClient()
    const filterByUserId = ref<string>('')
    const currentStoreNumber = ref<number>()
    const currentCustomer = ref<Customer>()
    const customerList = ref<Customer[]>()
    const selectedArticleDetails = ref<Article>()
    const selectedArticleAvailable = ref<boolean>()

    const getAllStores = async () => {
        try {
            const response = await rentalClient.getAllArticleStores()
            if (response) {
                storeList.value = response
                currentStoreNumber.value = response[0].storeNumber
            }
        } catch (error) {
            return false
        }
    }

    const getAllCustomers = async () => {
        try {
            const response = await rentalClient.getAllCustomers()
            if (response) {
                customerList.value = response
                currentCustomer.value = customerList.value[0]
                await loginAsCustomer(customerList.value[0].userId)
            }
        } catch (error) {
            return false
        }
    }

    const loginAsCustomer = async (userId: number) => {
        await rentalClient.loginAsCustomer(userId)
    }

    const rentExemplar = async (articleIdentificationNumber: string) => {
        try {
            const response = await rentalClient.rentExemplar(articleIdentificationNumber)
            if (!response || response == null) throw new Error('Etwas ist schief gelaufen')
                return true
        } catch (error) {
            return false
        }
    }

    const returnExemplar = async (exemplarIdentificationNumber: string) => {
        try {
            const response = await rentalClient.returnExemplar(
                { 
                    exemplarIdentificationNumber: exemplarIdentificationNumber,
                    storeNumber: currentStoreNumber.value == undefined ? 0 : currentStoreNumber.value
                })
            if (!response || response == null) throw new Error('Etwas ist schief gelaufen')
                if (currentCustomer.value) {
                    getOpenRentalByCustomer()
                }
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
        if (currentCustomer.value) {
            try {
                const response = await rentalClient.getOpenRentalUserId(currentCustomer.value.userId)
            if (response) {
                rentalList.value = response;
            }
            } catch (error) {
                return false
            }
        } else {
            await getAllCustomers();
            getOpenRentalByCustomer();
        }
    }

    async function getArticles() {
        try {
        const response = await rentalClient.getArticles()
        if (response) {
            articleList.value = response;
        }
        } catch (error) {
            return false
        }
    }

    const getArticleDetails = async (identificationNumber: string) => {

    try {
        const response = await rentalClient.getArticle(identificationNumber);

        if (response) {
            selectedArticleDetails.value = response;
        }
    } catch (error) {
        return false
    }

    if (currentStoreNumber.value) {
        try {
            const response = await rentalClient.getAvailableExemplars(identificationNumber, currentStoreNumber.value)
        if (response) {
            selectedArticleAvailable.value = response.length > 0;
        }
        } catch (error) {
            return false
        }
    } else {
        selectedArticleAvailable.value = false;
    }
}

    const getAvailableExemplars = async (articleIdentificationNumber: string) => {
        if (currentStoreNumber.value) {
            try {
            const response = await rentalClient.getAvailableExemplars(articleIdentificationNumber, currentStoreNumber.value)
            if (response) {
                exemplarList.value = response;
            }
            } catch (error) {
                return false
            }
        }
    }

    return {
        rentalList,
        articleList,
        exemplarList,
        filterByUserId,
        storeList,
        currentStoreNumber,
        currentCustomer,
        customerList,
        selectedArticleDetails,
        selectedArticleAvailable,
        getOpenRentalByCustomer,
        getOpenRental,
        rentExemplar,
        returnExemplar,
        getAvailableExemplars,
        getArticles: getArticles,
        getAllStores,
        getAllCustomers,
        loginAsCustomer,
        getArticleDetails
    }
})