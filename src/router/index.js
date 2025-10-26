import { createWebHistory, createRouter } from 'vue-router'
import MoviesGallery from '../views/MovieGallery.vue'
import MovieDetail from '../views/MovieDetail.vue'

const history = createWebHistory()
const routes = [
  {
    path: "/",
    name: "MoviesGallery",
    component: MoviesGallery,
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetail,
  },
];
const router = createRouter({
  history,
  routes
})

export default router
 