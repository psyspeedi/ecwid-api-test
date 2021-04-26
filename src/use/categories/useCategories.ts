import { reactive } from 'vue'
import {
  Categories,
  Category,
  CategoriesStore
} from '@/use/categories/useCategoriesTypes'
import { useRequestUrl } from '@/use/helpers/useRequestUrl'

export function useCategoriesStore(): CategoriesStore {
  const categoriesList = reactive<Categories>([])

  const fetchCategories = async (): Promise<void> => {
    const url: string = useRequestUrl('categories')

    try {
      const response = await fetch(url)

      if (response.status !== 200) throw new Error()

      if (response.status === 200) {
        const data = await response.json()

        const categories: Category[] = data.items.map((el: Category) => {
          el = {
            id: el.id,
            name: el.name,
            imageUrl: el.imageUrl
          } as Category
          return el
        })

        categoriesList.push(...categories)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  return { categoriesList, fetchCategories }
}
