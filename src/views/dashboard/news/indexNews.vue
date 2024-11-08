<template>
  <div class="py-4">
    <newsTable :options="{
      languages
    }" />
    <newsDialog :options="{
      languages,
      categories
    }" />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import newsTable from '@/components/data/dashboard/news/newsTable.vue';
import newsDialog from '@/components/data/dashboard/news/newsDialog.vue';

import { languageStore } from '@/stores/data/language';
const language_store = languageStore();
const { languages } = storeToRefs(language_store);

import { categoryStore } from '@/stores/data/categories';
const category_store = categoryStore();
const { categories } = storeToRefs(category_store);

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 });
  await category_store.getCategories({ limit: 0 });
})
</script>
<style lang=""></style>