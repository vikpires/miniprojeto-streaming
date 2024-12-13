<template>
  <main class="w-full justify-between pt-10">
    <section v-if="isLoading"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50"
      aria-live="polite">
      <progress-spinner strokeWidth="4" animationDuration="1.5s" />
      <span class="sr-only">Carregando...</span>
    </section>
    <section v-else>
      <span>
        <h1 class="text-white flex justify-center text-2xl md:text-3xl">Minha Lista de Favoritos</h1>
      </span>
      <template v-if="favoriteList.length === 0">
        <p class="text-center text-base padding md:text-xl text-gray-500 pt-4">
          Hum... parece que você ainda não tem favoritos.
          <br />Explore nossos filmes e séries e adicione aqui os seus favoritos!
        </p>
      </template>
      <template v-else>
        <section class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          <template v-for="item in favoriteList" :key="item.id">
            <movies-card v-if="isMovie(item)" :movie="item" @favorite-removed="handleRemovedFavorite(item)" />
            <series-card v-else :series="item" @favorite-removed="handleRemovedFavorite(item)" />
          </template>
        </section>
      </template>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoviesModel } from '@/model/movies.model';
import { SeriesModel } from '@/model/series.model';
import { SaveFavorites } from '@/utils/saveFavorites.utils';
import { ToastMessages } from '@/utils/toast.utils';

export default defineComponent({
  name: 'favs',
  data() {
    return {
      favoriteList: [] as (MoviesModel | SeriesModel)[],
      saveFavorites: new SaveFavorites(),
      isLoading: true as boolean,
    };
  },
  mounted(): void {
    this.getFavorites();
  },
  methods: {
    getFavorites(): void {
      const allFavorites = this.saveFavorites.favorites;
      this.favoriteList = [
        ...(allFavorites.movies || []),
        ...(allFavorites.series || [])
      ];
      this.isLoading = false;
    },
    handleRemovedFavorite(itemId: MoviesModel | SeriesModel): void {
      const itemName = this.isMovie(itemId) ? itemId.original_title : itemId.name;
      this.saveFavorites.clearFavorites(Number(itemId.id));
      this.getFavorites();
      ToastMessages.showSuccessToast(`${itemName} foi removido dos favoritos.`, 'Desfavoritado!', this);
    },
    isMovie(item: MoviesModel | SeriesModel): item is MoviesModel {
      return 'original_title' in item;
    }
  }
});
</script>
