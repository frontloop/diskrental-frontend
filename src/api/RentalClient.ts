import type { Rental } from '@/common/types/rental'
import { RestClient } from '../api/BaseClient'
import type { RentalPost } from '@/common/types/rentalPost'
import type { ReturnExemplar } from '@/common/types/returnExemplar'

export class TaskClient {
    private endpoint = '/rental'

    async rent(data: RentalPost): Promise<Rental | null> {
        return this.handleResponse(await RestClient.post<RentalPost>(this.endpoint + '/rent', data))
    }

    async return(data: ReturnExemplar): Promise<Rental | null> {
        return this.handleResponse(await RestClient.put<ReturnExemplar>(this.endpoint + '/return', data))
    }

    async handleResponse(response: any): Promise<any | null> {
        if (response.ok()) {
            return await response.json()
        } else {
            return Promise.reject()
        }
    }
}
