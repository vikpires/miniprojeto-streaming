<template>
    <div v-if="loading"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
        <progress-spinner strokeWidth="4" animationDuration="1.5s" />
    </div>
    <section v-else class="relative h-screen overflow-hidden bg-fixed bg-cover">
        <div class="absolute top-0 left-0 h-full w-7/12 md:w-3/4 bg-gradient-to-r from-black to-transparent z-10"></div>
        <img :src="backgroundImage" :alt="movie.original_title"
            class="absolute top-0 w-full h-full object-cover filter brightness-50" />
        <div class="bg-opacity-80 flex top-48 md:top-72 lg:top-64 xl:top-52 z-30 relative items-center p-10">
            <card-on class="w-full sm:w-5/6 md:w-4/6 lg:w-2/5 p-4 rounded-lg shadow-lg bg-black bg-opacity-50">
                <template #title>
                    <h3 v-if="movie.original_title" class="text-2xl text-white font-bold tracking-wider mb-1">
                        {{ movie.original_title }}
                    </h3>
                </template>
                <template #content>
                    <div class="flex flex-row text-gray-400 gap-2 mb-3">
                        <p v-if="movie.release_date" id="ano">{{ movie.release_date }}</p>
                        <p class="text-green-400 brightness-120">
                            {{ movie.vote_average }}
                        </p> | <p>{{ movie.runtime }} Min</p>
                    </div>
                    <div class="text-white mb-1">
                        <p v-if="movie.overview" class="max-h-40 overflow-y-auto">
                            {{ movie.overview }}
                        </p>
                        <p v-else class="items-center">No overview.</p>
                    </div>
                </template>
                <template #footer>
                    <div class="flex justify-center">
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
import { MovieService } from './movie.service';
import { MoviesModel } from '../../model/movies.model';
import { AdjustScreen } from '@/utils/adjustScreen.utils';
import { SaveFavorites } from '@/utils/saveFavorites.util';
import { ToastsMessages } from '@/utils/toast.utils';

export default defineComponent({
    data() {
        return {
            movie: {} as MoviesModel,
            id: this.$route.params.id,
            loading: true,
            isFavorite: false
        };
    },
    methods: {
        fetchMoviesDetail(id: string) {
            this.serviceMoviesDetail.movie.subscribe({
                next: (response) => {
                    this.movie = response;
                    this.scrollScreenToTop();
                    this.loading = false;
                    this.checkIfFavorite();
                },
            });

            this.serviceMoviesDetail.getMoviesById(id)
        },
        checkIfFavorite() {
            const allFavorites = this.saveFavorites.favorites;
            this.isFavorite = allFavorites.movies.some((movie) => movie.id === this.movie.id);
        },
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
            const nameMovie = this.movie.original_title;
            const action = this.isFavorite ? 'adicionado aos' : 'removido dos';

            if (this.isFavorite) {
                this.saveFavorites.addFavorite(this.movie);

            } else if (typeof this.movie.id === 'number') {
                this.saveFavorites.removeFavorite(this.movie.id);
            }
            ToastsMessages.showSuccessToast(`${nameMovie} foi ${action} favoritos.`, this.favoriteSummary, this);
        },
    },
    mounted() {
        const movieId = String(this.$route.params.id);
        this.fetchMoviesDetail(movieId);
    },
    computed: {
        backgroundImage(): string {
            return this.movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}`
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
        serviceMoviesDetail(): MovieService {
            return new MovieService()
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