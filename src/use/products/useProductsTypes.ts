export interface Product {
  id: number
  name: string
  description?: string
  price: number
  imageUrl: string
}

export type Products = Product[]

export interface ProductsStore {
  productsList: Products
  fetchProducts: (categoryId: number) => void
  fetchProduct: (productId: string) => Promise<Product | void>
}
