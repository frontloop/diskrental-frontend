import type { Address } from "./address"

export interface RentalStore {
    id: string
    number: number
    name: string
    address: Address
}