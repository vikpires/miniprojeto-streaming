import { HomeRest } from "@/service/rest/home.rest";
import { Subject, Observable, take } from "rxjs";

export class HomeService {
    constructor(
        private _allMedia = new HomeRest()
    ) { }

    private allMedia$: Subject<any> = new Subject<any>();
    allMedia: Observable<any> = this.allMedia$.asObservable();

    getAllMedia(page: number = 1): void {
        this._allMedia.getPopularMoviesAndSeries(page)
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
