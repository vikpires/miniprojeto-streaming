<template>
  <section class="w-full justify-between">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <series-card v-for="series in seriesList" :key="series.id" :series="series" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SeriesModel } from '@/model/series.model';
import { SerieService } from './serieService';
import { SeriesResponse } from '@/service/rest/series.rest';

export default defineComponent({
  data() {
    return {
      seriesList: [] as SeriesModel[]
    }
  },
  methods: {
    getAllData() {
      this.serieService.allSeries.subscribe({
        next: (response: SeriesResponse | null) => {
          if (response) {
            this.seriesList = response.results;
          }
        },
        error: (error) => {
          console.error('Erro ao buscar as séries:', error);
        }
      });
      this.serieService.getSeries();
    },
  },
  computed: {
    serieService() {
      return new SerieService();
    }
  },
  mounted() {
    this.getAllData();
  },
});
</script>
