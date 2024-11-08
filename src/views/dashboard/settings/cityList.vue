<template>
  <cityTable
    :options="{
      languages
    }"
  />
  <cityDialog
    :options="{
      languages,
      regions: region_store.listRegions
    }"
  />
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import cityTable from '@/components/settings/city/cityTable.vue'
import cityDialog from '@/components/settings/city/cityDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { regionStore } from '@/stores/data/region'
const region_store = regionStore()

onMounted(async () => {
  await language_store.getlanguages({
    limit: 0
  })
  await region_store.getregions({
    limit: 0
  })
})
</script>
<style lang=""></style>
