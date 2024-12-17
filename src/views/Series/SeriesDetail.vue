<template>
    <main>
        <section v-if="isLoading"
            class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50"
            aria-live="polite">
            <progress-spinner strokeWidth="4" animationDuration="1.5s" />
            <span class="sr-only">Carregando...</span>
        </section>
        <section v-else class="relative h-screen overflow-hidden bg-fixed bg-cover">
            <figure>
                <span
                    class="absolute top-0 left-0 h-full w-7/12 md:w-3/4 bg-gradient-to-r from-black to-transparent z-10"></span>
                <img :src="backgroundImage" :alt="series.original_name"
                    class="absolute top-0 w-full h-full object-cover filter brightness-50" />
            </figure>
            <section
                class="bg-opacity-80 flex top-24 md:top-64 xl:top-52 z-30 relative items-center p-10 flex-col lg:flex-row-reverse gap-8 md:flex md:gap-12 lg:gap-0 justify-center lg:justify-between">
                <section v-if="urlTrailer" class="lg:w-1/4 lg:mr-20 md:w-3/5 flex justify-center items-center">
                    <iframe :src="urlTrailer" :title="`Trailer da série ${series.original_name}`"
                        allow="fullscreen" no-referrer class="h-56 md:w-full md:h-72 lg:h-80 border-none">
                    </iframe>
                </section>
                <figure v-else :class="{ 'hidden': !isNotFoundVideoLoaded }"
                    class="flex justify-center items-center w-full lg:w-1/4 lg:mr-20 md:w-3/5">
                    <img :src="backgroundImage" alt="Imagem para vídeo não encontrado" title="Vídeo não encontrado"
                        @load="onNotFoundVideoLoad"
                        class="rounded-xl w-48 h-48 md:h-72 object-cover opacity-75 md:w-96" />
                </figure>
                <card-on class="w-full sm:w-5/6 md:w-4/6 lg:w-2/5 p-4 rounded-xl shadow-lg bg-black bg-opacity-50 font-roboto">
                    <template #title>
                        <h3 v-if="series.name" class="text-2xl text-white font-bold tracking-wider mb-1">
                            {{ series.name }}
                        </h3>
                    </template>
                    <template #content>
                        <span class="flex flex-row text-gray-400 gap-2 mb-3">
                            <p v-if="series.first_air_date" id="ano">
                                {{ new Date(series.first_air_date).getFullYear() }}
                            </p>
                            <p> | </p>
                            <p v-if="series.vote_average"
                                :class="{ 'text-green-400': series.vote_average > 6.00, 'text-red-500': series.vote_average <= 6.00 }"
                                class="brightness-125">
                                {{ series.vote_average?.toFixed(2) }}
                            </p> | <p>
                                {{ series.number_of_seasons }} Season(s)
                            </p>
                        </span>
                        <span class="text-white mb-1">
                            <p v-if="series.overview" class="max-h-40 overflow-y-auto text-left">
                                {{ series.overview }}
                            </p>
                            <p v-else class="items-center">No overview.</p>
                        </span>
                    </template>
                    <template #footer>
                        <section class="grid grid-cols-2 gap-2 w-full justify-center md:justify-between md:gap-8 md:grid md:grid-cols-3 items-center">
                            <span class="items-center">
                                <button-on 
                                    @click="navigateBack" 
                                    label="Voltar" 
                                    icon="pi pi-arrow-left"
                                    class="rounded-lg font-bold py-[10px] justify-center text-white text-sm md:text-base active:scale-90 px-4 md:px-8 hover:bg-gray-700" 
                                />                                
                            </span>
                            <span class="items-center">
                                <button-on 
                                    @click="toggleFavorite" 
                                    :label="favoriteLabel" 
                                    :icon="favoriteIcon" 
                                    :class="{
                                        'rounded-lg font-bold py-2 px-4 md:px-8 justify-center border-2 active:scale-90 hover:bg-white hover:text-black': true,
                                        'border-white text-sm md:text-base text-white': !isFavorite,
                                        'bg-white text-sm md:text-base px-3 md:px-7 text-black': isFavorite
                                    }" 
                                />
                            </span>  
                        </section>
                    </template>
                </card-on>
            </section>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SerieService } from '@/views/Series/series.service';
import { SeriesModel } from '@/model/series.model';
import { AdjustScreen } from '@/utils/adjustScreen.utils';
import { SaveFavorites } from '@/utils/saveFavorites.utils';
import { ToastMessages } from '@/utils/toast.utils';

export default defineComponent({
    name: 'series-detail',
    data() {
        return {
            series: {} as SeriesModel,
            id: this.$route.params.id,
            isLoading: true as boolean,
            isFavorite: false as boolean,
            urlTrailer: '' as string | null,
            isNotFoundVideoLoaded: false as boolean,
        };
    },
    methods: {
        fetchSeriesDetail(id: string): void {
            this.serviceSeriesDetail.serie.subscribe({
                next: (response) => {
                    this.series = response;
                    this.scrollScreenToTop();
                    this.isLoading = false;
                    this.checkIfFavorite();
                    this.setUrlTrailer();
                },
            });

            this.serviceSeriesDetail.getSeriesById(id);
        },
        checkIfFavorite(): void {
            const allFavorites = this.saveFavorites.favorites;
            this.isFavorite = allFavorites.series.some((serie) => serie.id === this.series.id);
        },
        toggleFavorite(): void {
            this.isFavorite = !this.isFavorite;
            const nameSerie = this.series.name;
            const action = this.isFavorite ? 'adicionado aos' : 'removido dos';

            if (this.isFavorite) {
                this.saveFavorites.addFavorites(this.series);
            } else if (typeof this.series.id === 'number') {
                this.saveFavorites.clearFavorites(this.series.id);
            }

            ToastMessages.showSuccessToast(`${nameSerie} foi ${action} favoritos.`, this.favoriteSummary, this);
        },
        setUrlTrailer(): void {
            if (this.series.videos && this.series.videos.results) {
                const trailer = this.series.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    const url_trailer_series = process.env.VUE_APP_URL_TRAILER;
                    this.urlTrailer = `${url_trailer_series}${trailer.key}?controls=0`;
                }
            }
        },
        onNotFoundVideoLoad(): void {
            this.isNotFoundVideoLoaded = true;
        },
        navigateBack() {
            this.$router.go(-1);
        },
        scrollScreenToTop(): void {
            AdjustScreen.getWindowScroll;
        },
    },
    mounted(): void {
        const seriesId = String(this.$route.params.id);
        this.fetchSeriesDetail(seriesId);

    },
    computed: {
        favoriteLabel(): string {
            return this.isFavorite ? 'Favoritado' : 'Favoritar';
        },
        favoriteIcon(): string {
            return this.isFavorite ? 'pi pi-star-fill' : 'pi pi-star';
        },
        serviceSeriesDetail(): SerieService {
            return new SerieService();
        },
        saveFavorites(): SaveFavorites {
            return new SaveFavorites();
        },
        favoriteSummary(): string {
            return this.isFavorite ? 'Favoritado!' : 'Desfavoritado!';
        },
        backgroundImage(): string {
            const urlBackground = process.env.VUE_APP_URL_BACKGROUND;
            return this.series.backdrop_path
                ? `${urlBackground}${this.series.backdrop_path}`
                : require('@/assets/images/not_background.jpg');
        },
    }
});
</script>
