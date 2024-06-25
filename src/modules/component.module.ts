import FilmStreaming from "@/components/FilmStreaming.vue";
import SerieStreaming from "@/components/SerieStreaming.vue";
import HomeStreaming from "@/components/HomeStreaming.vue";


//import useToast from "primevue/usetoast" const toast = useToast()


import {App} from "vue";

export function setComponent(app:App){
    app.component('film-streaming', FilmStreaming)
    app.component('serie-streaming', SerieStreaming)
    app.component('home-streaming', HomeStreaming)
   
}