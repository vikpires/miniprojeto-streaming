<template>
    <div class="relative flex items-center justify-center p-0 md:p-5 group">  
        <card-on @click="navigateToDetail"
            class="relative rounded-xl hover:opacity-50 hover:bg-[#8888a0] hover:p-2 ease-in-out duration-300 shadow-lg md:cursor-pointer"
            unstyled>     
            <template #header>
                <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                    :alt="movie.original_title" class="rounded-xl" />
                <div v-else :class="{ 'hidden': !isNotFoundImageLoaded }">
                    <img :src="notFoundImage" alt="Image Not Found" @load="onNotFoundImageLoad"
                        class="rounded-xl h-full object-cover" />
                </div> 
            </template>
        </card-on>
        <button-on v-if="isFavoritePage"
                    icon="pi pi-times" 
                    :class="[ 'absolute top-0 right-0 md:top-2 md:right-2 p-button-text p-button-rounded text-white bg-red-600 transition-transform duration-300 scale-75 hover:bg-[#a03838] hover:p-4 ease-in-out border-2 border-white',
                isClicked ? 'scale-125' : 'scale-90',
                'md:opacity-0 group-hover:opacity-100'
                    ]"
                    @click.stop="handleButtonClick"
                />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MoviesModel } from '@/model/movies.model';
import { SaveFavorites } from '@/utils/saveFavorites.util';

export default defineComponent({
    name: 'MoviesCard',
    data() {
        return {
            notFoundImage: require('@/assets/images/not_found.png'),
            isNotFoundImageLoaded: false,
            saveFavorites: new SaveFavorites(),
            isClicked: false
        }
    },
    props: {
        movie: {
            type: Object as PropType<MoviesModel>,
            required: true
        }
    },
    computed:{
        isFavoritePage(): boolean{
            return this.$route.path.includes(`/favs`)
        }

    },
    methods: {
        navigateToDetail(): void {
            this.$router.push({ path: `/movies/${this.movie.id}` });
        },
        onNotFoundImageLoad(): void{
            this.isNotFoundImageLoaded = true;
        },
        handleButtonClick(): void{
            this.isClicked = true;
            this.removeFavorite();
            setTimeout(() =>{
                this.isClicked = false;
            }, 300)
        },
        removeFavorite(): void{
            if(this.movie.id){
                this.saveFavorites.removeFavorite(this.movie.id);
                this.$emit('favorite-removed', this.movie.id);
            }
        }
    }
})
</script>