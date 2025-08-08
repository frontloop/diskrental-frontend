import type { Customer } from "./customer"
import type { Exemplar } from "./exemplar"
import type { ArticleStore } from "./articleStore"

export interface Rental {
    id: string,
    exemplar: Exemplar
    customer: Customer
    rentStartDate: string
    returnDate: string
    closed: boolean
    originStore: ArticleStore
    returnStore: ArticleStore
}