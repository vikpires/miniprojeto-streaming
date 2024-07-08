<template>
  <section class="w-full justify-between">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <movies-card v-for="movie in FavoriteMovies" :key="movie.id" :movie="movie"
        @favorite="toggleFavoriteMovie(movie)"/>
      </div>
    </section>
    <section class="w-full justify-between">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <series-card v-for="series in FavoriteSeries" :key="series.id" :movie="series"
        @favorite="toggleFavoriteSeries(series)"/>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { SeriesModel } from '@/model/series.model';
import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return{
        movieList: [] as MoviesModel[],
        seriesList: [] as SeriesModel[]
      }
      
    },
methods:{
  getAllData(){
    this.homeService.allMovies.subscribe({next:(response: MoviesModel[])=>{
      this.moviesList=response;
    }
    });
    this.homeService.getMovies();
  },  
},
computed:{
  homeService(){
    return new HomeService()
  }
},
mounted() {
  this.getAllData();
},
});
</script>