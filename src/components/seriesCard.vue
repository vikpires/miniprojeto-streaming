<template>
    <div class="relative flex items-center justify-center p-0 md:p-5">
        <img :src="`https://image.tmdb.org/t/p/w500/${series.poster_path}`" alt={{series.original_name}} class="opacity-100 group-hover:opacity-50 rounded-lg cursor-pointer ease-in-out duration-300">
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { SeriesModel } from '@/model/series.model';

    export default defineComponent({
        name: 'seriesCard',
        props: {
            series: {
                type: Object as PropType<SeriesModel>,
                    required: true
            }
        }
    })
</script>