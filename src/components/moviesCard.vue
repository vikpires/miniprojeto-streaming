<template>
    <div class="relative flex items-center justify-center p-0 md:p-5">
        <img :src="`https://image.tmdb.org/t/p/w500/${movies.poster_path}`" alt={{movies.original_title}} class="opacity-100 group-hover:opacity-50 rounded-lg cursor-pointer ease-in-out duration-300">
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { MoviesModel } from '@/model/movies.model';

    export default defineComponent({
        name: 'moviesCard',
        props: {
            movies: {
                type: Object as PropType<MoviesModel>,
                    required: true
            }
        }
    })
</script>