<template>
  <div>
    <div class="fixed top-0 w-full z-50">
      <tool-bar class="bg-gray-800 text-white flex justify-between items-center p-4 shadow-lg rounded-none">
        <template #start>
          <div class="flex items-center space-x-4">
            <span @click="navigateTo('/')" class="ml-3 md:ml-5 text-2xl font-bold cursor-pointer md:text-3xl">ViBi Flix</span>
          </div>
        </template>
        <template #center>
          <div class="hidden md:flex items-center space-x-8 lg:space-x-20">
            <template v-for="route in mainRoutes" :key="route.path">
              <button-on
                :class="{'font-bold': isActive(route.path)}"
                class="p-2 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-700"
                :label="route.label"
                :icon="route.icon"
                @click="navigateTo(route.path)" />
            </template>
          </div>
        </template>
        <template #end>
          <div class="hidden md:flex items-center space-x-4"> 
            <template v-for="route in endRoutes" :key="route.path">
              <button-on
                :class="{'font-bold': isActive(route.path)}"
                class="p-2 mx-4 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-700"
                :label="route.label"
                :icon="route.icon"
                @click="navigateTo(route.path)" />
            </template>
          </div>
 
          <div class="md:hidden relative">
            <button-on @click="toggleSideBar" class="focus:outline-none"> 
              <i :class="['pi', sidebarVisible ? 'pi-times' : 'pi-bars']" class="text-lg"></i>
            </button-on>
          </div>
        </template>
      </tool-bar>
    </div>
 
    <div v-if="sidebarVisible" class="fixed top-0 right-0 z-50 flex flex-col bg-gray-800 text-white w-44 max-h-screen overflow-y-auto p-5">
      <div class="flex justify-end">
        <button @click="toggleSideBar" class="focus:outline-none">
          <i class="pi pi-times"></i>
        </button>
      </div>
      <div class="space-y-4 mt-8">
        <template v-for="route in mainRoutes" :key="route.path">
          <button-on
            :class="{'font-bold': isActive(route.path)}"
            class="p-2 text-sm transition duration-300 transform hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            :label="route.label"
            :icon="route.icon"
            @click="navigateTo(route.path)" />
        </template>
        <template v-for="route in endRoutes" :key="route.path">
          <button-on
            :class="{'font-bold': isActive(route.path)}"
            class="p-2 text-sm transition duration-300 transform hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            :label="route.label"
            :icon="route.icon"
            @click="navigateTo(route.path)" />
        </template>
      </div>
    </div>
  </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue';

interface Route {
  label: string;
  path: string;
  icon: string;
}

export default defineComponent ({
  name: 'NavBar',
  data() {
    return {
      sidebarVisible: false,
      mainRoutes: [
        { label: "Home", path: "/", icon: "pi pi-home" } as Route,
        { label: "Séries", path: "/series", icon: "pi pi-list" } as Route,
        { label: "Filmes", path: "/movies", icon: "pi pi-video" } as Route
      ],
      endRoutes: [ 
        { label: "Favoritados", path: "/favs", icon: "pi pi-star" } as Route
      ]
    };
  },
  methods: {
    navigateTo(route: string) {
      this.$router.push(route);
      this.sidebarVisible = false;
    },
    toggleSideBar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    isActive(path: string){ 
      return this.$route.path === path;
    }
  }
});
</script>