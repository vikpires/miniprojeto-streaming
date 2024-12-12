import NavBar from "../components/NavBar.vue";
import MoviesCard from "../components/MoviesCard.vue";
import SeriesCard from "../components/SeriesCard.vue";
import PaginatorPages from "../components/PaginatorPages.vue";

import {App} from "vue";

export function setComponents(app:App){
    app.component('nav-bar', NavBar)
    app.component('movies-card', MoviesCard)
    app.component('series-card', SeriesCard)
    app.component('paginator-pages', PaginatorPages)
}