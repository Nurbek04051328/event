<template>
  <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
  <select :id="name" :name="name" v-model="model" class="select" :class="{
    'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
  }">
    <option v-for="opt of options" :key="opt._id" :value="opt._id">
      {{ opt[option_title] }}
    </option>
  </select>
  <span v-if="error">
    <p class="mt-2 text-xs text-red-600" id="email-error">Majburiy maydon</p>
  </span>
</template>
<script setup>
const model = defineModel()
defineProps([
  'label',
  'placeholder',
  'name',
  'options',
  'option_title',
  'error',
  'disabled',
  'suffix'
])
</script>
<style lang=""></style>
