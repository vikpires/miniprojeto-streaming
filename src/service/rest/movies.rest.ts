/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Observable } from "rxjs";
import api from "../rxjs";

export class MoviesRest {
    getMoviesById(id: string): Observable<any>{
        const url = `/movie/${id}`;
        return api.get(url);
    }
    getMovies(page: number = 1): Observable<any>{
        const url = `/movie/popular?page=${page}`;
        return api.get(url);
    }
}
