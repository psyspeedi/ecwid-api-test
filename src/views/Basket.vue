<script lang="ts">
  import { onMounted, defineComponent, inject, reactive } from 'vue'
  import Button from 'primevue/button'
  import ProgressSpinner from 'primevue/progressspinner'
  import Toast from 'primevue/toast'
  import { useToast } from 'primevue/usetoast'
  import { useProductsStore } from '@/use/products/useProducts'
  import {
    Basket,
    BasketProductItem,
    BasketProducts,
    UseBasket
  } from '@/use/basket/useBasketTypes'
  import useIsLoaded from '@/use/helpers/useIsLoaded'
  import BasketItem from '@/components/BasketItem.vue'
  import { UseIsLoaded } from '@/use/helpers/types/useIsLoadedTypes'

  export default defineComponent({
    name: 'Cart',
    components: { Button, BasketItem, ProgressSpinner, Toast },
    setup() {
      const { basket, removeFromBasket } = inject('basket') as UseBasket
      const { fetchProduct } = useProductsStore()
      const products = reactive<BasketProducts>([])
      const { isLoaded, resourceIsLoaded } = useIsLoaded() as UseIsLoaded

      const toast = useToast()

      const fetchInfoProductsInBasket = async (basket: Basket) => {
        const promiseArray = Object.keys(basket).map((productId: string) =>
          fetchProduct(productId as string)
        )

        await Promise.all(promiseArray).then((value: unknown) => {
          const basketProducts = (value as BasketProducts).map(
            (el: BasketProductItem) =>
              ({
                ...el,
                count: basket[el.id]
              } as BasketProductItem)
          )

          products.splice(0, products.length)
          products.push(...basketProducts)
        })
      }

      const removeFromBasketHandler = async (productId: number) => {
        removeFromBasket(productId)

        const productIndex: number = products.findIndex(
          (el: BasketProductItem) => el.id === productId
        )

        if (products[productIndex].count === 1) {
          return products.splice(productIndex, 1)
        }

        products[productIndex].count--
      }

      const checkout = (): void => {
        toast.add({
          severity: 'success',
          summary: 'Поздравляем!',
          detail: 'Вы нажали "офорить заказ" :)',
          life: 3000
        })
      }

      onMounted(async () => {
        if (!Object.keys(basket).length) {
          return resourceIsLoaded(true)
        }

        await fetchInfoProductsInBasket(basket as Basket)
        resourceIsLoaded(true)
      })

      return {
        products,
        isLoaded,
        removeFromBasketHandler,
        checkout
      }
    }
  })
</script>

<template>
  <Toast />
  <div class="cart" v-if="isLoaded">
    <h3 style="text-align: center" v-if="!products.length">
      Ой, кажется в корзине ничего нет :(
    </h3>

    <template v-else>
      <BasketItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @removeItemFromBasket="removeFromBasketHandler"
      />
      <Button
        label="Оформить заказ"
        @click="checkout"
        style="margin: 15px auto 0 auto"
      />
    </template>
  </div>

  <div class="loader" v-else-if="!isLoaded">
    <ProgressSpinner />
  </div>
</template>

<style>
  .cart {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }
</style>
