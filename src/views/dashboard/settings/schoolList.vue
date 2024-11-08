<template>
  <schoolTable
    :options="{
      languages
    }"
  />
  <schoolDialog
    :options="{
      languages
    }"
  />
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import schoolTable from '@/components/settings/school/schoolTable.vue'
import schoolDialog from '@/components/settings/school/schoolDialog.vue'

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
