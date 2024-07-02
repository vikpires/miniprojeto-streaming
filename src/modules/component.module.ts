import NavBar from "@/components/NavBar.vue";

//import useToast from "primevue/usetoast" const toast = useToast()


import {App} from "vue";

export function setComponents(app:App){
    app.component('nav-bar', NavBar)
}