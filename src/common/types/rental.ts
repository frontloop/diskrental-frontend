import type { Customer } from "./customer"
import type { Exemplar } from "./exemplar"
import type { ItemStore } from "./itemStore"

export interface Rental {
    id: string,
    exemplar: Exemplar
    customer: Customer
    rentStartDate: string
    plannedReturnDate: string
    returnDate: string
    closed: boolean
    originStore: ItemStore
    returnStore: ItemStore
}