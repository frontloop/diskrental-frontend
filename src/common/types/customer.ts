import type { Address } from "./address"

export interface Customer {
    id: string
    number: number
    firstName: string
    lastName: string
    address: Address
}