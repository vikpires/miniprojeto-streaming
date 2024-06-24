import FilmStreaming from "@/components/FilmStreaming.vue";
import SerieStreaming from "@/components/SerieStreaming.vue";
import HomeStreaming from "@/components/HomeStreaming.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Menu from "primevue/menu";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

//import useToast from "primevue/usetoast" const toast = useToast()


import {App} from "vue";

export function setComponent(app:App){
    app.component('film-streaming', FilmStreaming)
    app.component('serie-streaming', SerieStreaming)
    app.component('home-streaming', HomeStreaming)
    app.component('button-on', Button)
    app.component('input-text', InputText)
    app.component('toast-on', Toast)
    app.component('card-on', Card)
    app.component('tool-bar', Toolbar)
    app.component('menu-on', Menu)
    app.component('DataTable',DataTable)
    app.component('ColumnApp', Column)


}