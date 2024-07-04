<template>
    <div class="items-center flex justify-center ">
        <card-on class="relative w-full h-full hover:opacity-50 hover:bg-[#535368] hover:p-2 ease-in-out duration-300 shadow-lg cursor-pointer rounded-xl" unstyled>
            <template #header>
                <img :src="`https://image.tmdb.org/t/p/w500/${series.poster_path}`" :alt="series.original_name" class="object-cover rounded-xl"/>
            </template>
        </card-on>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { SeriesModel } from '@/model/series.model';


    export default defineComponent({
        name: 'SeriesCard',
        props: {
            series: {
                type: Object as PropType<SeriesModel>,
                    required: true
            }
        },
    })
</script>