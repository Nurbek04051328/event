<template>
  <label for="search" class="block text-sm font-medium leading-6 text-gray-900" v-if="label">{{
    label
  }}</label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
    <input id="search" autocomplete="off" v-model="model" :placeholder="placeholder"
      class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6" />
  </div>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
defineProps(['label', 'placeholder'])
const model = defineModel()
</script>
<style lang=""></style>
