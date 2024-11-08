<template lang="">
  <label for="comment" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
  <div class="mt-2">
    <textarea
      rows="4"
      name="comment"
      :placeholder="placeholder"
      v-model="model"
      id="comment"
      class="block w-full rounded-md border-0 py-2 px-4 shadow-sm ring-1 rbg-white text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
    />
  </div>
</template>
<script setup>
const model = defineModel()
defineProps(['label', 'placeholder'])
</script>
<style lang=""></style>
