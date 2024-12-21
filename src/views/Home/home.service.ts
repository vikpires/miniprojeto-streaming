import { HomeRest } from "@/service/rest/home.rest";
import { Subject, Observable, take, forkJoin } from "rxjs";

interface MediaResponse {
    results: any[];
    total_results: number;
    total_pages: number;
}

export class HomeService {
    constructor(
        private _allMedia = new HomeRest()
    ) { }

    private allMedia$: Subject<MediaResponse> = new Subject<MediaResponse>();
    allMedia: Observable<MediaResponse> = this.allMedia$.asObservable();

    getAllMedia(page: number = 1): void {
        forkJoin({
            movies: this._allMedia.getPopularMovies(page),
            series: this._allMedia.getPopularSeries(page)
        })
            .pipe(take(1))
            .subscribe({
                next: ({ movies, series }) => {
                    const allResults = [
                        ...movies.results,
                        ...series.results
                    ];
                    this.allMedia$.next({
                        results: allResults,
                        total_results: movies.total_results + series.total_results,
                        total_pages: Math.min(movies.total_pages, series.total_pages)
                    });
                }
            });
    }
}
