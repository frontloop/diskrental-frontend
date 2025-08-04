import type { Customer } from "./customer"
import type { Exemplar } from "./exemplar"
import type { RentalStore } from "./rentalStore"

export interface Rental {
    id: string,
    exemplar: Exemplar
    customer: Customer
    rentStartDate: string
    plannedReturnDate: string
    returnDate: string
    closed: boolean
    originStore: RentalStore
    returnStore: RentalStore
}