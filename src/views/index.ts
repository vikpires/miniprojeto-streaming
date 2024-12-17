export class Views {
    public static Home(): Promise<any> {
        return import("@/views/Home/Home.vue");
    }

    public static Movies(): Promise<any> {
        return import("@/views/Movies/Movies.vue");
    }

    public static MoviesDetail(): Promise<any> {
        return import("@/views/Movies/MoviesDetail.vue");
    }

    public static Series(): Promise<any> {
        return import("@/views/Series/Series.vue");
    }

    public static SeriesDetail(): Promise<any> {
        return import("@/views/Series/SeriesDetail.vue");
    }

    public static Favorites(): Promise<any> {
        return import("@/views/Favorites/Favorites.vue");
    }
}
