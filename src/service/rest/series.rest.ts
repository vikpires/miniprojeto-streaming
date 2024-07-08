import { Observable } from "rxjs";
import api from "../rxjs";
import { SeriesModel } from "@/model/series.model";
import { PagesModel } from "@/model/pages.model";

export interface SeriesResponse extends PagesModel {
    results: SeriesModel[];
}

export class SeriesRest {
    getSeriesById(id: string): Observable<SeriesModel>{
        const url = `/tv/${id}`;
        return api.get<SeriesModel>(url);
    }
    getSeries(): Observable<SeriesResponse> {
        const url = `/discover/tv`;
        return api.get<SeriesResponse>(url);
    }
}
