import { Observable, map } from "rxjs";
import api from "../rxjs";
import { MoviesModel } from "@/model/movies.model";

export class MoviesRest {
    getMoviesById(id: string): Observable<MoviesModel>{
        const url = `/movie/${id}`;
        return api.get<MoviesModel>(url);
    }
    getMovies(): Observable<MoviesModel[]>{
        const url = `/movie/popular`;
        return api.get<{ results: MoviesModel[] }>(url).pipe(map(response => response.results));
    }
}
