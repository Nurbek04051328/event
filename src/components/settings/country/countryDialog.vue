<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
          @click="close">
          <span class="sr-only">Close</span>
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
        Yangi davlat
      </DialogTitle>

      <div class="space-y-2 mt-4">
        <default-input v-model="data.translate.title" name="title" label="Davlat nomi"
          :error="v$.translate.title.$invalid && v$.translate.title.$dirty" />
      </div>
      <div class="space-y-2 mt-4">
        <default-select v-model="data.translate.language" name="language" label="Tilni tanlang"
          :options="options.languages || []" option_title="title"
          :error="v$.translate.language.$invalid && v$.translate.language.$dirty" />
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
const { toggle, id, lang } = storeToRefs(usefull)
defineProps(['options'])

const data = ref({
  translate: {
    title: '',
    language: ''
  }
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
const rules = {
  translate: {
    title: { required },
    language: { required }
  }
}
const v$ = useVuelidate(rules, data)
const edit = ref(false)
import { countryStore } from '@/stores/data/country'
const store = countryStore()

const send = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    if (edit.value) await store.savecountry({ ...data.value })
    else await store.addcountry({ ...data.value })

    close()
  }
  console.log(data.value)
}

watch(
  () => id?.value,
  async () => {
    if (id?.value?.length > 0 && lang?.value?.length > 0) {
      const res = await store.getcountry(id.value, lang.value)
      console.log(res.data)
      edit.value = true
      data.value = {
        ...res.data,
        translate: {
          title: res.data?.translate?.title || '',
          language: lang.value
        }
      }
      console.log(data.value)
    }
  }
)

watch(
  () => toggle.value,
  () => {
    data.value = {
      translate: {
        title: '',
        language: ''
      }
    }
    edit.value = false
    v$.value.$reset()
  }
)

const close = () => {
  usefull.setToggle(false, 0)
}
</script>
