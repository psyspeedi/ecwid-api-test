<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
  import { defineComponent, onMounted, provide } from 'vue'
  import NavBar from '@/components/NavBar.vue'
  import useBasket from '@/use/basket/useBasket'
  export default defineComponent({
    name: 'MainLayout',
    components: { NavBar },
    setup() {
      const basket = useBasket()

      onMounted(() => basket.checkBasketInLocalStorage())

      provide('basket', basket)
    }
  })
</script>

<style>
  .empty-image-block {
    width: 15rem;
    min-height: 15rem;
  }

  .image-enter-from {
    opacity: 0;
  }

  .image-enter-to {
    opacity: 1;
  }

  .image-enter-active {
    transition: opacity 2s ease;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 150px;
  }

  .hr {
    background-color: #dee2e5;
    color: #dee2e5;
    height: 1px;
    border: none;
    margin-bottom: 1em;
  }
</style>
