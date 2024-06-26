import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import FavoriteView from '@/views/Favorite/FavoriteView.vue'
import MoviesView from '@/views/Movies/MoviesView.vue'
import SeriesView from '@/views/Series/SeriesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/favs',
    name: 'favs',
    component: FavoriteView
  },
  {
    path: '/movies',
    name: 'movie',
    component: MoviesView
  },
  {
    path: '/series',
    name: 'series',
    component: SeriesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
