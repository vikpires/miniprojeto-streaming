<template>
  <section class="w-full justify-between pt-10">
    <h1 class="text-white flex justify-center text-2xl md:text-3xl">Minha Lista de Favoritos</h1>
    <div>
      <template v-if="favoriteList.length === 0">
        <p class="text-center text-base padding md:text-xl text-gray-500 pt-4">
          Hum... parece que você ainda não tem favoritos.
          <br />Explore nossos filmes e séries e adicione aqui os seus favoritos!
        </p>
      </template>
      <template v-else>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          <template v-for="item in favoriteList" :key="item.id">
            <movies-card v-if="isMovie(item)" :movie="item" @favorite-removed="handleFavoriteRemoved(item)" />
            <series-card v-else :series="item" @favorite-removed="handleFavoriteRemoved(item)" />
          </template>
        </div>
      </template>
    </div>
    <div class="pt-14 md:pt-10"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoviesModel } from '@/model/movies.model';
import { SeriesModel } from '@/model/series.model';
import { SaveFavorites } from '@/utils/saveFavorites.util';
import { ToastsMessages } from '@/utils/toast.utils';

export default defineComponent({
  data() {
    return {
      favoriteList: [] as (MoviesModel | SeriesModel)[],
      saveFavorites: new SaveFavorites()
    };
  },
  mounted() {
    this.getFavorites();
  },
  methods: {
    getFavorites() {
      const allFavorites = this.saveFavorites.favorites;
      this.favoriteList = [
        ...(allFavorites.movies || []),
        ...(allFavorites.series || [])
      ];
    },
    handleFavoriteRemoved(itemId: MoviesModel | SeriesModel) {
      const itemName = this.isMovie(itemId) ? itemId.original_title : itemId.name;

      this.saveFavorites.removeFavorite(Number(itemId.id));
      this.getFavorites();
      ToastsMessages.showSuccessToast(`${itemName} foi removido dos favoritos.`, 'Desfavoritado!', this);

    },
    isMovie(item: MoviesModel | SeriesModel): item is MoviesModel {
      return 'original_title' in item;
    }
  }
});
</script>
