export interface UseLocalStorage {
  setValueToLocalStorage: (key: string, value: unknown) => void
  getValueFromLocalStorage: (key: string) => unknown
}
