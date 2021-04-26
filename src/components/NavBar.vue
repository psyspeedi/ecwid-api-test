<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'
  import { useRouter } from 'vue-router'

  import Button from 'primevue/button'
  import { UseBasket } from '@/use/basket/useBasketTypes'

  export default defineComponent({
    name: 'NavBar',
    components: { Button },
    setup() {
      const router = useRouter()

      const { basket } = inject('basket') as UseBasket

      function goToRoute(routeName: string) {
        return router.push({ name: routeName })
      }

      const totalCountInCart = computed((): number => {
        return Object.values(basket).reduce((acc: number, value: number) => {
          acc += value
          return acc
        }, 0)
      })

      return {
        goToRoute,
        totalCountInCart
      }
    }
  })
</script>

<template>
  <div class="navbar">
    <Button
      @click="goToRoute('Catalog')"
      label="Каталог"
      class="p-button-outlined"
    />
    <Button
      @click="goToRoute('Basket')"
      label="Корзина"
      icon="pi pi-shopping-cart"
      :badge="totalCountInCart.toString()"
    />
  </div>
</template>

<style>
  .navbar {
    background: #f8f9fa;
    width: 100%;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid #dee2e5;
    margin-bottom: 20px;
  }
</style>
