<template>  
  <div class="home">
    <div class="w-full justify-between">
      <section>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <movies-card v-for="movie in moviesList" :key="movie.id" :movie="movie"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MoviesModel } from '@/model/movies.model';
import { HomeService } from '@/views/Home/homeService';


export default defineComponent({
  data(){
    return{
      moviesList: [] as MoviesModel[],
  }
},
  methods:{
    getAllData(){
      this.homeService.allMovies.subscribe({next:(response: MoviesModel[])=>{
        this.moviesList=response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }
      });
      this.homeService.getMovies();
    },  
  },
  computed:{
    homeService(){
      return new HomeService()
    }
  },
  mounted() {
    this.getAllData();
  },
});
</script>

