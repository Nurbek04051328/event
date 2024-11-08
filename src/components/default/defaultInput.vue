<template>
  <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }} </label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <input :id="name" autocomplete="off" v-model="model" :placeholder="placeholder" class="input-text" :class="{
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
