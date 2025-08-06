import { RestClient } from '../api/BaseClient'
import type { Rental } from '@/common/types/rental'
import type { Item } from '@/common/types/item'
import type { RentalPost } from '@/common/types/rentalPost'
import type { ReturnExemplar } from '@/common/types/returnExemplar'
import type { ItemStore } from '@/common/types/itemStore'

export class RentalClient {
    private endpoint = '/rental'

    async rentExemplar(data: RentalPost): Promise<Rental | null> {
        return this.handleResponse(await RestClient.post<RentalPost>(this.endpoint + '/rent', data))
    }

    async returnExemplar(data: ReturnExemplar): Promise<Rental | null> {
        console.log(data.exemplarIdentificationNumber, data.storeNumber)
        return this.handleResponse(await RestClient.put<ReturnExemplar>(this.endpoint + '/return', data))
    }

    async getOpenRentalUserId(userId: number): Promise<Rental[] | null> {
        return this.handleResponse(await RestClient.get<Rental[]>(this.endpoint + '/' + userId + '/open'))
    }

    async getOpenRental(): Promise<Rental[] | null> {
        return this.handleResponse(await RestClient.get<Rental[]>(this.endpoint + '/open'))
    }

    async getOpenRentalByCustomer(userId: number): Promise<Rental[] | null> {
        return this.handleResponse(await RestClient.get<Rental[]>(this.endpoint + '/'+ userId + '/open'))
    }

    async getItems(): Promise<Item[] | null> {
        return this.handleResponse(await RestClient.get<Item[]>(this.endpoint + '/items'))
    }

    async getAllItemStores(): Promise<ItemStore[] | null> {
        return this.handleResponse(await RestClient.get<ItemStore[]>(this.endpoint + '/stores'
        ))
    }

    async handleResponse(response: any): Promise<any | null> {
        if (response.ok()) {
            return await response.json()
        } else {
            return Promise.reject()
        }
    }
}
