import type { Address } from "./address"

export interface Customer {
    id: string
    userId: number
    firstName: string
    lastName: string
    address: Address
}