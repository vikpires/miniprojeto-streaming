export class MoviesModel {
    constructor(
        public adult?: false,
        public backdrop_path?: string,
        public genre_ids?: number[],
        public id?: number,
        public original_language?: string,
        public original_title?: string,
        public overview?: string,
        public popularity?: number,
        public poster_path?: string,
        public release_date?: Date,
        public title?: string,
        public vote_average?: number,
        public vote_acount?: number,
        public runtime?: number,
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
