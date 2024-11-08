<template>
  <div class="py-4">
    <CategoryTable :options="{
      languages
    }" />
    <CategoryDialog :options="{
      languages
    }" />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import CategoryTable from '@/components/data/dashboard/category/categoryTable.vue';
import CategoryDialog from '@/components/data/dashboard/category/categoryDialog.vue';

import { languageStore } from '@/stores/data/language';
const language_store = languageStore();
const { languages } = storeToRefs(language_store);

import { categoryStore } from '@/stores/data/categories';
import { onMounted } from 'vue';
const category_store = categoryStore();

onMounted(async () => {
  await language_store.getlanguages({ limit: 0 });
  await category_store.getCategories({ limit: 0 });
})
</script>
<style lang=""></style>