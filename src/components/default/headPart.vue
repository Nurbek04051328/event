<template>
  <div class="border-b border-gray-200 pb-8 px-4 sm:px-6 lg:px-8 bg-white pt-10">
    <div class="md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight min-h-10"
        >
          {{ route.meta?.title || '' }}
        </h2>
      </div>
      <div class="mt-4 flex md:ml-4 md:mt-0">
        <button
          v-if="route?.meta?.toggle"
          @click="openModal"
          type="button"
          class="send-btn min-w-48"
        >
          <PlusIcon class="size-6 text-white-400 mr-2" />
          {{ route.meta?.toggleTitle || 'Yangi' }}
        </button>
      </div>
    </div>
  </div>
  <!-- <header
    class="flex justify-between items-center bg-white px-6 py-3.5 border-b-gray-200 border-b-[1px]"
  >
    <div class="flex items-center">
      <router-link :to="{ name: backLink }" v-if="backLink">
        <ChevronLeftIcon class="size-6 text-gray-400 mr-2" />
      </router-link>
      <div class="text-2xl font-semibold">
        <span v-if="grayTitle" class="text-gray-500">{{ grayTitle }}</span>
        {{ title }}
      </div>
    </div>

    <div class="flex gap-2">
      <button
        v-if="toggle"
        @click="openModal"
        class="py-3 px-3 rounded-lg leading-4 bg-blue-600 text-base hover:bg-blue-700 text-white flex items-center"
      >
        <span v-html="plus" class="px-2 flex" />
        {{ toggleTitle || 'Добавить' }}
      </button>
      <button
        v-if="downloadLink"
        @click="generateExcel(downloadLink)"
        class="py-3 px-3 white-invert rounded-lg leading-4 text-base hover:bg-blue-700 hover:text-white text-gray-900 ring-1 ring-gray-300 flex items-center"
      >
        Скачать файл
      </button>
      <router-link
        v-if="addLink"
        :to="{ name: addLink }"
        class="py-3 px-3.5 rounded-lg leading-4 bg-blue-600 text-base hover:bg-blue-700 text-white flex items-center"
      >
        <span v-html="plus" class="px-2 flex" />
        {{ addLinkTitle || 'Добавить' }}
      </router-link>
      <slot />
    </div>
  </header> -->
</template>
<script setup>
defineProps({
  title: String,
  toggleTitle: String,
  addLink: String,
  addLinkTitle: String,
  toggle: Boolean,
  backLink: String,
  downloadLink: String,
  grayTitle: String
})

const route = useRoute()

import { useFullStore } from '@/stores/usefull/modal'
const store = useFullStore()

const openModal = () => {
  store.setToggle(true)
}
import { PlusIcon } from '@heroicons/vue/24/outline'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
// import { generateExcel } from '@/helpers/func'
import { useRoute } from 'vue-router'
</script>
<style lang="scss" scoped>
header {
  height: 62px;
}
</style>
