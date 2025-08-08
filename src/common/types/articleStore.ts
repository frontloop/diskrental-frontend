import type { Address } from "./address"

export interface ArticleStore {
    id: string
    storeNumber: number
    name: string
    address: Address
}