<template>
    <section class="relative flex items-center justify-center p-0 md:p-5 group">
        <card-on @click="navigateToDetail"
            class="relative rounded-xl hover:opacity-50 hover:bg-[#8888a0] hover:p-2 ease-in-out duration-300 md:cursor-pointer h-full"
            unstyled>
            <template #header>
                <button-on v-if="isPosterLoaded && isFavoritePage" 
                    icon="pi pi-times" 
                    aria-label="Fechar" 
                    :class="[
                        'absolute -top-2 -right-2 p-button-text p-button-rounded text-white bg-red-600 transition-all duration-300 scale-75 hover:bg-red-900 hover:p-4 ease-in-out border-2 border-white',
                        isClicked ? 'scale-125' : 'scale-90',
                        'sm:opacity-100 lg:opacity-0 group-hover:opacity-100'
                    ]" 
                    @click.stop="handleButtonClick" 
                />
            </template>
            <template #content>
                <figure v-if="series.poster_path">
                    <img 
                        :src="posterImage" 
                        :alt="series.original_name" 
                        :title="series.original_name"
                        class="rounded-xl object-cover" 
                        @load="onPosterLoad" 
                    />
                </figure>
                <figure v-else :class="{ 'hidden': !isNotFoundImageLoaded }">
                    <img 
                        :src="notFoundImage" 
                        alt="Imagem não encontrada" 
                        title="Imagem não encontrada"
                        @load="onNotFoundImageLoad" 
                        class="rounded-xl object-cover" 
                    />
                </figure>
            </template>
            <template #footer>
                <section
                    class="absolute bottom-0 left-0 w-full h-1/4 lg:h-1/5 rounded-b-xl bg-gray-900/85 text-white p-2 lg:p-3 opacity-100 group-hover:opacity-100 duration-300">
                    <span class="text-sm lg:text-base text-left font-bold w-full h-full text-wrap line-clamp-2">
                        {{ series.original_name }} 
                    </span>
                </section>
            </template>
        </card-on>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SeriesModel } from '@/model/series.model';
import { SaveFavorites } from '@/utils/saveFavorites.utils';

export default defineComponent({
    name: "SeriesCard",
    data() {
        return {
            notFoundImage: require("@/assets/images/not_found.png") as string,
            isNotFoundImageLoaded: false as boolean,
            saveFavorites: new SaveFavorites(),
            isClicked: false as boolean,
            isPosterLoaded: false as boolean,
        };
    },
    props: {
        series: {
            type: Object as PropType<SeriesModel>,
            required: true
        }
    },
    computed: {
        isFavoritePage(): boolean {
            return this.$route.path.includes('/favs');
        },
        posterImage(): string {
            const urlPoster = process.env.VUE_APP_URL_POSTER;
            return `${urlPoster}${this.series.poster_path}`;
        }
    },
    methods: {
        navigateToDetail(): void {
            if (this.series.id) {
                this.$router.push({ path: `/series/${this.series.id}` });
            }
        },
        onNotFoundImageLoad(): void {
            this.isNotFoundImageLoaded = true;
        },
        onPosterLoad(): void {
            this.isPosterLoaded = true;
        },
        handleButtonClick(): void {
            this.isClicked = true;
            this.clearFavorite();
            setTimeout(() => {
                this.isClicked = false;
            }, 300);
        },
        clearFavorite(): void {
            if (this.series.id) {
                this.saveFavorites.clearFavorites(this.series.id);
                this.$emit('favorite-removed', this.series.id);
            }
        },
    }
});
</script>
