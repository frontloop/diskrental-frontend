import type { Address } from "./address"

export interface ItemStore {
    id: string
    storeNumber: number
    name: string
    address: Address
}