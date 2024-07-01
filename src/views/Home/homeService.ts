import { MoviesRest } from "@/service/rest/movies.rest";
import { SeriesRest } from "@/service/rest/series.rest";
import { BehaviorSubject, Observable } from "rxjs";]

export class HomeService{
    constructor(private _movieRest = new MovieRest){}
    private allMoviesPopular$: BehaviorSubject<any> = new BehaviorSubject<any>([])

    allMoviesPopular:Observable<any> =  this.allMoviesPopular$.asObservable()

    getAllMoviesPopular():void {
        this._movieRest.getA
    }

}