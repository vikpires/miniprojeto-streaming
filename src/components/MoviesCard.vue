<template>
    <div class="items-center flex justify-center ">
        <card-on class="relative w-full h-full hover:opacity-50 hover:bg-[#535368] hover:p-2 ease-in-out duration-300 shadow-lg cursor-pointer rounded-xl" unstyled>
            <template #header>
                <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" :alt="movie.original_title" class="object-cover rounded-xl"/>
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