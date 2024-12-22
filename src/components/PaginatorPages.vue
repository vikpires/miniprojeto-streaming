<template>
  <section class="page">
    <section class="fixed bottom-0 w-full">
      <paginator-on 
        :rows="rowsPerPage" 
        :totalRecords="totalRecords" 
        :first="(currentPage - 1) * rowsPerPage" 
        :pageCount="maxPages"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} até {last} de {totalRecords}" 
        @page="onPageChange" 
        :pt="{
          root: {
            class: [
              'bg-gray-800', 'text-sm md:text-base', 'rounded-none',
              'text-slate-300', 'py-1 lg:py-0', 'sd: p-1'
            ]
          },
          current: ['text-slate-300'],
          firstpagebutton: ['hover:bg-gray-700 active:scale-90'],
          previouspagebutton: ['hover:bg-gray-700 active:scale-90'],
          nextpagebutton: ['hover:bg-gray-700 active:scale-90'],
          lastpagebutton: ['hover:bg-gray-700 active:scale-90']
        }" 
      />
    </section>
  </section>
</template>

<script lang="ts">
import { PageState } from 'primevue/paginator';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PaginatorPages",
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
      this.$router.push({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          page: event.page + 1
        }
      });
    }
  },
  computed: {
    rowsPerPage(): number {
      return this.$route.name === 'home' ? 40 : 20;
    }
  }
});
</script>
