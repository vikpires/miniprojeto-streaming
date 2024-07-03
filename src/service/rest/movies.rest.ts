import { Observable } from "rxjs";
import api from "../rxjs";

export class MoviesRest {
    getMoviesById(id: string): Observable<string>{
        const url = `/movie/${id}`;
        return api.get(url)
    }
    getMovies(): Observable<string>{
        const url = `/movie/popular`;
        return api.get(url)
    }
}
