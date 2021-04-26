<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Button from 'primevue/button'
  import useIsLoaded from '@/use/helpers/useIsLoaded'
  import { BasketProductItem } from '@/use/basket/useBasketTypes'

  export default defineComponent({
    name: 'CartItem',
    components: { Button },
    props: {
      product: {
        type: Object as PropType<BasketProductItem>,
        required: true
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
  <div class="cart-item">
    <div class="cart-item__left">
      <div class="empty-image-block" v-show="!isLoaded" />
      <transition name="image">
        <img
          v-show="isLoaded"
          width="150"
          height="150"
          :src="product.imageUrl"
          :alt="product.name"
          @load="resourceIsLoaded(true)"
        />
      </transition>
      <div class="cart-item__info">
        <h2>{{ product.name }}</h2>
      </div>
    </div>
    <div class="cart-item__right">
      <h3 class="p-mb-2">
        {{ $filters.currencyFilter(product.price) }} (x{{ product.count }})
      </h3>
      <Button
        @click="emit('removeItemFromBasket', product.id)"
        icon="pi pi-trash"
        class="p-button-danger"
      />
    </div>
  </div>
</template>

<style>
  .cart-item {
    max-height: 150px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
  }

  .cart-item__left {
    display: flex;
  }

  .cart-item .cart-item__left .empty-image-block {
    width: 150px;
    height: 150px;
    background: transparent;
  }

  .cart-item .cart-item__right {
    min-width: 150px;
  }
</style>
