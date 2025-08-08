import type { Article } from "./article"
import type { ArticleStore } from "./articleStore"

export interface Exemplar {
    id: string
    identificationNumber: string
    article: Article
    condition: Number
    inventoriedDate: string
    store: ArticleStore
    available: boolean
}