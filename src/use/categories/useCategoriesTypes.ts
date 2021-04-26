export interface Category {
  id: number
  name: string
  imageUrl: string
}

export type Categories = Category[]

export interface CategoriesStore {
  categoriesList: Categories
  fetchCategories: () => void
}
