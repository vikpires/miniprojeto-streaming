import { forkJoin, Observable } from "rxjs";
import api from "../rxjs";

export class HomeRest {

    getPopularMovies(page: number = 1): Observable<any> {
        const url = `/trending/movie/day?page=${page}`;
        return api.get(url);
    }

    getPopularSeries(page: number = 1): Observable<any> {
        const url = `/trending/tv/day?page=${page}`;
        return api.get(url);
    }

    getPopularMoviesAndSeries(page: number = 1): Observable<any> {
        return forkJoin({
            movies: this.getPopularMovies(page),
            series: this.getPopularSeries(page)
        });
    }
}
