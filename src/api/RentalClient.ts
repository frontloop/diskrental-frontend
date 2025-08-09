import { RestClient } from '../api/BaseClient'
import type { Rental } from '@/common/types/rental'
import type { Customer } from '@/common/types/customer'
import type { Article } from '@/common/types/article'
import type { Exemplar } from '@/common/types/exemplar'
import type { ReturnExemplar } from '@/common/types/returnExemplar'
import type { ArticleStore } from '@/common/types/articleStore'

export class RentalClient {
    private endpoint = '/rental'

    async getAllCustomers(): Promise<Customer[] | null> {
        return this.handleResponse(await RestClient.get<Customer[]>(this.endpoint + '/customers'))
    }

    async rentExemplar(articleIdentificationNumber: string): Promise<Rental | null> {
        return this.handleResponse(await RestClient.get<Rental>(this.endpoint + '/rent/' + articleIdentificationNumber))
    }

    async loginAsCustomer(userId: number): Promise<Customer | null> {
        return this.handleResponse(await RestClient.get<Customer>(this.endpoint + '/login/' + userId))
    }

    async returnExemplar(data: ReturnExemplar): Promise<Rental | null> {
        return this.handleResponse(await RestClient.put<ReturnExemplar>(this.endpoint + '/return', data))
    }

    async getAvailableExemplars(identificationNumber: string, articleStoreNumber: number): Promise<Exemplar[] | null> {
        return this.handleResponse(await RestClient.get<Exemplar[]>(this.endpoint + '/exemplars/' + articleStoreNumber + '/' + identificationNumber + '/available'))
    }

    async getOpenRentalUserId(userId: number): Promise<Rental[] | null> {
        return this.handleResponse(await RestClient.get<Rental[]>(this.endpoint + '/' + userId + '/open'))
    }

    async getOpenRental(): Promise<Rental[] | null> {
        return this.handleResponse(await RestClient.get<Rental[]>(this.endpoint + '/open'))
    }

    async getArticle(articleIdentificationNumber: string): Promise<Article | null> {
        return this.handleResponse(await RestClient.get<Article>(this.endpoint + '/article/' + articleIdentificationNumber))
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
