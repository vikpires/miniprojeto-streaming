import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Views } from '@/views';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Views.Home
  },
  {
    path: '/movies',
    name: 'movie',
    component: Views.Movies
  },
  {
    path: '/movies/:id',
    name: 'movie-details',
    component: Views.MoviesDetail
  },
  {
    path: '/series',
    name: 'series',
    component: Views.Series
  },
  {
    path: '/series/:id',
    name: 'series-details',
    component: Views.SeriesDetail
  },
  {
    path: '/favs',
    name: 'favs',
    component: Views.Favorites
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
