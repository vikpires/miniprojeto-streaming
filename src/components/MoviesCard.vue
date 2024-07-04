<template>
    <div class="relative flex items-center justify-center p-0 md:p-5">
        <card-on class="rounded-xl hover:opacity-50 hover:bg-[#8888a0] hover:p-2 ease-in-out duration-300 shadow-lg cursor-pointer" unstyled>
            <template #header>
                <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.original_title" class="rounded-xl"/>
            </template>
        </card-on>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { MoviesModel } from '@/model/movies.model';


    export default defineComponent({
        name: 'MoviesCard',
        props: {
            movie: {
                type: Object as PropType<MoviesModel>,
                    required: true
            }
        },
    })
</script>