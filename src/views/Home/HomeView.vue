<template>
  <div class="home">
    <div class="container mx-auto">
      <section class="movies-section my-6">
        <h2 class="text-2xl font-semibold mb-4">Popular Movies</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <moviesCard v-for="movies in moviesList" :key="movies.id"/>
        </div>
        <!-- <pagination :currentPage="moviePage" :totalPages="movieTotalPages" @page-changed="fetchMoviesPage" /> -->
      </section>
      <section class="series-section my-6">
        <h2 class="text-2xl font-semibold mb-4">Popular Series</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <seriesCard v-for="series in seriesList" :key="series.id" />
        </div>
        <!-- <pagination :currentPage="seriesPage" :totalPages="seriesTotalPages" @page-changed="fetchSeriesPage" /> -->
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoviesModel } from '@/model/movies.model';
import { SeriesModel } from '@/model/series.model';
import { HomeService } from './homeService';
// import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  data(){
    return{
      moviesList: {} as MoviesModel,
      seriesList: {} as SeriesModel
  }
},
  methods:{
    getAllData(){
      this.homeService.allMoviesPopular.pipe().subscribe({next:(response)=>
        this.moviesList=response.results
      })
      this.homeService.getAllMoviesPopular()
    },  
  },
  computed:{
    homeService(){
      return new HomeService()
    }
  },
  mounted() {
    this.getAllData
  },

});
</script>
