<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>
      <div class="fixed inset-0 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
              enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div class="flex h-16 shrink-0 items-center">
                Logo
                <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company" /> -->
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <router-link :to="item.to" :class="[
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        ]">
                          <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                          {{ item.name }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a href="#"
                      class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                      <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                      Настройки
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div class="flex h-16 shrink-0 items-center text-white">
        Logo
        <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company" /> -->
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <router-link :to="{ name: item.to }" :class="[
                  item.to == route.name
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                ]">
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </li>

          <li class="mt-auto">
            <router-link :to="{ name: 'language' }" :class="['settings' == route.name
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
              <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
              Sozlamalar
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { DocumentTextIcon } from '@heroicons/vue/20/solid';
import { Cog6ToothIcon, HomeIcon, XMarkIcon, ChartBarIcon, FolderIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Bosh sahifa', to: 'dashboard', icon: HomeIcon },
  { name: 'Toifalar', to: 'categories', icon: ChartBarIcon, current: false },
  { name: 'Ichki toifalar', to: 'subcategories', icon: ChartBarIcon, current: false },
  { name: 'Activation-keys', to: 'activation-keys', icon: ChartBarIcon, current: false },
  // { name: 'Yangiliklar', to: 'news', icon: DocumentTextIcon, current: false },
  // { name: 'Sahifalar', to: 'pages', icon: FolderIcon, current: false },
  // { name: 'Documents', to: 'documents', icon: DocumentDuplicateIcon, current: false },
  // { name: 'Reports', to: 'reports', icon: ChartPieIcon, current: false }
]

const sidebarOpen = ref(false)

import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => { })
</script>
<style lang="scss">
// .links a svg,
// .links a svg path {
//   fill: #374151;
//   stroke: #374151;
// }
// a.active-route svg,
// a.active-route svg path,
// .links a.router-link-active svg path,
// .links a.router-link-active svg,
// .links a:hover svg path,
// .links a:hover svg {
//   fill: #6b7280;
//   stroke: #6b7280;
// }</style>
