<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Card from 'primevue/card'
  import Button from 'primevue/button'
  import { Product } from '@/use/products/useProductsTypes'
  import useIsLoaded from '@/use/helpers/useIsLoaded'

  export default defineComponent({
    name: 'ProductCard',
    components: {
      Card,
      Button
    },
    props: {
      product: {
        type: Object as PropType<Product>,
        default(this: void) {
          return {}
        }
      }
    },
    setup(props, { emit }) {
      const { isLoaded, resourceIsLoaded } = useIsLoaded()

      return {
        isLoaded,
        resourceIsLoaded,
        emit
      }
    }
  })
</script>

<template>
  <Card class="product-card">
    <template #header>
      <div class="empty-image-block" v-show="!isLoaded" />
      <transition name="image">
        <img
          v-show="isLoaded"
          :alt="product.name"
          :src="product.imageUrl"
          @load="resourceIsLoaded(true)"
        />
      </transition>
    </template>
    <template #title>{{ product.name }}</template>
    <template #subtitle>{{ $filters.currencyFilter(product.price) }}</template>
    <template #footer>
      <Button
        icon="pi pi-shopping-cart"
        class="p-button-success"
        label="Купить"
        @click.stop="emit('addToCart', product.id)"
    /></template>
  </Card>
</template>

<style>
  .product-card {
    cursor: pointer;
    border: 2px solid transparent;
    width: 15rem;
    margin: 20px;
  }

  .product-card:hover {
    border-color: #2096f3;
  }

  .product-card .p-card-content {
    display: none;
  }

  .product-card .p-card-subtitle {
    font-size: 20px;
  }
</style>
