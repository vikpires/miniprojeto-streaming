<template>
  <main class="w-full justify-between pb-12">
    <section v-if="isLoading"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50"
      aria-live="polite">
      <progress-spinner strokeWidth="4" animationDuration="1.5s" />
      <span class="sr-only">Carregando...</span>
    </section>
    <section v-else class="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-1 lg:gap-3">
      <template v-for="item in homeList" :key="item.id">
        <movies-card v-if="isMovie(item)" :movie="item" />
        <series-card v-else :series="item" />
      </template>
    </section>
    <paginator-pages :totalRecords="totalResults" :currentPage="currentPage" :maxPages="maxPages"
      @page-change="handlePageChange" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HomeService } from '@/views/Home/home.service';
import { SeriesModel } from '@/model/series.model';
import { MoviesModel } from '@/model/movies.model';

export default defineComponent({
  name: 'home',
  data() {
    return {
      homeList: [] as (MoviesModel | SeriesModel)[],
      totalResults: 0 as number,
      totalPages: 0 as number,
      maxPages: 500 as number,
      maxResults: 10000 as number,
      isLoading: true as boolean,
    };
  },
  methods: {
    getAllMedia(page = 1): void {
      this.HomeService.allMedia.subscribe({
        next: (response) => {
          this.homeList = response.results;
          this.isLoading = false;
          this.totalResults = this.totalResultsResponse(response.total_results);
          this.totalPages = this.totalPagesResponse(response.total_pages);
        }
      });
      this.HomeService.getAllMedia(page);
    },
    handlePageChange(newPage: number): void {
      this.$router.push({ query: { ...this.$route.query, page: newPage } });
      this.getAllMedia(newPage);
    },
    totalResultsResponse(total: number): number {
      return total > this.maxResults ? this.maxResults : total;
    },
    totalPagesResponse(totalPages: number): number {
      return totalPages <= this.maxPages ? totalPages : this.maxPages;
    },
    isMovie(item: MoviesModel | SeriesModel): item is MoviesModel {
      return 'original_title' in item;
    }
  },
  computed: {
    HomeService(): HomeService {
      return new HomeService();
    },
    totalRecords(): number {
      return this.totalResults;
    },
    currentPage(): number {
      return Number(this.$route.query.page) || 1;
    }
  },
  watch: {
    '$route.query.page'(): void {
      this.getAllMedia(this.currentPage);
    }
  },
  mounted(): void {
    this.getAllMedia(this.currentPage);
  }
});
</script>
