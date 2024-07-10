<template>
  <section class="w-full justify-between">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <h1 class="text-white flex justify-center text-3xl">Minha Lista de Filmes</h1>
        <movies-card v-for="movie in favoriteMovies" :key="movie.id" :movie="movie"/>
      </div>
    </section>
    <!-- <section class="w-full justify-between">
      <h1 class="text-white flex justify-center text-3xl">Minha Lista de Séries</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <series-card v-for="series in favoriteSeries" :key="series.id" :series="series"/>
      </div>
    </section> -->
  </template>

<script lang="ts">
import { MoviesModel } from '@/model/movies.model';
import { SeriesModel } from '@/model/series.model';
import { SaveFavorites } from '@/utils/favorites.util';  
import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return{
        favoriteMovies: [] as MoviesModel[],
        favoriteSeries: [] as SeriesModel[]
      };      
    },
    mounted() {
        this.getFavorites();
    },
    methods:{
      getFavorites(){
        const saveFavorites = new SaveFavorites();
        const allFavorites = saveFavorites.favorites;
        
        this.favoriteMovies = allFavorites.filter((item): item is MoviesModel => 'original_title' in item);
        this.favoriteSeries = allFavorites.filter((item): item is SeriesModel => 'original_name' in item);


      },
    }
  })
</script>