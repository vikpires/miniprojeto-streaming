<!-- <template>
  <div class="home">
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView'
});
</script> -->
<template>
  <div class="home">
    <h1 class="text-3xl font-bold text-center my-6">Welcome to the Streaming Site</h1>
    <div class="container mx-auto">
      <section class="movies-section my-6">
        <h2 class="text-2xl font-semibold mb-4">Popular Movies</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @favorite="toggleFavoriteMovie(movie)" />
        </div>
        <Pagination :currentPage="moviePage" :totalPages="movieTotalPages" @page-changed="fetchMoviesPage" />
      </section>
      <section class="series-section my-6">
        <h2 class="text-2xl font-semibold mb-4">Popular Series</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <SeriesCard v-for="series in seriesList" :key="series.id" :series="series" @favorite="toggleFavoriteSeries(series)" />
        </div>
        <Pagination :currentPage="seriesPage" :totalPages="seriesTotalPages" @page-changed="fetchSeriesPage" />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import MovieCard from '@/components/MovieCard.vue';
import SeriesCard from '@/components/SeriesCard.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MovieCard,
    SeriesCard,
    Pagination
  },
  setup() {
    const store = useStore();
    const moviePage = ref(1);
    const seriesPage = ref(1);
    const movieTotalPages = ref(1);
    const seriesTotalPages = ref(1);

    onMounted(() => {
      fetchMoviesPage(moviePage.value);
      fetchSeriesPage(seriesPage.value);
    });

    const fetchMoviesPage = async (page: number) => {
      await store.dispatch('fetchPopularMovies', page);
      movieTotalPages.value = store.getters.movieTotalPages;
    };

    const fetchSeriesPage = async (page: number) => {
      await store.dispatch('fetchPopularSeries', page);
      seriesTotalPages.value = store.getters.seriesTotalPages;
    };

    const toggleFavoriteMovie = (movie) => {
      if (store.getters.favoriteMovies.includes(movie)) {
        store.dispatch('removeFavoriteMovie', movie.id);
      } else {
        store.dispatch('addFavoriteMovie', movie);
      }
    };

    const toggleFavoriteSeries = (series) => {
      if (store.getters.favoriteSeries.includes(series)) {
        store.dispatch('removeFavoriteSeries', series.id);
      } else {
        store.dispatch('addFavoriteSeries', series);
      }
    };

    const movies = store.getters.allMovies;
    const seriesList = store.getters.allSeries;

    return {
      movies,
      seriesList,
      moviePage,
      seriesPage,
      movieTotalPages,
      seriesTotalPages,
      fetchMoviesPage,
      fetchSeriesPage,
      toggleFavoriteMovie,
      toggleFavoriteSeries
    };
  }
});
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
