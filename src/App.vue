<template>
  <main class="bg-gray-900 min-h-screen flex flex-col space-y-16 font-roboto">
    <navbar />
    <section>
      <router-view />
      <toast-on />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>