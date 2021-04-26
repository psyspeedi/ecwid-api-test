import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Catalog = () => import('@/views/Catalog.vue')
const Cart = () => import('@/views/Basket.vue')
const ProductDetailed = () => import('@/views/ProductDetail.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Catalog' }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
    props: (route) => {
      return { category: route.query.category || '0' }
    }
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Cart
  },
  {
    path: '/product/:id',
    name: 'ProductDetailed',
    props: true,
    component: ProductDetailed
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
