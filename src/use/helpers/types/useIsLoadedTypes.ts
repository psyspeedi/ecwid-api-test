import { Ref } from 'vue'

export interface UseIsLoaded {
  isLoaded: Ref<boolean>
  resourceIsLoaded: (value: boolean) => void
}
