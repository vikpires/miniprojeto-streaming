import { Observable } from "rxjs";
import api from "../rxjs";

export class MoviesRest {
    getMoviesById(id: string): Observable<any> {
        const url = `/movie/${id}?append_to_response=videos`;
        return api.get(url);
    }
    getMovies(page: number = 1): Observable<any> {
        const url = `/movie/popular?page=${page}`;
        return api.get(url);
    }
}
