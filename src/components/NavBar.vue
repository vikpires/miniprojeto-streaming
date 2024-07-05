<template>
  <div>
    <!-- Barra de navegação fixa -->
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
          <div class="hidden md:flex items-center space-x-4"> <!--hidden md:flex faz o conteudo ser oculto em telas menores que médias ou maiores-->
            <template v-for="route in endRoutes" :key="route.path">
              <button-on
                :class="{'font-bold': isActive(route.path)}"
                class="p-2 mx-4 text-sm transition duration-300 transform hover:-translate-y-1 hover:bg-gray-700"
                :label="route.label"
                :icon="route.icon"
                @click="navigateTo(route.path)" />
            </template>
          </div>
 
          <!-- ícone do menu lateral para telas menores -->
          <div class="md:hidden relative"><!--visível apenas para telas pequenas, md:hidden deixa oculto para telas medias ou maiores-->
            <button-on @click="toggleSideBar" class="focus:outline-none"> <!--quando há o clique no toggle, ele se torna verdadeiro e aparece o pi-times-->
              <i :class="['pi', sidebarVisible ? 'pi-times' : 'pi-bars']" class="text-lg"></i>
            </button-on>
          </div>
        </template>
      </tool-bar>
    </div>
 
    <!-- espaço de margem para o conteúdo principal -->
      <div class="mt-14"></div>
 
    <!-- Sidebar -->
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
 
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      sidebarVisible: false,
      mainRoutes: [
        { label: "Home", path: "/", icon: "pi pi-home" },
        { label: "Séries", path: "/series", icon: "pi pi-list" },
        { label: "Filmes", path: "/movies", icon: "pi pi-video" }
      ],
      endRoutes: [
        { label: "Favoritados", path: "/favs", icon: "pi pi-star" }
      ]
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      this.sidebarVisible = false;
    },
    toggleSideBar() {
      this.sidebarVisible = !this.sidebarVisible;
      // ajuste do margin-left do conteúdo principal quando a sidebar é aberta ou fechada
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.marginLeft = this.sidebarVisible ? '52px' : '0';
      }
    },
    isActive(path){ //verifica se a rota está ativa para deixar a label bold
      return this.$route.path === path;
    }
  }
};
</script>



