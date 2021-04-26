<script lang="ts">
  import { defineComponent, inject, onMounted, PropType, watch } from 'vue'
  import Tag from 'primevue/tag'
  import ProgressSpinner from 'primevue/progressspinner'
  import CategoryCard from '@/components/CategoryCard.vue'
  import ProductCard from '@/components/ProductCard.vue'
  import { useCategoriesStore } from '@/use/categories/useCategories'
  import { useProductsStore } from '@/use/products/useProducts'
  import { CategoriesStore } from '@/use/categories/useCategoriesTypes'
  import { ProductsStore } from '@/use/products/useProductsTypes'
  import { Router, useRoute, useRouter } from 'vue-router'
  import useIsLoaded from '@/use/helpers/useIsLoaded'
  import { UseBasket } from '@/use/basket/useBasketTypes'

  export default defineComponent({
    name: 'Catalog',
    components: { CategoryCard, ProductCard, Tag, ProgressSpinner },
    props: {
      category: {
        type: String as PropType<string>,
        required: true
      }
    },
    setup(props) {
      const router = useRouter() as Router
      const route = useRoute()

      const {
        categoriesList,
        fetchCategories
      } = useCategoriesStore() as CategoriesStore

      const {
        productsList,
        fetchProducts
      } = useProductsStore() as ProductsStore

      const { addToBasket } = inject('basket') as UseBasket

      const { isLoaded, resourceIsLoaded } = useIsLoaded()

      watch(
        props,
        async (): Promise<void> => {
          resourceIsLoaded(false)
          await fetchProducts(Number(props.category))
          resourceIsLoaded(true)
        }
      )

      const setActiveCategoryId = (categoryId: string): void => {
        if (route.query.category === categoryId) {
          router.push({ name: 'Catalog' })
          return
        }

        router.push({ name: 'Catalog', query: { category: categoryId } })
      }

      const goToProductDetail = (productId: number): void => {
        router.push({ name: 'ProductDetailed', params: { id: productId } })
      }

      onMounted(
        async (): Promise<void> => {
          await fetchCategories()
          await fetchProducts(Number(props.category))
          resourceIsLoaded(true)
        }
      )

      return {
        categoriesList,
        setActiveCategoryId,
        productsList,
        goToProductDetail,
        isLoaded,
        addToBasket,
        route
      }
    }
  })
</script>

<template>
  <template v-if="isLoaded">
    <div class="categories">
      <Tag class="tag" icon="pi pi-tags" severity="info" value="Категории" />
      <div class="content">
        <CategoryCard
          v-for="category in categoriesList"
          :category="category"
          :activeCategoryId="Number(route.query.category)"
          :key="category.id"
          @click="setActiveCategoryId(category.id.toString())"
        />
      </div>
    </div>

    <div class="products">
      <hr class="hr" />
      <Tag class="tag" icon="pi pi-tag" severity="info" value="Товары" />
      <div class="content" v-if="productsList.length">
        <ProductCard
          v-for="product in productsList"
          :product="product"
          :key="product.id"
          @click="goToProductDetail(product.id)"
          @addToCart="addToBasket"
        />
      </div>
      <h3 style="text-align: center" v-else>
        Кажется в этой категории нет товаров...
      </h3>
    </div>
  </template>

  <div class="loader" v-else>
    <ProgressSpinner />
  </div>
</template>

<style>
  .categories .content {
    display: flex;
    flex-wrap: wrap;
    max-width: max-content;
  }

  .products .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    margin: 0 auto;
  }

  .tag {
    margin-bottom: 10px;
  }
</style>
