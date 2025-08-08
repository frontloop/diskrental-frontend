import type { Article } from "./article"

export interface ArticleDetails {
    article: Article
    availableCount: number
    dialogOpen: boolean
}