import NavBar from "../components/NavBar.vue";
import MoviesCard from "../components/MoviesCard.vue";
import SeriesCard from "../components/SeriesCard.vue";
import PaginatorPages from "../components/PaginatorPages.vue";
import AboutDialog from "../components/AboutDialog.vue";

import { App } from "vue";

export function setComponents(app: App) {
    app.component('about-dialog', AboutDialog);
    app.component('movies-card', MoviesCard);
    app.component('navbar', NavBar);
    app.component('paginator-pages', PaginatorPages);
    app.component('series-card', SeriesCard);
}
