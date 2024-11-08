<template>
  <countryTable
    :options="{
      languages
    }"
  />
  <countryDialog
    :options="{
      languages
    }"
  />
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import countryTable from '@/components/settings/country/countryTable.vue'
import countryDialog from '@/components/settings/country/countryDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

onMounted(async () => {
  await language_store.getlanguages({
    limit: 0
  })
})
</script>
<style lang=""></style>
