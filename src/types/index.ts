export type CardViewProps = {
    title: string
    description: string
    imageUrl: string
    imagePosition?: "left" | "right" | string
    fontSize?: "text-sm" | "text-base" | string// 対応：9pt ≒ text-sm, 12pt ≒ text-base
}

export type Card = {
    title: string
    description: string
    imageUrl: string
    word?: string
    question?: string
}

export type Question = {
  question: string
  word: string
  options: string[]
}