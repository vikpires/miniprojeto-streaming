import { MoviesRest } from "@/service/rest/movies.rest";
// import { SeriesRest } from "@/service/rest/series.rest";
import { BehaviorSubject, Observable } from "rxjs";

export class HomeService{
    private _movieRest = new MoviesRest();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private allMovies$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allMovies:Observable<any[]> =  this.allMovies$.asObservable();

    getMovies():void {
        this._movieRest.getMovies().subscribe({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            next: (response: any) => {
                this.allMovies$.next(response.results);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error: (err: any) => {
                console.log(err);
            }
        });
    }

}