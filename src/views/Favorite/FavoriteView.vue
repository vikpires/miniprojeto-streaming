<template>
  <section class="w-full justify-between pt-6">
    <h1 class="text-white flex justify-center text-3xl">Minha Lista de Favoritos</h1>
      <div>
        <template v-if="favoriteMovies.length === 0 && favoriteSeries.length === 0">
          <p class="text-center text-xl text-gray-500 pt-4"> Hum... parece que você ainda não tem favoritos.
          <br>Explore nossos filmes e séries e adicione aqui os seus favoritos!</p>
        </template>
        <template v-else>
          <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <template v-if="favoriteMovies.length > 0">
            <movies-card v-for="movie in favoriteMovies" :key="movie.id" :movie="movie"/>
          </template>
          <template v-if="favoriteSeries.length > 0">
            <series-card v-for="series in favoriteSeries" :key="series.id" :series="series"/>
          </template>
        </div>
        </template>
      </div>
    <div class="pt-14 md:pt-10"></div>
  </section>
</template>


<script lang="ts">
import { MoviesModel } from '@/model/movies.model';
import { SeriesModel } from '@/model/series.model';
import { SaveFavorites } from '../../utils/saveFavorites.util' 
import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return{
        favoriteMovies: [] as MoviesModel[],
        favoriteSeries: [] as SeriesModel[],
        saveFavorites: new SaveFavorites()  
      };      
    },
    mounted() {
        this.getFavorites();
    },
    methods:{
      getFavorites(){
        const allFavorites = this.saveFavorites.favorites;
        this.favoriteMovies = allFavorites.movies;
        this.favoriteSeries = allFavorites.series;
      },
      removeFavorite(itemId: number | undefined) {
      if (typeof itemId === 'number') {
        this.saveFavorites.removeFavorite(itemId);
        this.getFavorites(); 
      }
    }
    }
  })
</script>
  