import type { Item } from "./item"
import type { RentalStore } from "./rentalStore"

export interface Exemplar {
    id: string
    identificationNumber: string
    item: Item
    condition: Number
    inventoriedDate: string
    store: RentalStore
}