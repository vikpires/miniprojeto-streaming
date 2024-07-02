<template>

    <div>
        <tool-bar class="bg-gray-700 text-white flex justify-between items-center p-4 shadow-lg rounded-none">
           
            <template #start>
                <div class="flex items-center space-x-4">
                <span @click="navigateTo('/')" class="text-xl font-bold">ViBi Streaming</span>
                <div class="justify-center">
                <template v-for="route in mainRoutes" :key="route.path">
                        <button-on class="p-2 mx-4 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-600" 
                        :label="route.label"
                        :icon="route.icon"
                        @click="navigateTo(route.path)"/>
                    </template>
           
            </div>    
            </div>
            </template>

            <template #end>
                <div class="flex-1">
                <template v-for="route in endRoutes" :key="route.path">
                        <button-on class="p-2 mx-4 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-600" 
                        :label="route.label"
                        :icon="route.icon"
                        @click="navigateTo(route.path)"/>
                    </template>
                </div>
            </template>
        </tool-bar>
    </div>

  </template>
  
  <script>

  export default {
    name: 'NavBar',
    data(){
        return {
            mainRoutes: [{label: "Home", path: "/", icon: "pi pi-home"}, 
                {label: "Séries", path: "/series", icon: "pi pi-list"},
                {label: "Filmes", path: "/movies", icon: "pi pi-video"}
            ],
            endRoutes:[{label: "Favoritados", path: "/favs", icon: "pi pi-star"}]
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        }
    }
  };
  </script>
