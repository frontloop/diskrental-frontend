import type { Address } from "./address"

export interface ItemStore {
    id: string
    number: number
    name: string
    address: Address
}