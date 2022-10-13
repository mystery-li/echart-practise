import Vue from 'vue'
import VueRouter from 'vue-router'
const Line = () => import('@/components/line.vue')
const Trend = () => import('@/components/trend.vue')
const Map = () => import('@/components/map.vue')
const Rank = () => import('@/components/rank.vue')
const Product = () => import('@/components/hotProduct.vue')
const Stock = () => import('@/components/stocks.vue')
const Screen = () => import('@/views/Screen/screen.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'screen',
    component: Screen
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/trend',
    name: 'trend',
    component: Trend
  },
  {
    path: '/line',
    name: 'line',
    component: Line
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock
  }
]

const router = new VueRouter({
  routes
})

export default router
