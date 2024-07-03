import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Menu from "primevue/menu";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Sidebar from "primevue/sidebar";

//import useToast from "primevue/usetoast" const toast = useToast()


import {App} from "vue";

export function setPrimeVueComponents(app:App){

    app.component('button-on', Button)
    app.component('input-text', InputText)
    app.component('toast-on', Toast)
    app.component('card-on', Card)
    app.component('tool-bar', Toolbar)
    app.component('menu-on', Menu)
    app.component('data-table',DataTable)
    app.component('column-app', Column)
    app.component('side-bar', Sidebar)

}