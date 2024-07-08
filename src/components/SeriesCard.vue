<template>
    <div class="relative flex items-center justify-center p-0 md:p-5">
        <card-on @click="navigateToDetail"
            class="rounded-xl hover:opacity-50 hover:bg-[#8888a0] hover:p-2 ease-in-out duration-300 shadow-lg cursor-pointer"
            unstyled>
            <template #header>
                <img v-if="series.poster_path" :src="`https://image.tmdb.org/t/p/w500/${series.poster_path}`"
                    :alt="series.original_name" class="rounded-xl" />
                <div v-else :class="{ 'hidden': !isNotFoundImageLoaded }">
                    <img :src="notFoundImage" alt="Image Not Found"
                        @load="onNotFoundImageLoad"
                        class="rounded-xl h-full object-cover"/>
                </div>
            </template>
        </card-on>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SeriesModel } from '@/model/series.model';

export default defineComponent({
    name: 'SeriesCard',
    data() {
        return {
            notFoundImage: require('@/assets/images/not_found.png'),
            isNotFoundImageLoaded: false
        }
    },
    props: {
        series: {
            type: Object as PropType<SeriesModel>,
            required: true
        }
    },
    methods: {
        navigateToDetail() {
            this.$router.push({ path: `/series/${this.series.id}` });
        },
        onNotFoundImageLoad() {
            this.isNotFoundImageLoaded = true;
        }
    }
})
</script>
