<template>
  <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }} </label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <textarea :id="name" rows="4" :name="name" :placeholder="placeholder" v-model="model"
      class="block w-full rounded-md border-0 py-2 px-4 shadow-sm ring-1 rbg-white text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
      :class="{
        'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
      }" />
  </div>
  <span v-if="error">
    <p class="mt-2 text-xs text-red-600" id="email-error">Majburiy maydon</p>
  </span>
</template>
<script setup>
const model = defineModel()
defineProps(['label', 'placeholder', 'name', 'enter', 'error', 'disabled', 'suffix'])
</script>
<style lang=""></style>