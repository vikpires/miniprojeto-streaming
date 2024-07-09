<template>
  <section class="w-full justify-between">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <movies-card v-for="movie in FavoriteMovies" :key="movie.id" :movie="movie"
        @favorite="toggleFavoriteMovies(movie)"/>
      </div>
    </section>
    <section class="w-full justify-between">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <series-card v-for="series in FavoriteSeries" :key="series.id" :series="series"
        @favorite="toggleFavoriteSeries(series)"/>
      </div>
    </section>
  </template>


<script lang="ts">
import { MoviesModel } from '@/model/movies.model';
import { SeriesModel } from '@/model/series.model';
import { defineComponent } from 'vue';
import { FavoriteUtils } from '@/utils/favorites.util';
  
  export default defineComponent({
    data() {
      return{
        movieList: [] as MoviesModel[],
        seriesList: [] as SeriesModel[],
        FavoriteUtils: new FavoriteUtils()
      };      
    },
methods:{
  toggleFavoriteMovie(movie: MoviesModel){
    if(this.FavoriteUtils.isFavorite(movie.id)){
      this.FavoriteUtils.removeFavorite(movie.id);
    }else{
      this.FavoriteUtils.addFavorites(movie);
    }
  },
  toggleFavoriteSeries(series: SeriesModel){
    if(this.FavoriteUtils.isFavorite(series.id)){
      this.FavoriteUtils.removeFavorite(series.id);
    }else{
      this.FavoriteUtils.addFavorites(series);
    }
  },
  getAllData(){

          this.homeService.allMovies.subscribe({next:(response: MoviesModel[])=>{
        this.moviesList=response;
      }
      });
      this.homeService.getMovies();
    },  
  }
 
},
computed:{
  favoriteMovies(): MoviesModel[]{
    return this.movieList.filter(movie => this.FavoriteUtils.isFavorite(movie.id))
  },
  favoriteSereies(): SeriesModel[]{
    return this.seriesList.filter(series => this.FavoriteUtils.isFavorite(series.id));
  }
},
mounted() {
  this.getAllData();
},
});
</script>