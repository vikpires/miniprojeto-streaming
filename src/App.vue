<template>
  <div class="bg-gray-900 min-h-screen">
    <nav-bar />
    <div class="content pt-16">
      <router-view />
      <toast-on/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>