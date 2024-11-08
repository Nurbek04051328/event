<template>
  <div class="flex py-4 gap-10">
    <nav class="flex grid-col w-60 flex-col" aria-label="Sidebar">
      <ul role="list" class="-mx-2 space-y-2 bg-gray-50 p-1">
        <li v-for="item in navigation" :key="item.name">
          <router-link
            :to="{ name: item.to }"
            :class="[
              item.to == route.name
                ? 'bg-blue-700 text-white'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
            ]"
          >
            {{ item.name }}
            <span
              v-if="item.count"
              class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
              aria-hidden="true"
              >{{ item.count }}</span
            >
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<script setup>
const navigation = [
  { name: 'Tillar', to: 'language', count: '' },
  // { name: 'Davlatlar', to: 'country', count: '' },
  // { name: 'Viloyatlar', to: 'region', count: '' },
  // { name: 'Shahar/tumanlar', to: 'city', count: '' },
  // { name: 'Maktablar', to: 'school', count: '' },
]
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style lang=""></style>
