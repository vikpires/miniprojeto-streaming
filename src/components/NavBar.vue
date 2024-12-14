<template>
  <nav class="fixed top-0 w-full z-50">
    <tool-bar
      class="bg-gray-800 text-white grid grid-cols-[1.5fr,2fr,1fr] lg:grid-cols-[1fr,2fr,1fr] items-center justify-between p-4 shadow-lg rounded-none">
      <template #start>
        <p class="flex items-center">
          <span 
          @click="navigateTo('/')" 
          class="ml-3 md:ml-5 text-2xl font-bold cursor-pointer md:text-3xl"
          title="Logo ViBi Flix" 
          alt="Logo ViBi Flix">
            ViBi Flix
          </span>
        </p>
      </template>
      <template #center>
        <span class="hidden md:flex flex-grow justify-center items-center space-x-8 lg:space-x-20">
          <template v-for="route in mainRoutes" :key="route.path">
            <button-on 
              :class="{ 'font-bold': isActive(route.path) }"
              class="p-2 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-700"
              :title="route.label" 
              :label="route.label" 
              :icon="route.icon" 
              @click="navigateTo(route.path)" 
            />
          </template>
        </span>
      </template>
      <template #end>
        <section class="flex justify-end flex-grow items-center">
        <span class="hidden md:flex">
          <button-on 
            @click="isAboutVisible = true" 
            icon="pi pi-info-circle"
            class="p-2 mr-4 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-700"
            title="Sobre" 
            severity="warn" 
          />
        </span>
        <span class="md:hidden relative">
          <button-on @click="toggleSideBar" class="focus:outline-none">
            <i :class="['pi', isSidebarVisible ? 'pi-times' : 'pi-bars']" class="text-lg"></i>
          </button-on>
        </span>
      </section>
      </template>
    </tool-bar>

    <section v-if="isSidebarVisible"
      class="fixed top-0 right-0 z-50 flex flex-col bg-gray-800 text-white w-44 max-h-screen overflow-y-auto p-5">
      <span class="flex justify-end">
        <button @click="toggleSideBar" class="focus:outline-none">
          <i class="pi pi-times"></i>
        </button>
      </span>
      <section class="space-y-4 mt-8">
        <template v-for="route in mainRoutes" :key="route.path">
          <button-on 
            :class="{ 'font-bold': isActive(route.path) }"
            class="p-2 text-sm transition duration-300 transform hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            :title="route.label" 
            :label="route.label" 
            :icon="route.icon" 
            @click="navigateTo(route.path)"
          />
        </template>
        <span>
          <button-on 
            label="Sobre" 
            @click="isAboutVisible = true, isSidebarVisible = false" 
            icon="pi pi-info-circle"
            title="Sobre"
            class="mt-4 p-2 text-sm transition duration-300 transform hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            severity="warn" 
          />
        </span>
      </section>
    </section>
    <about-dialog :visible="isAboutVisible" @cancel-dialog="isAboutVisible = false" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Route {
  label: string;
  path: string;
  icon: string;
}

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      isSidebarVisible: false as boolean,
      isAboutVisible: false as boolean,
      mainRoutes: [
        { label: "Home", path: "/", icon: "pi pi-home" } as Route,
        { label: "Séries", path: "/series", icon: "pi pi-list" } as Route,
        { label: "Filmes", path: "/movies", icon: "pi pi-video" } as Route,
        { label: "Favoritos", path: "/favs", icon: "pi pi-star" } as Route
      ]
    };
  },
  methods: {
    navigateTo(route: string): void {
      this.$router.push(route);
      this.isSidebarVisible = false;
    },
    toggleSideBar(): void {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    isActive(path: string): void {
      this.$route.path === path;
    },
  }
});
</script>
