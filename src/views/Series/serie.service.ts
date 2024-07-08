/* eslint-disable */
import { SeriesRest } from "@/service/rest/series.rest";
import { BehaviorSubject, Observable, take } from "rxjs";

export class SerieService {
    constructor(private _serieRest = new SeriesRest()) {}

    private allSeries$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    allSeries: Observable<any> = this.allSeries$.asObservable();

    getSeries(page: number = 1): void {
        this._serieRest.getSeries(page).pipe(take(1)).subscribe({
            next: (response) => {
                this.allSeries$.next(response);
            }
        });
    }
}
