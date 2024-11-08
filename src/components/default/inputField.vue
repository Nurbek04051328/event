<template>
  <div>
    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        id="name"
        :name="name"
        autocomplete="off"
        v-model="model"
        :placeholder="placeholder"
        :v-maska="maska"
        @keypress.enter="send"
        class="block w-full rounded-md border-0 py-1.5 px-2.5 bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-0 sm:text-sm sm:leading-6"
        :class="{
          'ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500': error
        }"
      />
      <span
        v-if="suffix"
        class="text-gray-500 text-sm leading-5 font-normal absolute right-3 bottom-2"
      >
        {{ suffix }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
const model = defineModel()
const props = defineProps([
  'label',
  'placeholder',
  'name',
  'maska',
  'enter',
  'error',
  'disabled',
  'suffix'
])
const emit = defineEmits(['send'])

const send = () => {
  if (props.enter) {
    emit('send')
  }
}
</script>
<style lang=""></style>
