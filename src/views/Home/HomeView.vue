<template>  
  <section class="w-full justify-between">
    <div class="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-1 lg:gap-3">
      <template v-for="item in homeList" :key="item.id">
        <movies-card v-if="isMovie(item)" :movie="item"/>
        <series-card v-else :series="item"/>
      </template>
    </div>
    <div class="pt-14 md:pt-10"></div>
<paginator-pages :totalRecords="totalResults" :currentPage="page" :maxPages="maxPages"
  @page-change="handlePageChange"/>
  </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { HomeService } from './home.service';
import { SeriesModel } from '@/model/series.model';
import { MoviesModel } from '@/model/movies.model';

export default defineComponent({
data() {
return {
  homeList: [] as (MoviesModel | SeriesModel)[],
  page: 1,
  totalResults: 0,
  totalPages: 0,
  maxPages: 500,
  maxResults: 10000
}
},
methods: {
  getAllMedia(page = 1) {
  this.HomeService.allMedia.subscribe({
    next: (response) => {
      this.homeList = response.results;
      this.page = response.page;
      this.totalResults = this.totalResultsResponse(response.total_results)
      this.totalPages = this.totalPagesResponse(response.total_pages)
    }
  });
  this.HomeService.getAllMedia(page);
},
handlePageChange(newPage: number) {
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
HomeService() {
  return new HomeService();
},
totalRecords(): number {
  return this.totalResults;
}
},
mounted() {
this.getAllMedia()
}
});
</script>
