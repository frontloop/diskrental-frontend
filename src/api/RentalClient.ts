import type { Rental } from '@/common/types/rental'
import { RestClient } from '../api/BaseClient'
import type { RentalPost } from '@/common/types/rentalPost'
import type { ReturnExemplar } from '@/common/types/returnExemplar'

export class RentalClient {
    private endpoint = '/rental'

    async rentExemplar(data: RentalPost): Promise<Rental | null> {
        return this.handleResponse(await RestClient.post<RentalPost>(this.endpoint + '/rent', data))
    }

    async returnExemplar(data: ReturnExemplar): Promise<Rental | null> {
        return this.handleResponse(await RestClient.put<ReturnExemplar>(this.endpoint + '/return', data))
    }

    async getOpenRentalByCustomer(userId: number): Promise<Rental[] | null> {
            return this.handleResponse(await RestClient.get<Rental[]>(this.endpoint + '/' + userId + '/open'))
        }

    async handleResponse(response: any): Promise<any | null> {
        if (response.ok()) {
            return await response.json()
        } else {
            return Promise.reject()
        }
    }
}
