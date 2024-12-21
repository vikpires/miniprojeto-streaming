import { Observable } from "rxjs";
import api from "../rxjs";

export class HomeRest {

    getPopularMovies(page: number = 1): Observable<any> {
        const url = `/movie/popular?page=${page}`;
        return api.get(url);
    }

    getPopularSeries(page: number = 1): Observable<any> {
        const url = `/tv/popular?page=${page}`;
        return api.get(url);
    }
}
