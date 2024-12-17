import { SeriesRest } from "@/service/rest/series.rest";
import { Subject, Observable, take } from "rxjs";

export class SerieService {
    constructor(
        private _series = new SeriesRest(),
        private _serie = new SeriesRest()
    ) { }

    private allSeries$: Subject<any> = new Subject<any>();
    allSeries: Observable<any> = this.allSeries$.asObservable();

    private serie$: Subject<any> = new Subject<any>();
    serie: Observable<any> = this.serie$.asObservable();

    getSeries(page: number = 1): void {
        this._series.getSeries(page).pipe(take(1)).subscribe({
            next: (response) => {
                this.allSeries$.next(response);
            }
        });
    }

    getSeriesById(id: string): void {
        this._serie.getSeriesById(id).pipe(take(1)).subscribe({
            next: (response) => {
                this.serie$.next(response);
            }
        });
    }
}
