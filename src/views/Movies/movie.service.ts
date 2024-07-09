/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MoviesRest } from "@/service/rest/movies.rest";
import { BehaviorSubject, Observable, take } from "rxjs";


export class MovieService{

    constructor( private _movie = new MoviesRest()){}
  
    private allMovies$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    allMovies:Observable<any> =  this.allMovies$.asObservable();

    getMovies(page: number = 1):void {
        this._movie.getMovies(page).pipe(take(1)).subscribe({
            next: (response) => {
                this.allMovies$.next(response);
            },
        });
    }
}
