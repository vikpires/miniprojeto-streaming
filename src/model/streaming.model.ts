export class StreamingModel {
    constructor(
        public adult?: boolean,
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
        public vote_acount?: number
    ){ }
}