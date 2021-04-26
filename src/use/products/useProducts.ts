import { reactive } from 'vue'
import {
  Product,
  Products,
  ProductsStore
} from '@/use/products/useProductsTypes'
import { useRequestUrl } from '@/use/helpers/useRequestUrl'

export function useProductsStore(): ProductsStore {
  const productsList = reactive<Products>([])

  const fetchProducts = async (categoryId: number): Promise<void> => {
    const url: string = useRequestUrl('products', { category: categoryId })

    try {
      const response = await fetch(url)

      if (response.status !== 200) throw new Error()

      if (response.status === 200) {
        const data = await response.json()

        const products: Product[] = data.items.map((el: Product) => {
          el = {
            id: el.id,
            name: el.name,
            price: el.price,
            imageUrl: el.imageUrl
          } as Product
          return el
        })

        productsList.splice(0, productsList.length)
        productsList.push(...products)
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  const fetchProduct = async (productId: string): Promise<Product | void> => {
    const url: string = useRequestUrl(`products/${productId}`)

    try {
      const response = await fetch(url)

      if (response.status !== 200) throw new Error()

      if (response.status === 200) {
        const data = await response.json()

        return {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl
        }
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  return { productsList, fetchProducts, fetchProduct }
}
