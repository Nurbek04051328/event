<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
    >
      <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button
          type="button"
          class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
          @click="close"
        >
          <span class="sr-only">Close</span>
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
        Yangi til
      </DialogTitle>

      <div class="space-y-2 mt-4">
        <default-input
          v-model="data.title"
          name="title"
          label="Til nomi"
          :error="v$.title.$invalid && v$.title.$dirty"
        />
      </div>
      <div class="space-y-2 mt-4">
        <default-input
          v-model="data.slug"
          name="slug"
          label="Til kodi"
          placeholder="Misol: uz, ru, en"
          :error="v$.slug.$invalid && v$.slug.$dirty"
        />
      </div>

      <div class="mt-6 flex flex-row">
        <button type="button" class="close-btn" @click="close">Bekor qilish</button>
        <button type="button" class="send-btn" @click="send">Saqlash</button>
      </div>
    </DialogPanel>
  </default-modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useFullStore } from '@/stores/usefull/modal'
const usefull = useFullStore()
const { toggle, id } = storeToRefs(usefull)

const data = ref({
  title: '',
  slug: ''
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  title: { required },
  slug: { required }
}
const v$ = useVuelidate(rules, data)

import { languageStore } from '@/stores/data/language'
const store = languageStore()
const edit = ref(false)
const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) {
      await store.savelanguage({ ...data.value })
    } else {
      await store.addlanguage({ ...data.value })
    }
    close()
  }
  console.log(data.value)
}

watch(
  () => id?.value,
  async () => {
    console.log(id.value?.length)
    if (id?.value?.length > 0) {
      const res = await store.getlanguage(id.value)
      data.value = { ...res.data }
      edit.value = true
    }
  }
)

watch(
  () => toggle.value,
  () => {
    data.value = {
      title: ''
    }
    edit.value = false
    v$.value.$reset()
  }
)

const close = () => {
  usefull.setToggle(false)
}
</script>
