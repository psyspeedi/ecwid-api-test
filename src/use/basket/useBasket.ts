import { reactive } from 'vue'
import useLocalStorage from '@/use/helpers/useLocalStorage'
import { Basket, UseBasket } from '@/use/basket/useBasketTypes'

export default function useBasket(): UseBasket {
  const basket = reactive<Basket>({})
  const { setValueToLocalStorage, getValueFromLocalStorage } = useLocalStorage()

  const checkBasketInLocalStorage = (): void => {
    Object.assign(basket, { ...(getValueFromLocalStorage('basket') as Basket) })
  }

  const addToBasket = (productId: number): void => {
    Object.assign(basket, { ...(getValueFromLocalStorage('basket') as Basket) })
    if (!basket[productId]) {
      basket[productId] = 1
      setValueToLocalStorage('basket', basket)
      return
    }

    basket[productId] = basket[productId] + 1
    setValueToLocalStorage('basket', basket)
  }

  const removeFromBasket = (productId: number): void => {
    if (basket[productId] === 1) {
      delete basket[productId]
      setValueToLocalStorage('basket', basket)
      return
    }

    basket[productId] = basket[productId] - 1
    setValueToLocalStorage('basket', basket)
  }

  return {
    basket,
    addToBasket,
    removeFromBasket,
    checkBasketInLocalStorage
  }
}
