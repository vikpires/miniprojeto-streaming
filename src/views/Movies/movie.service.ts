/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MoviesRest } from "@/service/rest/movies.rest";
import { Subject, Observable, take } from "rxjs";


export class MovieService {

    constructor(
        private _movies = new MoviesRest(),
        private _movie = new MoviesRest()
    ) { }

    private allMovies$: Subject<any> = new Subject<any>();
    allMovies: Observable<any> = this.allMovies$.asObservable();

    private movie$: Subject<any> = new Subject<any>();
    movie: Observable<any> = this.movie$.asObservable();

    getMovies(page: number = 1): void {
        this._movies.getMovies(page).pipe(take(1)).subscribe({
            next: (response) => {
                this.allMovies$.next(response);
            },
        });
    }

    getMoviesById(id: string) {
        this._movie.getMoviesById(id).pipe(take(1)).subscribe({
            next: (response) => {
                this.movie$.next(response)
            }
        })
    }
}
