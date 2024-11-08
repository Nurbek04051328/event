<template>
  <regionTable
    :options="{
      languages
    }"
  />
  <regionDialog
    :options="{
      languages,
      countrys: country_store.listCountrys
    }"
  />
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import regionTable from '@/components/settings/region/regionTable.vue'
import regionDialog from '@/components/settings/region/regionDialog.vue'

import { languageStore } from '@/stores/data/language'
const language_store = languageStore()
const { languages } = storeToRefs(language_store)

import { countryStore } from '@/stores/data/country'
const country_store = countryStore()


onMounted(async () => {
  await language_store.getlanguages({
    limit: 0
  })
  await country_store.getcountrys({
    limit: 0
  })
})
</script>
<style lang=""></style>
