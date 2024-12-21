export class SeriesModel {
    constructor(
        public adult?: false,
        public backdrop_path?: string,
        public genre_ids?: number[],
        public id?: number,
        public origin_country?: string[],
        public original_language?: string,
        public original_name?: string,
        public overview?: string,
        public popularity?: number,
        public poster_path?: string,
        public first_air_date?: Date,
        public name?: string,
        public vote_average?: number,
        public vote_acount?: number,
        public number_of_seasons?: number,
        public media_type?: string,
        public videos?: {
            results: Array<{
                id: string;
                key: string;
                name: string;
                site: string;
                type: string;
            }>;
        }
    ) { }
} 
