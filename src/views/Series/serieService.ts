// serieService.ts

import { SeriesRest } from "@/service/rest/series.rest";
import { BehaviorSubject, Observable } from "rxjs";
import { SeriesResponse } from "@/service/rest/series.rest";

export class SerieService {
    constructor(private _serieRest = new SeriesRest()) {}

    private allSeries$: BehaviorSubject<SeriesResponse | null> = new BehaviorSubject<SeriesResponse | null>(null);
    allSeries: Observable<SeriesResponse | null> = this.allSeries$.asObservable();

    getSeries(): void {
        this._serieRest.getSeries().subscribe({
            next: (response: SeriesResponse) => {
                this.allSeries$.next(response);
            },
            error: (error) => {
                console.error('Erro ao buscar as séries:', error);
            }
        });
    }
}
