import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";

import { App } from "vue";

export function setPrimeVueComponents(app: App) {
    app.component('button-on', Button);
    app.component('card-on', Card);
    app.component('column-app', Column);
    app.component('data-table', DataTable);
    app.component('dialog-on', Dialog);
    app.component('input-text', InputText);
    app.component('menu-on', Menu);
    app.component('paginator-on', Paginator);
    app.component('progress-spinner', ProgressSpinner);
    app.component('side-bar', Sidebar);
    app.component('skeleton-on', Skeleton);
    app.component('toast-on', Toast);
    app.component('tool-bar', Toolbar);
}
