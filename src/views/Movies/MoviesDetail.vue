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
                <img :src="backgroundImage" :alt="movie.original_title"
                    class="absolute top-0 w-full h-full object-cover filter brightness-50" />
            </figure>
            <section
                class="bg-opacity-80 flex top-16 md:top-32 z-30 relative items-center p-8 flex-col lg:flex-row-reverse gap-8 md:flex md:gap-12 lg:gap-0 justify-center lg:justify-between">
                <section
                    class="grid grid-cols-2 gap-x-12 w-full items-center justify-center md:hidden">
                    <span class="items-center">
                        <button-on 
                            @click="navigateBack" 
                            label="Voltar" 
                            icon="pi pi-arrow-left"
                            class="rounded-lg font-bold py-[10px] px-4 justify-center text-white text-sm active:scale-90 hover:bg-gray-700" 
                        />
                    </span>
                    <span class="items-center">
                        <button-on 
                            @click="toggleFavorite" 
                            :label="favoriteLabel" 
                            :icon="favoriteIcon" 
                            :class="{
                                'rounded-lg font-bold py-2 justify-center border-2 active:scale-90': true,
                                'border-white text-sm px-5 text-white': !isFavorite,
                                'bg-white text-sm px-4 text-black': isFavorite 
                            }" 
                        />
                    </span>
                </section>
                <section v-if="urlTrailer" class="lg:w-1/4 lg:mr-20 md:w-2/3 flex justify-center items-center">
                    <iframe :src="urlTrailer" :title="`Trailer do filme ${movie.original_title}`" allow="fullscreen"
                        no-referrer class="h-56 md:w-full md:h-72 lg:h-80 border-none">
                    </iframe>
                </section>
                <figure v-else :class="{ 'hidden': !isNotFoundVideoLoaded }"
                    class="flex justify-center items-center w-full lg:w-1/4 lg:mr-20 md:w-3/5">
                    <img 
                        :src="backgroundImage" 
                        alt="Imagem para vídeo não encontrado" 
                        title="Vídeo não encontrado"
                        @load="onNotFoundVideoLoad"
                        class="rounded-xl w-48 h-48 md:h-72 object-cover opacity-75 md:w-96" 
                    />
                </figure>
                <card-on
                    class="w-full sm:w-5/6 md:w-4/6 lg:w-2/5 p-4 rounded-xl shadow-lg bg-black bg-opacity-50 font-roboto">
                    <template #title>
                        <h3 v-if="movie.original_title" class="text-2xl text-white font-bold tracking-wider mb-1">
                            {{ movie.original_title }}
                        </h3>
                    </template>
                    <template #content>
                        <span class="flex flex-row text-gray-400 gap-2 mb-3">
                            <p v-if="movie.release_date" id="ano">
                                {{ new Date(movie.release_date).getFullYear() }}
                            </p>
                            <p> | </p>
                            <p v-if="movie.vote_average"
                                :class="{ 'text-green-400': movie.vote_average >= 6.00, 'text-red-500': movie.vote_average < 6.00 }"
                                class="brightness-125">
                                {{ movie.vote_average?.toFixed(2) }}
                            </p>
                            <p v-else>?</p> | 
                            <p v-if="movie.runtime">
                                {{ movie.runtime }} min
                            </p>
                            <p v-else>? min</p>
                        </span>
                        <span class="text-white mb-1">
                            <p v-if="movie.overview" class="max-h-40 overflow-y-auto text-left sm:text-sm text-base">
                                {{ movie.overview }}
                            </p>
                            <p v-else class="items-center">No overview.</p>
                        </span>
                    </template>
                    <template #footer>
                        <section
                            class="justify-between md:gap-8 md:grid md:grid-cols-3 items-center hidden">
                            <span class="items-center">
                                <button-on 
                                    @click="navigateBack" 
                                    label="Voltar" 
                                    icon="pi pi-arrow-left"
                                    class="rounded-lg font-bold py-[10px] px-8 justify-center text-white text-base active:scale-90 hover:bg-gray-700" 
                                />
                            </span>
                            <span class="items-center">
                                <button-on 
                                    @click="toggleFavorite" 
                                    :label="favoriteLabel" 
                                    :icon="favoriteIcon" 
                                    :class="{
                                        'rounded-lg font-bold py-2 px-8 justify-center border-2 active:scale-90 hover:bg-white hover:text-black': true,
                                        'border-white text-base text-white': !isFavorite,
                                        'bg-white text-base px-7 text-black': isFavorite
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
import { MovieService } from '@/views/Movies/movies.service';
import { MoviesModel } from '@/model/movies.model';
import { AdjustScreen } from '@/utils/adjustScreen.utils';
import { SaveFavorites } from '@/utils/saveFavorites.utils';
import { ToastMessages } from '@/utils/toast.utils';

export default defineComponent({
    name: 'movie-details',
    data() {
        return {
            movie: {} as MoviesModel,
            id: this.$route.params.id,
            isLoading: true as boolean,
            isFavorite: false as boolean,
            urlTrailer: '' as string | null,
            isNotFoundVideoLoaded: false as boolean,
        };
    },
    methods: {
        fetchMoviesDetail(id: string): void {
            this.serviceMoviesDetail.movie.subscribe({
                next: (response) => {
                    this.movie = response;
                    this.scrollScreenToTop();
                    this.isLoading = false;
                    this.checkIfFavorite();
                    this.setUrlTrailer();
                },
            });

            this.serviceMoviesDetail.getMoviesById(id);
        },
        checkIfFavorite(): void {
            const allFavorites = this.saveFavorites.favorites;
            this.isFavorite = allFavorites.movies.some((movie) => movie.id === this.movie.id);
        },
        toggleFavorite(): void {
            this.isFavorite = !this.isFavorite;
            const nameMovie = this.movie.original_title;
            const action = this.isFavorite ? 'adicionado aos' : 'removido dos';

            if (this.isFavorite) {
                this.saveFavorites.addFavorites(this.movie);

            } else if (typeof this.movie.id === 'number') {
                this.saveFavorites.clearFavorites(this.movie.id);
            }
            ToastMessages.showSuccessToast(`${nameMovie} foi ${action} favoritos.`, this.favoriteSummary, this);
        },
        setUrlTrailer(): void {
            if (this.movie.videos && this.movie.videos.results) {
                const trailer = this.movie.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    const url_trailer_movie = process.env.VUE_APP_URL_TRAILER;
                    this.urlTrailer = `${url_trailer_movie}${trailer.key}?controls=0`;
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
        const movieId = String(this.$route.params.id);
        this.fetchMoviesDetail(movieId);
    },
    computed: {
        favoriteLabel(): string {
            return this.isFavorite ? 'Favoritado' : 'Favoritar';
        },
        favoriteIcon(): string {
            return this.isFavorite ? 'pi pi-star-fill' : 'pi pi-star';
        },
        serviceMoviesDetail(): MovieService {
            return new MovieService();
        },
        saveFavorites(): SaveFavorites {
            return new SaveFavorites();
        },
        favoriteSummary(): string {
            return this.isFavorite ? 'Favoritado!' : 'Desfavoritado!';
        },
        backgroundImage(): string {
            const urlBackground = process.env.VUE_APP_URL_BACKGROUND;
            return this.movie.backdrop_path
                ? `${urlBackground}${this.movie.backdrop_path}`
                : require('@/assets/images/not_background.jpg');
        },
    }
});
</script>
