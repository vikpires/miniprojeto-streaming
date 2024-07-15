<template>
  <div class="page">
    <div class="fixed bottom-0 w-full">
      <paginator-on 
        :rows="20" 
        :totalRecords="totalRecords" 
        :first="(currentPage - 1) * 20"
        :pageCount="maxPages"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} até {last} de {totalRecords}" 
        @page="onPageChange"
        :pt="{ 
          root: {
            class:['bg-gray-800','text-sm md:text-base','rounded-none', 'text-slate-300', 'py-1 lg:py-0']
          },
          current: ['text-slate-300'],
          firstpagebutton: ['hover:bg-gray-700'], previouspagebutton: ['hover:bg-gray-700'], nextpagebutton: ['hover:bg-gray-700'], lastpagebutton: ['hover:bg-gray-700']
         }"
        /> 
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { PageState } from 'primevue/paginator';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaginatorPages',
  props: {
    totalRecords: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    maxPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    onPageChange(event: PageState): void {
      this.$emit('page-change', event.page + 1); 
      this.$router.push({name: 'series', query: {page: event.page + 1}})
    }
  }
});
</script>
