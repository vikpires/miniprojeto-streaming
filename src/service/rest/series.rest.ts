import { Observable } from "rxjs";
import api from "../rxjs";

export class SeriesRest {
    getSeriesById(id: string): Observable<string>{
        const url = `/tv/${id}`;
        return api.get(url)
    }
    getSeries(): Observable<string>{
        const url = `/discover/tv`;
        return api.get(url)
    }
}
