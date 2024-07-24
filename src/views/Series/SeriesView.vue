<template>
  <section class="w-full justify-between">
    <div class="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-1 lg:gap-3">
      <series-card v-for="series in seriesList" :key="series.id" :series="series" />
    </div>
    <div class="pt-14 md:pt-10"></div>
    <paginator-pages :totalRecords="totalResults" :currentPage="currentPage" :maxPages="maxPages"
      @page-change="handlePageChange" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SeriesModel } from '@/model/series.model';
import { SerieService } from './serie.service';

export default defineComponent({
  data() {
    return {
      seriesList: [] as SeriesModel[],
      totalResults: 0,
      totalPages: 0,
      maxPages: 500,
      maxResults: 10000
    }
  },
  methods: {
    getSeries(page = 1) {
      this.serieService.allSeries.subscribe({
        next: (response) => {
          this.seriesList = response.results;
          this.totalResults = this.totalResultsResponse(response.total_results)
          this.totalPages = this.totalPagesResponse(response.total_pages)
        }
      });
      this.serieService.getSeries(page);
    },
    handlePageChange(newPage: number) {
      this.$router.push({ query: { ...this.$route.query, page: newPage.toString() } })
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
    serieService() {
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
    '$route.query.page'() {
      this.getSeries(this.currentPage)
    }
  },
  mounted() {
    this.getSeries(this.currentPage);
  },
});
</script>
