import { RestClient } from '../api/BaseClient'
import type { Rental } from '@/common/types/rental'
import type { Article } from '@/common/types/article'
import type { Exemplar } from '@/common/types/exemplar'
import type { RentalPost } from '@/common/types/rentalPost'
import type { ReturnExemplar } from '@/common/types/returnExemplar'
import type { ArticleStore } from '@/common/types/articleStore'

export class RentalClient {
    private endpoint = '/rental'

    async rentExemplar(data: RentalPost): Promise<Rental | null> {
        return this.handleResponse(await RestClient.post<RentalPost>(this.endpoint + '/rent', data))
    }

    async returnExemplar(data: ReturnExemplar): Promise<Rental | null> {
        console.log(data.exemplarIdentificationNumber, data.storeNumber)
        return this.handleResponse(await RestClient.put<ReturnExemplar>(this.endpoint + '/return', data))
    }

    async getAvailableExemplars(articleId: string): Promise<Exemplar[] | null> {
        return this.handleResponse(await RestClient.get<Exemplar[]>(this.endpoint + '/exemplars/' + articleId + '/available'))
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

    async getArticles(): Promise<Article[] | null> {
        return this.handleResponse(await RestClient.get<Article[]>(this.endpoint + '/articles'))
    }

    async getAllArticleStores(): Promise<ArticleStore[] | null> {
        return this.handleResponse(await RestClient.get<ArticleStore[]>(this.endpoint + '/stores'
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
