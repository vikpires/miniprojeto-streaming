/* eslint-disable */
import { Observable } from "rxjs";
import api from "../rxjs";

export class SeriesRest {
    getSeriesById(id: string): Observable<any> {
        const url = `/tv/${id}`;
        return api.get(url);
    }
    getSeries(page: number = 1): Observable<any> {
        const url = `/discover/tv?page=${page}`;
        return api.get(url);
    }
}
