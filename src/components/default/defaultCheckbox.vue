<template>
  <Switch v-model="model" :class="[
    model ? 'bg-indigo-600' : 'bg-gray-200',
    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
  ]">
    <span aria-hidden="true" :class="[
      model ? 'translate-x-5' : 'translate-x-0',
      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
    ]" />
  </Switch>
</template>

<script setup>
import { Switch } from '@headlessui/vue'

const model = defineModel()
defineProps(['label', 'placeholder', 'name', 'maska', 'enter', 'error', 'disabled']);
</script>
