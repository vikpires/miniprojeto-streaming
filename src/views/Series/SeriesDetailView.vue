<template>
    <div v-if="loading"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
        <progress-spinner strokeWidth="4" animationDuration="1.5s" />
    </div>
    <section v-else class="relative h-screen overflow-hidden bg-fixed bg-cover">
        <div class="absolute top-0 left-0 h-full w-7/12 md:w-3/4 bg-gradient-to-r from-black to-transparent z-10"></div>
        <img :src="backgroundImage" :alt="series.original_name"
            class="absolute top-0 w-full h-full object-cover filter brightness-50" />
        <div class="bg-opacity-80 flex top-48 md:top-72 lg:top-64 xl:top-52 z-30 relative items-center p-10">
            <card-on class="w-full sm:w-5/6 md:w-4/6 lg:w-2/5 p-4 rounded-lg shadow-lg bg-black bg-opacity-50">
                <template #title>
                    <h3 v-if="series.name" class="text-2xl text-white font-bold tracking-wider mb-1">
                        {{ series.name }}
                    </h3>
                </template>
                <template #content>
                    <div class="flex flex-row text-gray-400 gap-2 mb-3">
                        <p v-if="series.first_air_date" id="ano">{{ series.first_air_date }}</p>
                        <p class="text-green-400 brightness-120">
                            {{ series.vote_average }}
                        </p> | <p>{{ series.number_of_seasons }} Season(s)</p>
                    </div>
                    <div class="text-white mb-1">
                        <p v-if="series.overview" class="max-h-40 overflow-y-auto">
                            {{ series.overview }}
                        </p>
                        <p v-else class="items-center">No overview.</p>
                    </div>
                </template>
                <template #footer>
                    <div class="flex justify-between gap-8 md:grid md:grid-cols-3">
                        <button-on @click="navigateBack" label="Voltar" icon="pi pi-arrow-left" class="rounded-lg font-bold py-2 justify-center text-white px-8 pr-10 hover:bg-gray-700"/>
                        <button-on @click="toggleFavorite" :label="favoriteLabel" :icon="favoriteIcon" :class="{
                            'rounded-lg font-bold py-2 justify-center': true,
                            'border-2': true,
                            'hover:bg-white hover:text-black': true,
                            'border-white text-white px-5 pr-6': !isFavorite,
                            'px-4 bg-white text-black': isFavorite
                        }" />
                    </div>
                </template>
            </card-on>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SerieService } from './serie.service';
import { SeriesModel } from '../../model/series.model';
import { AdjustScreen } from '@/utils/adjustScreen.utils';
import { SaveFavorites } from '@/utils/saveFavorites.util';
import { ToastsMessages } from '@/utils/toast.utils';

export default defineComponent({
    data() {
        return {
            series: {} as SeriesModel,
            id: this.$route.params.id,
            loading: true,
            isFavorite: false
        };
    },
    methods: {
        fetchSeriesDetail(id: string) {
            this.serviceSeriesDetail.serie.subscribe({
                next: (response) => {
                    this.series = response;
                    this.scrollScreenToTop();
                    this.loading = false;
                    this.checkIfFavorite();
                },
            });

            this.serviceSeriesDetail.getSeriesById(id)
        },
        checkIfFavorite() {
            const allFavorites = this.saveFavorites.favorites;
            this.isFavorite = allFavorites.series.some((serie) => serie.id === this.series.id);
        },
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
            const nameSerie = this.series.name;
            const action = this.isFavorite ? 'adicionado aos' : 'removido dos';

            if (this.isFavorite) {
                this.saveFavorites.addFavorite(this.series);
            } else if (typeof this.series.id === 'number') {
                this.saveFavorites.removeFavorite(this.series.id);
            }

            ToastsMessages.showSuccessToast(`${nameSerie} foi ${action} favoritos.`, this.favoriteSummary, this);
        },
         navigateBack() {
            this.$router.go(-1);
        }
    },
    mounted() {
        const seriesId = String(this.$route.params.id);
        this.fetchSeriesDetail(seriesId);

    },
    computed: {
        backgroundImage(): string {
            return this.series.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${this.series.backdrop_path}`
                : 'https://st.depositphotos.com/1006017/4578/i/450/depositphotos_45789751-stock-photo-empty-cinema-screen-with-audience.jpg';
        },
        favoriteLabel(): string {
            return this.isFavorite ? 'Favoritado' : 'Favoritar';
        },
        favoriteIcon(): string {
            return this.isFavorite ? 'pi pi-star-fill' : 'pi pi-star';
        },
        scrollScreenToTop() {
            return AdjustScreen.getWindowScroll;
        },
        serviceSeriesDetail(): SerieService {
            return new SerieService()
        },
        saveFavorites() {
            return new SaveFavorites();
        },
        favoriteSummary(): string {
            return this.isFavorite ? 'Favoritado!' : 'Desfavoritado!';
        }
    }
});
</script>