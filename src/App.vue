<template>
  <main class="bg-gray-900 min-h-screen flex flex-col">
    <navbar />
    <section class="content pt-16">
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