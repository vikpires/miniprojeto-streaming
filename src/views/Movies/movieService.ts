
import { MoviesModel } from "@/model/movies.model";
import { MoviesRest } from "@/service/rest/movies.rest";
import { BehaviorSubject, Observable } from "rxjs";


export class MovieService{
    private _movieRest = new MoviesRest();
    private allMovies$: BehaviorSubject<MoviesModel[]> = new BehaviorSubject<MoviesModel[]>([]);
    allMovies:Observable<MoviesModel[]> =  this.allMovies$.asObservable();

    

    getMovies():void {
        this._movieRest.getMovies().subscribe({
            next: (movies: MoviesModel[]) => {
                this.allMovies$.next(movies);
            },
        });
    }
}
