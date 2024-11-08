<template>
  <div class="py-4">
    <pagesTable :options="{
      languages
    }" />
    <pagesDialog :options="{
      languages
    }" />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import pagesTable from '@/components/data/dashboard/pages/pagesTable.vue';
import pagesDialog from '@/components/data/dashboard/pages/pagesDialog.vue';

import { languageStore } from '@/stores/data/language';
const language_store = languageStore();
const { languages } = storeToRefs(language_store);

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 });
})
</script>
<style lang=""></style>