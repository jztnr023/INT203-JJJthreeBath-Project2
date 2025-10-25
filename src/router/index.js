import { createWebHistory, createRouter } from 'vue-router'
import MoviesGallery from '../views/MovieGallery.vue'

const history = createWebHistory()
const routes = [
  {
    path: '/',
    name: 'MoviesGallery',
    component: MoviesGallery
  }
]
const router = createRouter({
  history,
  routes
})

export default router
 