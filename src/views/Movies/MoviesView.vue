<template>
  <section class="w-full justify-between">
    <div class="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-1 lg:gap-3">
      <movies-card v-for="movie in moviesList" :key="movie.id" :movie="movie" />
    </div>
    <div class="pt-14 md:pt-10"></div>
    <paginator-pages :totalRecords="totalResults" :currentPage="currentPage" :maxPages="maxPages"
      @page-change="handlePageChange"/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoviesModel } from '@/model/movies.model';
import { MovieService } from '@/views/Movies/movie.service';

export default defineComponent({
  data() {
    return {
      moviesList: [] as MoviesModel[],
      totalResults: 0,
      totalPages: 0,
      maxPages: 500,
      maxResults: 10000
    }
  },
  methods: {
    getMovies(page = 1) {
      this.movieService.allMovies.subscribe({
        next: (response) => {
          this.moviesList = response.results;
          this.totalResults = this.totalResultsResponse(response.total_results);
          this.totalPages = this.totalPagesResponse(response.total_pages);
        }
      });
      this.movieService.getMovies(page);
    },
    handlePageChange(newPage: number) {
      this.$router.push({ query: { ...this.$route.query, page: newPage} });
      this.getMovies(newPage);
    },
    totalResultsResponse(total: number): number {
      return total > this.maxResults ? this.maxResults : total;
    },
    totalPagesResponse(totalPages: number): number {
      return totalPages <= this.maxPages ? totalPages : this.maxPages;
    }
  },
  computed: {
    movieService() {
      return new MovieService()
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
      this.getMovies(this.currentPage);
    }
  },
  mounted() {
    this.getMovies(this.currentPage);
  },
});
</script>
