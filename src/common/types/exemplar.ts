import type { Item } from "./item"
import type { ItemStore } from "./itemStore"

export interface Exemplar {
    id: string
    identificationNumber: string
    item: Item
    condition: Number
    inventoriedDate: string
    store: ItemStore
}