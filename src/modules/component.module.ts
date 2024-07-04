import NavBar from "@/components/NavBar.vue";
import MoviesCard from "@/components/MoviesCard.vue";
import SeriesCard from "@/components/SeriesCard.vue";

//import useToast from "primevue/usetoast" const toast = useToast()


import {App} from "vue";

export function setComponents(app:App){
    app.component('nav-bar', NavBar)
    app.component('movies-card', MoviesCard)
    app.component('series-card', SeriesCard)
}