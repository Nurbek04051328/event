<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live="assertive"
    class="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="notif.show" :class="{
          'pointer-events-auto relative flex items-start flex-col w-[285px] overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4  text-gray-900': true,
          'bg-red-600 text-white ring-red-400': notif.type == 'danger',
          'bg-white': notif.type == 'info' || notif.type == 'success'
        }">
          <div :class="{
            'text-white': notif.type == 'danger',
            'text-blue-600': notif.type == 'info',
            'text-green-600': notif.type == 'success'
          }">
            {{ notif.type == 'danger' ? 'Ошибка' : '' }}
            {{ notif.type == 'warning' ? 'Предупреждение' : '' }}
            {{ notif.type == 'info' ? 'Информация' : '' }}
            {{ notif.type == 'success' ? 'Успешно' : '' }}
          </div>
          <div class="pt-0.5">
            <p class="text-sm font-medium">{{ notif.msg }}</p>
          </div>
          <button type="button" @click="close" class="absolute right-4 top-4 inline-flex rounded-md focus:outline-none">
            <span class="sr-only">Закрыть</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useNotification } from '@/stores/usefull/notification'

const notification = useNotification()
import { storeToRefs } from 'pinia'
const { notif } = storeToRefs(notification)

const close = () => {
  notification.setNotif(false, '', 'success')
}
</script>
