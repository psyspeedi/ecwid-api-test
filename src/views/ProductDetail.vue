<script lang="ts">
  import { defineComponent, PropType, onMounted, inject, reactive } from 'vue'
  import Card from 'primevue/card'
  import Button from 'primevue/button'
  import ProgressSpinner from 'primevue/progressspinner'
  import { useProductsStore } from '@/use/products/useProducts'
  import { useRoute, useRouter } from 'vue-router'
  import useIsLoaded from '@/use/helpers/useIsLoaded'
  import { Product } from '@/use/products/useProductsTypes'
  import { UseBasket } from '@/use/basket/useBasketTypes'

  export default defineComponent({
    name: 'ProductDetailed',
    components: {
      Card,
      Button,
      ProgressSpinner
    },
    props: {
      id: {
        type: String as PropType<string>,
        required: true
      }
    },
    setup(props) {
      const { fetchProduct } = useProductsStore()
      const { isLoaded, resourceIsLoaded } = useIsLoaded()
      const product = reactive({}) as Product
      const router = useRouter()
      const route = useRoute()

      const { addToBasket } = inject('basket') as UseBasket

      onMounted(
        async (): Promise<void> => {
          try {
            Object.assign(product, await fetchProduct(props.id))
          } catch (e) {
            await router.push({
              name: '404',
              params: { pathMatch: route.path.substring(1).split('/') }
            })
          }
        }
      )

      return { product, addToBasket, isLoaded, resourceIsLoaded }
    }
  })
</script>

<template>
  <Card class="product-detailed" v-show="isLoaded">
    <template #header>
      <img
        :alt="product.name"
        :src="product.imageUrl"
        @load="resourceIsLoaded(true)"
      />
    </template>
    <template #title>{{ product.name }}</template>
    <template #subtitle>{{ $filters.currencyFilter(product.price) }}</template>
    <template #content><div v-html="product.description"></div></template>
    <template #footer>
      <Button
        icon="pi pi-shopping-cart"
        class="p-button-success"
        label="Купить"
        @click.stop="addToBasket(product.id)"
      />
    </template>
  </Card>

  <div class="loader" v-show="!isLoaded">
    <ProgressSpinner />
  </div>
</template>

<style>
  .product-detailed {
    display: flex;
    max-width: 70rem;
    width: 100%;
    margin: 0 auto;
  }

  .product-detailed .p-card-subtitle {
    font-size: 20px;
  }
</style>
