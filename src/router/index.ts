import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import FavoriteView from '@/views/Favorite/FavoriteView.vue'
import MoviesView from '@/views/Movies/MoviesView.vue'
import SeriesView from '@/views/Series/SeriesView.vue'
import SeriesDetailView from '@/views/Series/SeriesDetailView.vue'
import MoviesDetailView from '@/views/Movies/MoviesDetailView.vue'

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
  },
  {
    path: '/series/:id',
    name: 'series-details',
    component: SeriesDetailView
  },
  {
    path: '/movies/:id',
    name: 'movie-details',
    component: MoviesDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
