import { Basket } from '@/use/basket/useBasketTypes'
import { UseLocalStorage } from '@/use/helpers/types/useLocalStorageTypes'

export default function useLocalStorage(): UseLocalStorage {
  const setValueToLocalStorage = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getValueFromLocalStorage = (key: string): Basket => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : {}
  }

  return {
    setValueToLocalStorage,
    getValueFromLocalStorage
  }
}
