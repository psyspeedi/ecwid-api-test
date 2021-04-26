<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import { Router, useRouter } from 'vue-router'

  export default defineComponent({
    name: 'NotFound',
    setup() {
      const timeRemaining = ref<number>(5)
      const router = useRouter() as Router
      let interval = setInterval(() => {
        timeRemaining.value--
      }, 1000)

      watch(timeRemaining, () => {
        if (timeRemaining.value === 0) {
          router.push({ name: 'Catalog' })
        }
      })

      onMounted(() => interval)

      onBeforeUnmount(() => clearInterval(interval))

      return { timeRemaining }
    }
  })
</script>

<template>
  <div class="not-found">
    <h3>Извините, страница не найдена</h3>
    <p>Вы будете перенаправлены через {{ timeRemaining }}...</p>
  </div>
</template>

<style>
  .not-found {
    margin: 300px auto 0 auto;
    max-width: max-content;
  }
</style>
