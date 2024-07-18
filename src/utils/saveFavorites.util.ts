import { SeriesModel } from "@/model/series.model";
import { MoviesModel } from "@/model/movies.model";
import { MediaType } from "@/model/mediaType.model";
import { LocalStorage } from "./localStorage.util";

export class SaveFavorites {
    private readonly FAVORITES_KEY = 'favorites';
    private _favorites: MediaType = this.loadFavorites() || { movies: [], series: [] };

    private loadFavorites(): MediaType | null {
        const favorites =LocalStorage.getItem<MediaType>(this.FAVORITES_KEY);
        return favorites || { movies: [], series: [] };

    }

    private saveFavorites(): void {
        LocalStorage.setItem(this.FAVORITES_KEY, this._favorites);
    }

    get favorites(): MediaType {
        return this._favorites;
    }

    set favorites(value: MediaType) {
        this._favorites = value;
        this.saveFavorites();
    }

    addFavorite(item: MoviesModel | SeriesModel): void {
        if (!item.id || this.checkFavorite(item.id)) return;

        if ('original_title' in item) {
            this._favorites.movies.push(item as MoviesModel);
        } else if ('original_name' in item) {
            // this._favorites.series.push(item);
            this._favorites.series.push(item as SeriesModel);
        }
        this.saveFavorites();
    }
    
    removeFavorite(itemId: number): void {
        this._favorites.movies = this._favorites.movies.filter(movie => movie.id !== itemId);
        this._favorites.series = this._favorites.series.filter(series => series.id !== itemId);
        if (this._favorites.movies.length === 0 && this._favorites.series.length === 0) {
            this.clearFavorites();
        } else {
            this.saveFavorites();
        }
    }

    checkFavorite(itemId: number): boolean {
        return this._favorites.movies.some(movie => movie.id === itemId) ||
        this._favorites.series.some(series => series.id === itemId);    
    }
    
    clearFavorites(): void {
        LocalStorage.removeItem(this.FAVORITES_KEY);
        this._favorites = { movies: [], series: [] };
    }
}
