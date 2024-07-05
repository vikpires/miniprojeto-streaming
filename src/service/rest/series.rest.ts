import { Observable, map } from "rxjs";
import api from "../rxjs";
import { SeriesModel } from "@/model/series.model";

export class SeriesRest {
    getMoviesById(id: string): Observable<SeriesModel>{
        const url = `/tv/${id}`;
        return api.get<SeriesModel>(url);
    }
    getMovies(): Observable<SeriesModel[]>{
        const url = `/discover/tv`;
        return api.get<{ results: SeriesModel[] }>(url).pipe(map(response => response.results));
    }
}
