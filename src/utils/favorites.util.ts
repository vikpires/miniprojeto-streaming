import { SeriesModel } from "@/model/series.model";
import { MoviesModel } from "@/model/movies.model";
import { LocalStorage } from "./localStorage.util";

export class SaveFavorites {
    private readonly FAVORITES_KEY = 'favorites';
    private _favorites: Array<SeriesModel | MoviesModel>;

    constructor() {
        this._favorites = this.loadFavorites();
    }

    private loadFavorites(): Array<SeriesModel | MoviesModel> {
        return LocalStorage.getItem<Array<SeriesModel | MoviesModel>>(this.FAVORITES_KEY) || [];
    }

    private saveFavorites(): void {
        LocalStorage.setItem(this.FAVORITES_KEY, this._favorites);
    }

    get favorites(): Array<SeriesModel | MoviesModel> {
        return this._favorites;
    }

    set favorites(value: Array<SeriesModel | MoviesModel>) {
        this._favorites = value;
        this.saveFavorites();
    }

    addFavorites(item: SeriesModel | MoviesModel): void {
        if (item.id !== undefined && !this.isFavorite(item.id)) {
            this._favorites.push(item);
            this.saveFavorites();
        }
    }

    removeFavorite(itemId: number): void {
        this._favorites = this._favorites.filter(item => item.id !== itemId);
        this.saveFavorites();
    }

    isFavorite(itemId: number): boolean {
        return this._favorites.some(item => item.id === itemId);
    }
}
