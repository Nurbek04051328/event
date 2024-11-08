<template>
  <default-modal>
    <DialogPanel
      class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
          @click="close">
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
        {{ edit ? 'Toifani tahrirlash' : 'Yangi toifa' }}
      </DialogTitle>

      <div class="space-y-2 mt-4">
        <default-select v-model="data.category" name="language" label="Toifani tanlang"
          :options="categories || []" option_title="title"
          :error="v$.title.$invalid && v$.title.$dirty" />
      </div>
      <div class="space-y-2 mt-4">
        <default-input v-model="data.title" name="title" label="Toifa nomi"
          :error="v$.title.$invalid && v$.title.$dirty" />
      </div>
      <div class="space-y-2 mt-4">
        <default-input v-model="data.slug" name="slug" label="Toifa slugi"
          :error="v$.slug.$invalid && v$.slug.$dirty" />
      </div>
      <!-- <div class="space-y-2 mt-4">
        <upload-photo label="Toifa rasmi" placeholder="Toifa rasmini yuklang" v-model="data.cover"
          base_url="route/upload/category" />
      </div> -->
      <!-- <div class="space-y-2 mt-4">
        <default-select v-model="data.translate.language" name="language" label="Tilni tanlang"
          :options="options.languages || []" option_title="title"
          :error="v$.translate.language.$invalid && v$.translate.language.$dirty" />
      </div> -->

      <div class="mt-6 flex flex-row">
        <button type="button" class="close-btn" @click="close">Bekor qilish</button>
        <button type="button" class="send-btn" @click="send">Saqlash</button>
      </div>
    </DialogPanel>
  </default-modal>
</template>
<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { DialogPanel, DialogTitle } from '@headlessui/vue';
// import uploadPhoto from '@/components/default/uploadPhoto.vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useFullStore } from '@/stores/usefull/modal';
const usefull = useFullStore();
const { toggle, id, lang } = storeToRefs(usefull);
defineProps(['options']);

const data = ref({
  // cover: [],
  category: '',
  slug: '',
  title: '',
})

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators';
const rules = {
  slug: { required },
  title: { required },
}

const v$ = useVuelidate(rules, data);
const edit = ref(false);
import { subcategoryStore } from '@/stores/data/subcategories'
const store = subcategoryStore();

const send = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    if (edit.value) {
      data.value.language = lang
      await store.saveCategory({ ...data.value });
    } 
    else await store.addCategory({ ...data.value });
    console.log(data.value);
    close();
  } else {
    console.log(data.value);
  }
}

watch(() => id?.value, async () => {
  console.log('kuzatmoqda')
  if (id?.value?.length > 0 && lang?.value?.length > 0) {
    const res = await store.getCategory(id.value, lang.value);
    console.log("aa",res.data);
    edit.value = true;
    data.value = {
      ...res.data,
      _id: id.value,
      // cover: res.data?.cover || [],
      category: '',
      slug: res.data?.slug || '',
      title: res.data?.title || '',
      // translate: {
      //   title: res.data?.translate?.title || '',
      //   language: res.data?.translate?.language || '',
      // }
    }
  }
})

watch(() => toggle.value, () => {
  data.value = {
    // cover: [],
    category: '',
    slug: '',
    title: '',
  }
})

const close = () => {
  usefull.setToggle(false, 0)
} 
</script>