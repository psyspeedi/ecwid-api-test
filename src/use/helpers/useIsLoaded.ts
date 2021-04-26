import { ref } from 'vue'
import { UseIsLoaded } from '@/use/helpers/types/useIsLoadedTypes'

export default function useIsLoaded(): UseIsLoaded {
  const isLoaded = ref<boolean>(false)

  const resourceIsLoaded = (value: boolean): void => {
    isLoaded.value = value
  }

  return {
    isLoaded,
    resourceIsLoaded
  }
}
