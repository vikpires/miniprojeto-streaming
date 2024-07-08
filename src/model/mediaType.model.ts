import { MoviesModel } from "@/model/movies.model";
import { SeriesModel } from "@/model/series.model";

export class MediaType {
    constructor(
        public movies: MoviesModel[] = [],
        public series: SeriesModel[] = []
    ) {}
}