<template>
  <main class="w-full justify-between space-y-12">
    <section v-if="isLoading"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50"
      aria-live="polite">
      <progress-spinner strokeWidth="4" animationDuration="1.5s" />
      <span class="sr-only">Carregando...</span>
    </section>
    <section v-else class="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-1 lg:gap-3">
      <series-card v-for="series in seriesList" :key="series.id" :series="series" />
    </section>
    <paginator-pages :totalRecords="totalResults" :currentPage="currentPage" :maxPages="maxPages"
      @page-change="handlePageChange" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SeriesModel } from '@/model/series.model';
import { SerieService } from '@/views/Series/series.service';

export default defineComponent({
  name: 'series',
  data() {
    return {
      seriesList: [] as SeriesModel[],
      totalResults: 0 as number,
      totalPages: 0 as number,
      maxPages: 500 as number,
      maxResults: 10000 as number,
      isLoading: true as boolean,
    };
  },
  methods: {
    getSeries(page = 1): void {
      this.serieService.allSeries.subscribe({
        next: (response) => {
          this.seriesList = response.results;
          this.isLoading = false;
          this.totalResults = this.totalResultsResponse(response.total_results);
          this.totalPages = this.totalPagesResponse(response.total_pages);
        }
      });
      this.serieService.getSeries(page);
    },
    handlePageChange(newPage: number): void {
      this.$router.push({ query: { ...this.$route.query, page: newPage } });
      this.getSeries(newPage);
    },
    totalResultsResponse(total: number): number {
      return total > this.maxResults ? this.maxResults : total;
    },
    totalPagesResponse(totalPages: number): number {
      return totalPages <= this.maxPages ? totalPages : this.maxPages;
    }
  },
  computed: {
    serieService(): SerieService {
      return new SerieService();
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
      this.getSeries(this.currentPage);
    }
  },
  mounted(): void {
    this.getSeries(this.currentPage);
  },
});
</script>
