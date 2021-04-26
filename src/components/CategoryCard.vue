<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Card from 'primevue/card'
  import { Category } from '@/use/categories/useCategoriesTypes'
  import useIsLoaded from '@/use/helpers/useIsLoaded'

  export default defineComponent({
    name: 'CategoryCard',
    components: {
      Card
    },
    props: {
      category: {
        type: Object as PropType<Category>,
        default(this: void) {
          return {}
        }
      },
      activeCategoryId: {
        type: Number as PropType<number>,
        default(this: void) {
          return null
        }
      }
    },
    setup() {
      const { isLoaded, resourceIsLoaded } = useIsLoaded()

      return {
        isLoaded,
        resourceIsLoaded
      }
    }
  })
</script>

<template>
  <Card
    class="category-card"
    :class="{ active: category.id === activeCategoryId }"
  >
    <template #header>
      <div class="empty-image-block" v-show="!isLoaded" />
      <transition name="image">
        <img
          :alt="category.name"
          :src="category.imageUrl"
          v-show="isLoaded"
          @load="resourceIsLoaded(true)"
        />
      </transition>
    </template>
    <template #title>{{ category.name }}</template>
  </Card>
</template>

<style>
  .category-card {
    cursor: pointer;
    border: 2px solid transparent;
    width: 15rem;
    margin: 20px;
  }
  .category-card:hover {
    border-color: #2096f3;
  }

  .category-card .p-card-content {
    display: none;
  }

  .category-card.active {
    border-color: #2096f3;
  }
</style>
