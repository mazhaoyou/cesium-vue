import Vue from 'vue'
import VueRouter from 'vue-router'
import CesiumContainer from '@/views/CesiumContainer.vue'
import draw from '@/views/draw.vue'
import terrain from '@/views/terrain/terrain.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'cesiumContainer',
    component: CesiumContainer
  },
  {
    path: '/draw',
    name: 'draw',
    component: draw
  },
  {
    path: '/terrain',
    name: 'terrain',
    component: terrain
  },
  {
    path: '/models',
    name: 'models',
    component: () => import('@/views/models/index')
  },
  {
    path: '/czml',
    name: 'czml',
    component: () => import('@/views/czml/czml')
  },
  {
    path: '/geoJson',
    name: 'geoJson',
    component: () => import('@/views/geoJson/geoJson')
  },
  {
    path: '/mapWorld',
    name: 'mapWorld',
    component: () => import('@/views/mapWorld/mapWorld')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
