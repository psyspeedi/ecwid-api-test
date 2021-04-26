import { Product } from '@/use/products/useProductsTypes'

export interface Basket {
  [index: number]: number
}

export interface BasketProductItem extends Product {
  count: number
}

export type BasketProducts = BasketProductItem[]

export interface UseBasket {
  basket: Basket
  addToBasket: (productId: number) => void
  removeFromBasket: (productId: number) => void
  checkBasketInLocalStorage: () => void
}
