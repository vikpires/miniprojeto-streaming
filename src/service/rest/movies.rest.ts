import { Observable } from "rxjs";
import api from "../rxjs";

export class MoviesRest {
    getMoviesById(id: number, mediaType: string): Observable<string>{
        const url = `/${mediaType}/${id}`;
        return api.get(url)
    }
    getAllMovies(): Observable<string>{
        const url = `/discover/movie/`;
        return api.get(url)
    }
}
